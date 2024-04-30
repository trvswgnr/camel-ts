export class Exception<T = never> extends Error {
    constructor(data?: T) {
        super(data !== undefined ? String(data) : undefined);
        this.name = "Exception";
    }
}

export type exn<T = never> = Exception<T>;

/**
 * Exception raised by library functions to signal that the given arguments do not make sense.
 */
export class Invalid_argument extends Exception<string> {
    constructor(message: string) {
        super(message);
        this.name = "Invalid_argument";
    }
}

/**
 * Exception raised by library functions to signal that they are undefined on
 * the given arguments. The string is meant to give some information to the
 * programmer; you must not pattern match on the string literal because it may
 * change in future versions.
 */
export class Failure extends Exception<string> {
    constructor(message: string) {
        super(message);
        this.name = "Failure";
    }
}

/**
 * Exception raised by library functions to signal that they have not been
 * implemented yet.
 */
export class Not_implemented extends Exception<string> {
    constructor(message: string) {
        super(`${message} is not implemented`);
        this.name = "Not_implemented";
    }
}
