export class CacheServiceError extends Error {
  readonly name: string = 'Cache Service Error!';
  constructor(readonly message: string, readonly code: number) {
    super(message);
    Object.setPrototypeOf(this, CacheServiceError.prototype);
  }
}
