import ValidateService from '~/services/validate.service';
import { getLocalizedString } from '~/localization';
import ERRORS from '~/locale/errors';
import ResponseError from '~/utils/server/response-error';

export default class ValidateController {
  static validateBegin = async (request, response) => {
    const {
      lang,
      decoded: { _id },
    } = request;

    await ValidateService.validateBegin({ lang, userid: _id });

    return response.json([]);
  };

  static validateEnd = async (request, response) => {
    const {
      lang,
      params: { validateCode },
    } = request;

    if (!validateCode) {
      throw new ResponseError(getLocalizedString(lang, ERRORS.INVALID_PARAMS));
    }

    await ValidateService.validateEnd({ lang, validateCode });

    return response.json([]);
  };
}
