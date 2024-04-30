import { Invalid_argument } from "./Exceptions";
import Result, { type result } from "./Result";

/**
 * The type for option values. Either `None` or a value `Some<V>`.
 */
export type option<v> = Option.None | Option.Some<v>;

type Nullable<V> = V | null | undefined;

namespace Option {
    export type t<a> = option<a>;

    export const Some = Symbol("Some");
    export const None = Symbol("None");

    export type Some<V> = { type: typeof Option.Some; v: V };
    export type None = { type: typeof Option.None };

    /* -- Options -- */

    /**
     * `of(v)` is `None` if `v` is `null` or `undefined` and `Some<V>` otherwise.
     */
    export function of<V>(v: Nullable<V>): option<V> {
        return v === null || v === undefined ? none() : some(v);
    }

    /**
     * `match(o, cases)` is `cases.Some(v)` if `o` is `Some<V>` and `cases.None()` otherwise.
     */
    export function match<V, A>(
        o: option<V>,
        cases: { Some: (v: V) => A; None: () => A },
    ): A {
        return o.type === Some ? cases.Some(o.v) : cases.None();
    }

    /**
     * `none` is `None`.
     */
    export function none<V>(): option<V> {
        return { type: None };
    }

    /**
     * `some(v)` is `Some<V>`.
     */
    export function some<V>(v: V): option<V> {
        return { type: Some, v };
    }

    /**
     * `value(o, _default)` is `v` if `o` is `Some<V>` and `_default` otherwise.
     */
    export function value<V>(o: option<V>, _default: V): V {
        return o.type === Some ? o.v : _default;
    }

    /**
     * `get(o)` is `v` if `o` is `Some<V>` and throws otherwise.
     * @throws {InvalidArgument} if `o` is `None`.
     */
    export function get<V>(o: option<V>): V {
        if (o.type === None) {
            throw new Invalid_argument("tried to get value of None");
        }
        return o.v;
    }

    /**
     * `bind(o, f)` is `f(v)` if `o` is `Some<V>` and `None` if `o` is `None`.
     */
    export function bind<V, U>(
        o: option<V>,
        f: (v: V) => option<U>,
    ): option<U> {
        return o.type === Some ? f(o.v) : none();
    }

    /**
     * `join(o)` is `Some v` if `o` is `Some<Some<V>>` and `None` otherwise.
     */
    export function join<V>(o: option<option<V>>): option<V> {
        return o.type === Some ? o.v : none();
    }

    /**
     * `map(f, o)` is `None` if `o` is `None` and `Some<ReturnType<(v: T) => U>>` if `o` is `Some<V>`.
     */
    export function map<V, U>(f: (v: V) => U, o: option<V>): option<U> {
        return o.type === Some ? some(f(o.v)) : none();
    }

    /**
     * `fold(none, some, o)` is `none` if `o` is `None` and `some(v)` if `o` is `Some<V>`.
     */
    export function fold<V, U>(none: U, some: (v: V) => U, o: option<V>): U {
        return o.type === Some ? some(o.v) : none;
    }

    /**
     * `iter(f, o)` is `f(v)` if `o` is `Some<V>` and `void` otherwise.
     */
    export function iter<V>(f: (v: V) => void, o: option<V>): void {
        if (o.type === Some) {
            f(o.v);
        }
    }

    /* -- Predicates and comparisons -- */

    /**
     * `is_none(o)` is `true` if `o` is `None` and `false` otherwise.
     */
    export function is_none<V>(o: option<V>): o is None {
        return o.type === None;
    }

    /**
     * `is_some(o)` is `true` if `o` is `Some<V>` and `false` otherwise.
     */
    export function is_some<V>(o: option<V>): o is Some<V> {
        return o.type === Some;
    }

    /**
     * `equal(eq, o0, o1)` is `true` if and only if `o0` and `o1` are `None` or `Some<V>` and `eq(v0, v1)` is `true`.
     */
    export function equal<V>(
        eq: (v0: V, v1: V) => boolean,
        o0: option<V>,
        o1: option<V>,
    ): boolean {
        if (o0.type === None && o1.type === None) {
            return true;
        }
        if (o0.type === Some && o1.type === Some) {
            return eq(o0.v, o1.v);
        }
        return false;
    }

    /**
     * `compare(cmp, o0, o1)` is a total order on options using `cmp` to compare values wrapped by `Some`. `None` is smaller that `Some` values.
     */
    export function compare<V>(
        cmp: (v0: V, v1: V) => number,
        o0: option<V>,
        o1: option<V>,
    ): number {
        switch (true) {
            case o0.type === None && o1.type === Some:
                return -1;
            case o0.type === Some && o1.type === None:
                return 1;
            case o0.type === Some && o1.type === Some:
                return cmp(o0.v, o1.v);
            default:
                return 0;
        }
    }

    /* -- Converting -- */

    /**
     * `to_result(none, o) is `Ok(v)` if `o` is `Some(v)` and `Err(none)` otherwise.
     */
    export function to_result<v, e>(none: e, o: option<v>): result<v, e> {
        return o.type === Some ? Result.ok(o.v) : Result.error(none);
    }

    /**
     * `to_list(o)` is `[v]` if `o` is `Some<V>` and `[]` otherwise.
     */
    export function to_list<T>(o: option<T>): T[] {
        return o.type === Some ? [o.v] : [];
    }

    /**
     * `to_seq(o)` is a sequence of `v` if `o` is `Some<V>` and the empty sequence otherwise.
     */
    export function to_seq<T>(o: option<T>): Iterable<T> {
        return (function* () {
            if (o.type === Some) {
                yield o.v;
            }
        })();
    }
}

export default Option;
