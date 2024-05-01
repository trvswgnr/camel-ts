import type { Nominal, Identity, Fn } from "../utils";

/**
 * the tuple type
 * @note if you need more than 6 items, no you don't.
 */
export type tuple<
    a = never,
    b = never,
    c = never,
    d = never,
    e = never,
    f = never,
> = [f] extends [never]
    ? [e] extends [never]
        ? [d] extends [never]
            ? [c] extends [never]
                ? [b] extends [never]
                    ? [a] extends [never]
                        ? Tuple.t<[]>
                        : Tuple.t<[a]>
                    : Tuple.t<[a, b]>
                : Tuple.t<[a, b, c]>
            : Tuple.t<[a, b, c, d]>
        : Tuple.t<[a, b, c, d, e]>
    : Tuple.t<[a, b, c, d, e, f]>;

// prettier-ignore
type tuple_fn = {
    <const A>(a: tuple<A>): tuple<A>;
    <const A, const B>(a: tuple<A, B>): tuple<A, B>;
    <const A, const B, const C>(a: tuple<A, B, C>): tuple<A, B, C>;
    <const A, const B, const C, const D>(a: tuple<A, B, C, D>): tuple<A, B, C, D>;
    <const A, const B, const C, const D, const E>(a: tuple<A, B, C, D, E>): tuple<A, B, C, D, E>;
    <const A, const B, const C, const D, const E, const F>(a: tuple<A, B, C, D, E, F>): tuple<A, B, C, D, E, F>;
    <const A>(a: [A]): tuple<A>;
    <const A, const B>(a: [A, B]): tuple<A, B>;
    <const A, const B, const C>(a: [A, B, C]): tuple<A, B, C>;
    <const A, const B, const C, const D>(a: [A, B, C, D]): tuple<A, B, C, D>;
    <const A, const B, const C, const D, const E>(a: [A, B, C, D, E]): tuple<A, B, C, D, E>;
    <const A, const B, const C, const D, const E, const F>(a: [A, B, C, D, E, F]): tuple<A, B, C, D, E, F>;
    <const A>(a: A): tuple<A>;
    <const A, const B>(a: A, b: B): tuple<A, B>;
    <const A, const B, const C>(a: A, b: B, c: C): tuple<A, B, C>;
    <const A, const B, const C, const D>(a: A, b: B, c: C, d: D): tuple<A, B, C, D>;
    <const A, const B, const C, const D, const E>(a: A, b: B, c: C, d: D, e: E): tuple<A, B, C, D, E>;
    <const A, const B, const C, const D, const E, const F>(a: A, b: B, c: C, d: D, e: E, f: F): tuple<A, B, C, D, E, F>;
}

export const tuple: tuple_fn = (...args: any[]) => {
    return args as any;
};

namespace Tuple {
    export type t<a extends any[]> = Omit<a, ArrayMethods>;
    const t = tuple;
}

type ArrayMethods = keyof OnlyPropsWithType<Array<unknown>, string>;

type OnlyPropsWithType<T, P> = {
    [K in keyof T as K extends P ? K : never]: T[K];
};

export default Tuple;
