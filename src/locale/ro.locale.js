/* eslint-disable */

import ERRORS from './errors';

export default {
  [ERRORS.UNKNOWN_ERROR]: 'Eroare necunoscută',
  [ERRORS.INTERNAL_SERVER]: 'Eroare interna a serverului',
  [ERRORS.INVALID_PARAMS]: 'Parame nevalide',

  [ERRORS.TOKEN_EXPIRED]: 'Token de autorizare expirat',
  [ERRORS.TOKEN_INVALID]: 'Token de autorizare nevalid',
  [ERRORS.TOKEN_NOT_SUPPLIED]: 'Token de autorizare nu este furnizat',

  [ERRORS.MONGODB_INVALID_ID_FORMAT]: 'Formatul de mongodb nevalid',
  [ERRORS.MONGODB_COLLECTION_INSERT]: 'Eroare necunoscută la introducerea în colecție',
  [ERRORS.MONGODB_COLLECTION_FIND]: 'Eroare necunoscută la găsirea în colecție',
  [ERRORS.MONGODB_COLLECTION_UPDATE]: 'Eroare necunoscută la actualizarea unei colecții',
  [ERRORS.MONGODB_COLLECTION_DELETE]: 'Eroare necunoscută la ștergerea dintr-o colecție',

  [ERRORS.INVALID_EMAIL_FORMAT]: 'Format de email invalid',
  [ERRORS.INVALID_PASSWORD_FORMAT]:
    'Format de parolă nevalid. Lungimea parolei trebuie să fie mai mare de 6 caractere',
  [ERRORS.INVALID_USER_CREDENTIALS]: 'E-mail sau parolă greșită',
  [ERRORS.EMAIL_IN_USE]: 'Acest email este deja folosit',
};
