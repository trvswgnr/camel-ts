import { InvalidArgumentError } from "./errors";
import Option from "./option";

/**
 * The type for `Result` values. Either a value `Ok v` or an error `Err e`.
 */
type Result<V, E> = Ok<V> | Err<E>;

type Ok<V> = { type: typeof Result.Ok; v: V };
type Err<E> = { type: typeof Result.Err; e: E };

namespace Result {
    export const Ok = Symbol("Ok");
    export const Err = Symbol("Err");

    /**
     * `of(fn)` is `Err<Error>` if `fn` throws and `Ok<V>` otherwise.
     */
    export function of<V>(fn: () => V): Result<V, Error> {
        try {
            return ok(fn());
        } catch (e) {
            return err(e instanceof Error ? e : new Error(String(e)));
        }
    }

    /**
     * `match(r, { Ok, Err })` is `Ok(v)` if `r` is `Ok<V>` and `Err(e)` otherwise.
     */
    export function match<V, E, A>(
        r: Result<V, E>,
        { Ok: _Ok, Err: _Err }: { Ok: (v: V) => A; Err: (e: E) => A },
    ): A {
        return r.type === Ok ? _Ok(r.v) : _Err(r.e);
    }

    /* -- Results -- */

    /**
     * `ok(v)` is `Ok<V>`.
     */
    export function ok<V, E>(v: V): Result<V, E> {
        return { type: Ok, v };
    }

    /**
     * `err(e)` is `Err<E>`.
     */
    export function err<V, E>(e: E): Result<V, E> {
        return { type: Err, e };
    }

    /**
     * `value(r, _default)` is `v` if `r` is `Ok`, `_default` otherwise.
     */
    export function value<V, E>(r: Result<V, E>, _default: V): V {
        return r.type === Ok ? r.v : _default;
    }

    /**
     * `get_ok(r)` is `v` if `r` is `Ok<V>` and throws an error otherwise.
     * @throws {InvalidArgumentError} if `r` is `Err<E>`.
     */
    export function get_ok<V, E>(r: Result<V, E>): V {
        if (r.type === Ok) {
            return r.v;
        }
        throw new InvalidArgumentError("tried to get Ok value of Result that is Err");
    }

    /**
     * `get_err(r)` is `e` if `r` is `Err<E>` and throws an error otherwise.
     * @throws {InvalidArgumentError} if `r` is `Ok<V>`.
     */
    export function get_err<V, E>(r: Result<V, E>): E {
        if (r.type === Err) {
            return r.e;
        }
        throw new InvalidArgumentError("tried to get Err value of Result that is Ok");
    }

    /**
     * `bind(r, f)` is `f(v)` if `r` is `Ok<V>` and `r` otherwise.
     */
    export function bind<V, E, B>(r: Result<V, E>, f: (v: V) => Result<B, E>): Result<B, E> {
        return r.type === Ok ? f(r.v) : r;
    }

    /**
     * `join(rr)` is `v` if `rr` is `Ok<Ok<V>>` and `rr` otherwise.
     */
    export function join<V, E>(rr: Result<Result<V, E>, E>): Result<V, E> {
        return rr.type === Ok ? rr.v : rr;
    }

    /**
     * `map(f, r)` is `Ok<f(v)>` if `r` is `Ok<V>` and `r` otherwise.
     */
    export function map<V, E, B>(f: (v: V) => B, r: Result<V, E>): Result<B, E> {
        return r.type === Ok ? ok(f(r.v)) : r;
    }

    /**
     * `map_err(f, r)` is `Err<f(e)>` if `r` is `Err<E>` and `r` otherwise.
     */
    export function map_err<V, E, F>(f: (e: E) => F, r: Result<V, E>): Result<V, F> {
        return r.type === Err ? err(f(r.e)) : r;
    }

    /**
     * `fold(ok, error, r)` is `ok(v)` if `r` is `Ok<V>` and `error(e)` otherwise.
     */
    export function fold<V, E, C>(ok: (v: V) => C, error: (e: E) => C, r: Result<V, E>): C {
        return r.type === Ok ? ok(r.v) : error(r.e);
    }

    /**
     * `iter(f, r)` is `f(v)` if `r` is `Ok<V>` and `()` otherwise.
     */
    export function iter<V, E>(f: (v: V) => void, r: Result<V, E>): void {
        if (r.type === Ok) {
            f(r.v);
        }
    }

    /**
     * `iter_err(f, r)` is `f(e)` if `r` is `Err<E>` and `()` otherwise.
     */
    export function iter_err<V, E>(f: (e: E) => void, r: Result<V, E>): void {
        if (r.type === Err) {
            f(r.e);
        }
    }

    /* -- Predicates and comparisons -- */

    /**
     * `is_ok r` is `true` if and only if `r` is `Ok`.
     */
    export function is_ok<V, E>(r: Result<V, E>): r is Ok<V> {
        return r.type === Ok;
    }

    /**
     * `is_err r` is `true` if and only if `r` is `Err`.
     */
    export function is_err<V, E>(r: Result<V, E>): r is Err<E> {
        return r.type === Err;
    }

    /**
     * `equal ~ok ~error r0 r1` tests equality of `r0` and `r1` using `ok` and `error` to respectively compare values wrapped by `Ok` and `Err`.
     */
    export function equal<V, E>(
        ok: (v0: V, v1: V) => boolean,
        error: (e0: E, e1: E) => boolean,
        r0: Result<V, E>,
        r1: Result<V, E>,
    ): boolean {
        if (r0.type === Ok && r1.type === Ok) {
            return ok(r0.v, r1.v);
        }

        if (r0.type === Err && r1.type === Err) {
            return error(r0.e, r1.e);
        }

        // one is Ok and the other is Err, so they can't be equal
        return false;
    }

    /**
     * `compare ~ok ~error r0 r1` totally orders `r0` and `r1` using `ok` and `error` to respectively compare values wrapped by `Ok _`  and `Err _`. `Ok _` values are smaller than `Err _` values.
     */
    export function compare<V, E>(
        ok: (v0: V, v1: V) => number,
        error: (e0: E, e1: E) => number,
        r0: Result<V, E>,
        r1: Result<V, E>,
    ): number {
        if (r0.type === Ok && r1.type === Ok) {
            return ok(r0.v, r1.v);
        }

        if (r0.type === Err && r1.type === Err) {
            return error(r0.e, r1.e);
        }

        if (r0.type === Ok && r1.type === Err) {
            // Ok is considered smaller than Err
            return -1;
        }

        // Err is considered greater than Ok when r0 is Err and r1 is Ok
        return 1;
    }

    /* -- Converting -- */

    /**
     * `to_option r` is `r` as an option, mapping `Ok v` to `Some v` and `Error _` to `None`.
     */
    export function to_option<V, E>(r: Result<V, E>): Option<V> {
        return r.type === Ok ? Option.some(r.v) : Option.none();
    }

    export function to_list<V, E>(r: Result<V, E>): V[] {
        return r.type === Ok ? [r.v] : [];
    }

    export function to_seq<V, E>(r: Result<V, E>): Iterable<V> {
        return (function* () {
            if (r.type === Ok) {
                yield r.v;
            }
        })();
    }
}

export default Result;
