import jwt from 'jsonwebtoken';

import { getLocalizedString } from '~/localization';
import { JWT_SIGN_SECRET } from '~/constants';
import ERRORS from '~/locale/errors';

export default (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const { token } = socket.handshake.query;

    jwt.verify(token, JWT_SIGN_SECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          next(new Error(getLocalizedString('en', ERRORS.TOKEN_EXPIRED)));
        } else {
          next(new Error(getLocalizedString('en', ERRORS.TOKEN_INVALID)));
        }
      } else {
        /* eslint-disable no-param-reassign */
        socket.decoded = decoded;
        next();
      }
    });
  } else {
    next(new Error(getLocalizedString('en', ERRORS.TOKEN_NOT_SUPPLIED)));
  }
};
