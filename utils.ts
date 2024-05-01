export const g = globalThis;

const type = Symbol("type");
export type Nominal<T, Type> = T & { [type]: Type };
export function Nominal<T, Type>(v: T, t: Type): Nominal<T, typeof t> {
    return v as Nominal<T, typeof t>;
}

export type thunk<T> = () => T;
export namespace Thunk {
    export function is_thunk<T>(v: T | thunk<T>): v is thunk<T> {
        return typeof v === "function" && v.length === 0;
    }
}

/**
 * The type of the arguments accepted by a function.
 */
export type Args<T = any> = readonly T[];

/**
 * Transforms a function that returns either a direct value or a thunk (a
 * no-argument function that returns a value) into a function that only returns
 * a direct value. It does this by repeatedly evaluating the function if it
 * returns a thunk, until a direct value is obtained.
 *
 * @template T The type of the value to be returned by the trampoline function.
 * @template A The type tuple representing the argument types accepted by the
 * function `fn`.
 * @param fn A function that takes arguments of type `Args` and returns either a
 * value of type `T` or a thunk that returns `T`.
 * @returns A function that takes the same arguments but guarantees to return a
 * direct value of type `T`.
 */
export function tramp<T, A extends Args>(fn: Fn<T | thunk<T>, A>): Fn<T, A> {
    return (...args: A) => {
        let result = fn(...args);
        while (Thunk.is_thunk(result)) {
            result = result();
        }
        return result;
    };
}

export const NODE_INSPECT = Symbol.for("nodejs.util.inspect.custom");

export function with_inspect<T extends object, A>(
    v: T,
    inspect: unknown | ((v: T) => any),
) {
    Object.defineProperty(v, NODE_INSPECT, {
        value: () => (typeof inspect === "function" ? inspect(v) : inspect),
        writable: false,
        enumerable: false,
    });
    return v;
}

export type Fn<R = any, A extends readonly any[] = any[]> = (...args: A) => R;

export type Immutable<T> = T extends object
    ? {
          readonly [K in keyof T]: T[K] extends object
              ? T[K] extends Fn
                  ? T[K]
                  : Immutable<T[K]>
              : T[K];
      }
    : T;

export const switch_assign = <T>(
    default_value: T,
    ...cases: Array<[boolean, T]>
) => {
    for (const [c, r] of cases) {
        if (c) return r;
    }
    return default_value;
};

export type Widen<T> = T extends number
    ? number
    : T extends boolean
    ? boolean
    : T extends string
    ? string
    : T extends bigint
    ? bigint
    : T extends symbol
    ? symbol
    : T extends undefined
    ? undefined
    : T extends null
    ? null
    : T extends object
    ? object
    : T;

export type NoInfer<A extends any> = [A][A extends any ? 0 : never];
