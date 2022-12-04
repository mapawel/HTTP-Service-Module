export class HttpServiceError extends Error {
  readonly name: string = 'HTTP Service Error!';
  constructor(readonly message: string, readonly code: number) {
    super(message);
    Object.setPrototypeOf(this, HttpServiceError.prototype);
  }
}
