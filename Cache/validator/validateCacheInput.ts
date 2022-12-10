import { CacheServiceError } from '../CacheServiceError.js';

export const validateCacheInput = (key: string): void => {
  try {
    new URL(key);
  } catch (err) {
    if (err instanceof Error) {
      throw new CacheServiceError(err?.message, 500);
    }
  }
};
