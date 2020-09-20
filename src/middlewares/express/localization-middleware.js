import { LANG } from '~/constants';

export default (req, _, next) => {
  const lang = req.headers.lang || LANG.RO;

  req.lang = lang;
  next();
};
