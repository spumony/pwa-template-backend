/* eslint-disable */

import ERRORS from './errors';

export default {
  [ERRORS.UNKNOWN_ERROR]: 'Неизвестная ошибка',
  [ERRORS.INTERNAL_SERVER]: 'Внутренняя ошибка сервера',
  [ERRORS.INVALID_PARAMS]: 'Неверные параметры',

  [ERRORS.TOKEN_EXPIRED]: 'Время действия токена авторизации истекло',
  [ERRORS.TOKEN_INVALID]: 'Неверный токен авторизации',
  [ERRORS.TOKEN_NOT_SUPPLIED]: 'Токен авторизации не представлен',

  [ERRORS.MONGODB_INVALID_ID_FORMAT]: 'Неверный mongodb формат',
  [ERRORS.MONGODB_COLLECTION_INSERT]: 'Неизвестная ошибка во время записи в коллеция',
  [ERRORS.MONGODB_COLLECTION_FIND]: 'Неизвестная ошибка во время поиска по коллеции',
  [ERRORS.MONGODB_COLLECTION_UPDATE]: 'Неизвестная ошибка во время обновления коллекции',
  [ERRORS.MONGODB_COLLECTION_DELETE]: 'Неизвестная ошибка во время удаления из коллекции',

  [ERRORS.INVALID_EMAIL_FORMAT]: 'Неверный формат email',
  [ERRORS.INVALID_PASSWORD_FORMAT]:
    'Неверный формат пароля. Пароль должен содержать не менее 6 знаков',
  [ERRORS.INVALID_USER_CREDENTIALS]: 'Неверный email или пароль',
  [ERRORS.EMAIL_IN_USE]: 'Данный email уже используется',
};
