import { HttpServiceError } from '../HttpServiceError.js';

export const validateHttpMethodParam = (url: string) => {
  try {
    new URL(url);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new HttpServiceError(err?.message, 500);
    }
    throw new Error('Unexpected HTTP Service Error!');
  }
};
