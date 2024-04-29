export class Exception extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Exception";
  }
}

/**
 * Exception raised by library functions to signal that the given arguments do not make sense.
 */
export class InvalidArgument extends Exception {
  constructor(message: string) {
    super(message);
    this.name = "InvalidArgument";
  }
}
