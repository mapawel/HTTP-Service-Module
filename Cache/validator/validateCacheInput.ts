import { CacheServiceError } from '../CacheServiceError.js';

export const validateCacheInput = (key: string) => {
  if (key === "")
    throw new CacheServiceError(
      'Empty string as a key for cache not accepted.',
      422
    );
  return;
};
