import jwt from 'jsonwebtoken';

import { JWT_SIGN_SECRET } from '~/constants';
import { responseError } from '~/utils';
import { getLocalizedString } from '~/localization';
import ERRORS from '~/locale/errors';

export default (req, res, next) => {
  const { lang } = req;

  // Express headers are auto converted to lowercase
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, JWT_SIGN_SECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          responseError(res, 401, getLocalizedString(lang, ERRORS.TOKEN_EXPIRED));
        } else {
          responseError(res, 401, getLocalizedString(lang, ERRORS.TOKEN_INVALID));
        }
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    responseError(res, 401, getLocalizedString(lang, ERRORS.TOKEN_NOT_SUPPLIED));
  }
};
