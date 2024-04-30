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

export function trampoline<T, Args extends readonly any[]>(
    fn: (...args: Args) => T | thunk<T>,
): (...args: Args) => T {
    return function (...args: Args): T {
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

export type fn<R = any, A extends readonly any[] = any[]> = (...args: A) => R;

export type Immutable<T> = T extends object
    ? {
          readonly [K in keyof T]: T[K] extends object
              ? T[K] extends fn
                  ? T[K]
                  : Immutable<T[K]>
              : T[K];
      }
    : T;
