import { HttpServiceError } from '../HttpServiceError.js';

export const validateHttpMethodParam = (url: string) => {
  if (url === '')
    throw new HttpServiceError('Provide the method with an URL...', 422);
  return;
};
