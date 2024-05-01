import { caml_int_compare } from "../melange.js/caml.mjs";
import { caml_format_int } from "../melange.js/caml_format.mjs";
import { caml_hash } from "../melange.js/caml_hash.mjs";

import { Nominal } from "../utils.ts";
import { Invalid_argument } from "./Exceptions";

export type is_int<a> = a extends number | bigint
    ? `${a}` extends `${infer _}.${infer __}`
        ? false
        : true
    : false;

export const is_int = (x: unknown): x is int => {
    if (typeof x === "bigint") return true;
    if (typeof x !== "number") return false;
    return Number.isInteger(x);
};

export type int<a = number> = true extends is_int<a>
    ? Nominal<a, "int">
    : never;

/**
 * `int(v)` is a utility to make `int` more convenient to use in JavaScript
 * land. It converts attempts to convert a `number`, `bigint`, or `string` to an
 * integer, making sure that the result is a valid integer literal.
 * @throws {Invalid_argument} if the argument is not a valid integer literal.
 * @throws {Invalid_argument} if the argument is outside the range of representable integers.
 */
export const int = <const a extends number | bigint>(v: a): int<a> => {
    let n: number;
    switch (typeof v) {
        case "number":
            n = Math.trunc(v);
            break;
        case "bigint":
            n = Number(v);
            if (isNaN(n)) {
                throw new Invalid_argument("Invalid integer literal");
            }
            break;
        default:
            throw new Invalid_argument("Invalid integer literal");
    }
    if (n > Number.MAX_SAFE_INTEGER) {
        throw new Invalid_argument("Integer literal too large");
    }
    if (n < Number.MIN_SAFE_INTEGER) {
        throw new Invalid_argument("Integer literal too small");
    }
    return n as int<a>;
};

namespace Int {
    /**
     * `of_number(n)` converts a number to an integer.
     */
    export type of_number<N extends number> =
        `${N}` extends `${infer Integer extends number}.${infer _Decimal}`
            ? int<Integer>
            : `${N}` extends `${infer X extends number}`
            ? int<X>
            : never;
    export function of_number<const N extends number>(n: N): of_number<N> {
        return int(n) as any;
    }

    /**
     * The type for integer values.
     */
    export type t<a = number> = int<a>;
    export const t = int;

    /**
     * `zero` is the integer `0`.
     */
    export const zero = int(0);
    export type zero = typeof zero;

    /**
     * `one` is the integer `1`.
     */
    export const one = int(1);
    export type one = typeof one;

    /**
     * `minus_one` is the integer `-1`.
     */
    export const minus_one = int(-1);
    export type minus_one = typeof minus_one;

    /**
     * `min_int` is the smallest representable integer.
     */
    export const min_int = int(-2147483648);
    export type min_int = typeof min_int;

    /**
     * `max_int` is the greatest representable integer.
     */
    export const max_int = int(2147483647);
    export type max_int = typeof max_int;

    /**
     * `abs x` is the absolute value of `x`. That is `x` if `x` is positive and `-x` if `x` is negative.
     * @warning This may be negative if the argument is `Int.min_int`.
     */
    export function abs(x: int): int {
        if (x >= 0) return x;
        return (-x | 0) as int;
    }

    /**
     * `lognot(x)` is the bitwise logical negation of `x`.
     */
    export function lognot(x: int): int {
        return (x ^ -1) as int;
    }

    /**
     * `equal(x, y)` returns true if `x` is equal to `y`.
     */
    export function equal(x: int, y: int): boolean {
        return x === y;
    }

    /**
     * `compare(x, y)` compares two integers and returns -1, 0, or 1.
     */
    export const compare = caml_int_compare as (
        x: int,
        y: int,
    ) => one | zero | minus_one;

    /**
     * `min(x, y)` returns the smaller of two integers.
     */
    export function min<const a extends int, const b extends int>(
        x: a,
        y: b,
    ): a | b {
        if (x <= y) return x;
        return y;
    }

    /**
     * `max(x, y)` returns the greater of two integers.
     */
    export function max<const a extends int, const b extends int>(
        x: a,
        y: b,
    ): a | b {
        if (x >= y) return x;
        return y;
    }

    /**
     * `to_string(x)` returns the string representation of an integer.
     */
    export function to_string(x: int): string {
        return caml_format_int("%d", x);
    }

    /**
     * `seeded_hash(seed, x)` is a seeded hash function for integers.
     */
    export function seeded_hash(seed: int, x: int): int {
        return caml_hash(10, 100, seed, x) as int;
    }

    /**
     * An unseeded hash function for ints, with the same output value as
     * `Hashtbl.hash`.
     * This function allows this module to be passed as argument to the functor
     * `Hashtbl.Make`.
     */
    export function hash(x: int): int {
        return caml_hash(10, 100, 0, x) as int;
    }

    /**
     * `neg(x)` is `-x`.
     */
    export function neg(x: int): int {
        return -x as int;
    }

    /**
     * `add(x, y)` is the addition `x + y`.
     */
    export function add(x: int, y: int): int {
        return (x + y) as int;
    }

    /**
     * `sub(x, y)` is the subtraction `x - y`.
     */
    export function sub(x: int, y: int): int {
        return (x - y) as int;
    }

    /**
     * `mul(x, y)` is the multiplication `x * y`.
     */
    export function mul(x: int, y: int): int {
        return (x * y) as int;
    }

    /**
     * `div(x, y)` is the division `x / y`.
     * @throws {Invalid_argument} if y is zero.
     */
    export function div(x: int, y: int): int {
        if (y === zero) throw new Invalid_argument("Division by zero");
        return int(x / y);
    }

    /**
     * `rem(x, y)` is the remainder `x mod y`.
     * @throws {Invalid_argument} if y is zero.
     */
    export function rem(x: int, y: int) {
        if (y === zero) throw new Invalid_argument("Division by zero");
        return (x % y) as int;
    }

    /**
     * `succ(x)` is `add(x, 1)`.
     */
    export function succ(x: int): int {
        return (x + 1) as int;
    }

    /**
     * `pred(x)` is `sub(x, 1)`.
     */
    export function pred(x: int): int {
        return (x - 1) as int;
    }

    /**
     * `logand(x, y)` is the bitwise logical and of `x` and `y`.
     */
    export function logand(x: int, y: int): int {
        return (x & y) as int;
    }

    /**
     * `logor(x, y)` is the bitwise logical or of `x` and `y`.
     */
    export function logor(x: int, y: int): int {
        return (x | y) as int;
    }

    /**
     * `logxor(x, y)` is the bitwise logical exclusive or of `x` and `y`.
     */
    export function logxor(x: int, y: int): int {
        return (x ^ y) as int;
    }

    /**
     * `shift_left(x, n)` shifts `x` to the left by `n` bits. The result is unspecified if `n < 0` or `n > Sys.int_size`.
     */
    export function shift_left(x: int, n: int): int {
        return (x << n) as int;
    }

    /**
     * `shift_right(x, n)` shifts `x` to the right by `n` bits. The result is unspecified if `n < 0` or `n > Sys.int_size`.
     */
    export function shift_right(x: int, n: int): int {
        return (x >> n) as int;
    }

    /**
     * `shift_right_logical(x, n)` shifts `x` to the right by `n` bits.
     * This is a logical shift: zeroes are inserted in the vacated bits regardless of the sign of `x`.
     * The result is unspecified if `n < 0` or `n > Sys.int_size`.
     */
    export function shift_right_logical(x: int, n: int): int {
        return (x >>> n) as int;
    }

    /**
     * `to_float(x)` converts an integer to a floating point number.
     */
    export const to_float = (x: int): number => x;

    /**
     * `of_float(x)` truncates a floating point number to an integer.
     * The result is unspecified if the argument is NaN or falls outside the range of representable integers.
     */
    export const of_float = (x: number): int => {
        if (
            isNaN(x) ||
            x < Number.MIN_SAFE_INTEGER ||
            x > Number.MAX_SAFE_INTEGER
        ) {
            throw new Invalid_argument(
                "Argument is NaN or outside the range of representable integers",
            );
        }
        return Math.floor(x) as int;
    };
}

export default Int;
