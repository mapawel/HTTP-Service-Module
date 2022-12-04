import { CacheServiceError } from '../CacheServiceError.js';

export const validateCacheInput = (key: string) => {
  try {
    new URL(key);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new CacheServiceError(err?.message, 500);
    }
    throw new Error('Unexpected Cache Service Error!');
  }
};
