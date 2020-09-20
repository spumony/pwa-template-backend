/* eslint-disable */

import ERRORS from './errors';

export default {
  [ERRORS.UNKNOWN_ERROR]: 'Unknown error',
  [ERRORS.INTERNAL_SERVER]: 'Internal server error',
  [ERRORS.INVALID_PARAMS]: 'Invalid params',

  [ERRORS.TOKEN_EXPIRED]: 'Expired authorization token',
  [ERRORS.TOKEN_INVALID]: 'Invalid authorization token',
  [ERRORS.TOKEN_NOT_SUPPLIED]: 'Authorization token is not supplied',

  [ERRORS.MONGODB_INVALID_ID_FORMAT]: 'Invalid mongodb id format',
  [ERRORS.MONGODB_COLLECTION_INSERT]: 'Unknown error while inserting into collection',
  [ERRORS.MONGODB_COLLECTION_FIND]: 'Unknown error while finding in collection',
  [ERRORS.MONGODB_COLLECTION_UPDATE]: 'Unknown error while updating a collection',
  [ERRORS.MONGODB_COLLECTION_DELETE]: 'Unknown error while deleting from a collection',

  [ERRORS.INVALID_EMAIL_FORMAT]: 'Invalid email format',
  [ERRORS.INVALID_PASSWORD_FORMAT]:
    'Invalid password format. Password length should be bigger than 6 characters',
  [ERRORS.INVALID_USER_CREDENTIALS]: 'Wrong email or password',
  [ERRORS.EMAIL_IN_USE]: 'Email is already in use',
};
