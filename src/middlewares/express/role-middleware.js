import { responseError } from '~/utils';

export default (roles = []) => (request, response, next) => {
  if (roles.includes(request.decoded.role)) {
    next();
  } else {
    responseError(response, 403, 'Access denied');
  }
};
