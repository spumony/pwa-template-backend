import { responseError } from '~/utils';
import { getLocalizedString } from '~/localization';

export default (error, request, response, next) => {
  if (error) {
    const { lang } = request;

    console.log(error);
    responseError(response, 500, getLocalizedString(lang, 'error.internal'));
  } else {
    next();
  }
};
