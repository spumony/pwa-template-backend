import 'regenerator-runtime/runtime';

import minimist from 'minimist';
import fs from 'fs';
import path from 'path';
import cluster from 'cluster';
import os from 'os';
import spdy from 'spdy';
import mongoose from 'mongoose';
import cors from 'cors'; // https://github.com/expressjs/cors
import swaggerUi from 'swagger-ui-express';

import { MONGODB_CONNECTION_URL } from '~/constants';
import enhancedExpress from './utils/server/enhanced-express';
import enhanceWithSocket from './utils/server/enhanced-socket';
import createLogger from './utils/server/logger';
import routes from './routes/rootRoutes';
import socketMessages from './socket/rootMessages';

const argv = minimist(process.argv.slice(2));
const { env, port = 8000 } = argv;
const key = fs.readFileSync(path.resolve('certificate/localhost.key'));
const cert = fs.readFileSync(path.resolve('certificate/localhost.crt'));
const swaggerDocument = fs.readFileSync(path.resolve('dist/swagger.json'));
const logger = createLogger();

(async () => {
  if (cluster.isMaster) {
    logger.debug(`Master is running @ process ${process.pid}`);
    logger.debug(`Visit https://localhost:${port}\r\nPress CTRL + C to stop the server`);

    const cores = !argv.cores || argv.cores === 'max' ? os.cpus().length : parseInt(argv.cores, 10);

    for (let i = 0; i < cores; ++i) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      logger.debug(`Worker ${worker.process.pid} died..`);
      // cluster.fork();
    });
  } else {
    const { id } = cluster.worker;
    const { pid } = cluster.worker.process;

    await mongoose.connect(env ? `${MONGODB_CONNECTION_URL}-${env}` : MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
    });

    const app = enhancedExpress();

    // include swagger only on dev build
    if (process.env.NODE_ENV === 'development') {
      app.use('/swagger', swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerDocument)));
    }

    const server = spdy.createServer({ key, cert }, app).listen(port, () => {
      logger.debug(`Server started on port ${port} as Woker ${id} running @ process ${pid}`);
    });
    const io = enhanceWithSocket(server);

    routes.forEach((buildNamespacedRoutes) => {
      buildNamespacedRoutes(app);
    });

    app.options('*', cors());
    app.all('*', (_, response) => {
      response.status(404).json({ error: 'Not found' });
    });

    socketMessages.forEach((buildNamespacedMessages) => {
      buildNamespacedMessages(io);
    });
  }
})().catch((error) => {
  logger.debug(error);
});
