import { CacheServiceError } from '../CacheService.exception.js';

export const validateCacheInput = (key: string): void => {
  try {
    new URL(key);
  } catch (err) {
    if (err instanceof Error) {
      throw new CacheServiceError(err?.message, 500);
    }
    throw new CacheServiceError('Unexpected cache error', 500);
  }
};
