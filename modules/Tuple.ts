import type { Nominal } from "../utils";

/**
 * the tuple type
 * @note if you need more than 6 items, no you don't.
 */
export type tuple<T> = Nominal<
    Omit<T, keyof OnlyStringProps<Array<unknown>>>,
    "tuple"
>;

type OnlyStringProps<T> = {
    [P in keyof T as P extends string ? P : never]: P;
};

// prettier-ignore
type tuple_fn = {
    <const A>(a: A): tuple<[A]>;
    <const A, B>(a: A, b: B): tuple<[A, B]>;
    <const A, B, C>(a: A, b: B, c: C): tuple<[A, B, C]>;
    <const A, B, C, D>(a: A, b: B, c: C, d: D): tuple<[A, B, C, D]>;
    <const A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): tuple<[A, B, C, D, E]>;
    <const A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): tuple<[A, B, C, D, E, F]>;
};

export const tuple: tuple_fn = (...args: any[]) => {
    return args as any;
};
