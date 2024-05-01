import type { Nominal, Identity, Fn } from "../utils";

type IsUndefinedOrNever<T> = [T] extends [never]
    ? true
    : [T] extends [undefined]
    ? true
    : false;

export type tuple<
    a = never,
    b = never,
    c = never,
    d = never,
    e = never,
    f = never,
> = Tuple.of_tuple<[a, b, c, d, e, f]>;

// prettier-ignore
namespace TupleFn {
    export function tuple<const A>(a: A): tuple<A>;
    export function tuple<const A, const B>(a: A, b: B): tuple<A, B>;
    export function tuple<const A, const B, const C>(a: A, b: B, c: C): tuple<A, B, C>;
    export function tuple<const A, const B, const C, const D>(a: A, b: B, c: C, d: D): tuple<A, B, C, D>;
    export function tuple<const A, const B, const C, const D, const E>(a: A, b: B, c: C, d: D, e: E): tuple<A, B, C, D, E>;
    export function tuple<const A, const B, const C, const D, const E, const F>(a: A, b: B, c: C, d: D, e: E, f: F): tuple<A, B, C, D, E, F>;
    export function tuple(...args: any[]) {
        return args as any;
    }
}

export const tuple = TupleFn.tuple;

namespace Tuple {
    export type t<
        a = never,
        b = never,
        c = never,
        d = never,
        e = never,
        f = never,
    > = tuple<a, b, c, d, e, f>;

    export type of_tuple<
        List extends unknown[],
        Result extends unknown[] = [],
    > = List extends [infer Head, ...infer Tail]
        ? [never] extends [Head]
            ? of_tuple<Tail, Result>
            : of_tuple<Tail, [...Result, Head]>
        : Result;

    export function of_tuple<List extends unknown[]>(
        list: List,
    ): of_tuple<List> {
        return list as any;
    }
}

export default Tuple;

// /**
//  * the tuple type
//  * @note if you need more than 6 items, no you don't.
//  */
// export type tuple<T> = Nominal<
//     Omit<T, keyof OnlyStringProps<Array<unknown>>>,
//     "tuple"
// >;

type OnlyStringProps<T> = {
    [P in keyof T as P extends string ? P : never]: P;
};

// // prettier-ignore
// type tuple_fn = {
//     <const A>(a: A): tuple<[A]>;
//     <const A, B>(a: A, b: B): tuple<[A, B]>;
//     <const A, B, C>(a: A, b: B, c: C): tuple<[A, B, C]>;
//     <const A, B, C, D>(a: A, b: B, c: C, d: D): tuple<[A, B, C, D]>;
//     <const A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): tuple<[A, B, C, D, E]>;
//     <const A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): tuple<[A, B, C, D, E, F]>;
// };

// export const tuple: tuple_fn = (...args: any[]) => {
//     return args as any;
// };
