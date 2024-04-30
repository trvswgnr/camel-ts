import { Nominal } from "../utils.ts";
import { Invalid_argument } from "./Exceptions";

export type int = Nominal<number, "int">;
/**
 * `int(v)` is a utility to make `int` more convenient to use in JavaScript
 * land. It converts attempts to convert a `number`, `bigint`, or `string` to an
 * integer, making sure that the result is a valid integer literal.
 * @throws {Invalid_argument} if the argument is not a valid integer literal.
 * @throws {Invalid_argument} if the argument is outside the range of representable integers.
 */
export const int = (v: number | bigint | string): int => {
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
        case "string":
            n = parseInt(v, 10);
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
    return n as int;
};

namespace Int {
    /* --- Integers --- */

    /**
     * The type for integer values.
     */
    export type t = int;
    export const t = int;

    /**
     * `zero` is the integer `0`.
     */
    export const zero: int = 0 as int;

    /**
     * `one` is the integer `1`.
     */
    export const one: int = 1 as int;

    /**
     * `minus_one` is the integer `-1`.
     */
    export const minus_one: int = -1 as int;

    /**
     * `neg(x)` is `-x`.
     */
    export const neg = (x: int): int => -x as int;

    /**
     * `add(x, y)` is the addition `x + y`.
     */
    export const add = (x: int, y: int): int => (x + y) as int;

    /**
     * `sub(x, y)` is the subtraction `x - y`.
     */
    export const sub = (x: int, y: int): int => (x - y) as int;

    /**
     * `mul(x, y)` is the multiplication `x * y`.
     */
    export const mul = (x: int, y: int): int => (x * y) as int;

    /**
     * `div(x, y)` is the division `x / y`.
     * @throws {Invalid_argument} if y is zero.
     */
    export const div = (x: int, y: int) => {
        if (y === zero) throw new Invalid_argument("Division by zero");
        return int(x / y);
    };

    /**
     * `rem(x, y)` is the remainder `x mod y`.
     * @throws {Invalid_argument} if y is zero.
     */
    export const rem = (x: int, y: int) => {
        if (y === zero) throw new Invalid_argument("Division by zero");
        return int(x % y);
    };

    /**
     * `succ(x)` is `add(x, 1)`.
     */
    export const succ = (x: int) => add(x, one);

    /**
     * `pred(x)` is `sub(x, 1)`.
     */
    export const pred = (x: int) => sub(x, one);

    /**
     * `abs x` is the absolute value of `x`. That is `x` if `x` is positive and `-x` if `x` is negative.
     * @warning This may be negative if the argument is `Int.min_int`.
     */
    export const abs = (x: int) => (x < 0 ? neg(x) : x);

    /**
     * `max_int` is the greatest representable integer.
     */
    export const max_int = Number.MAX_SAFE_INTEGER as int;

    /**
     * `min_int` is the smallest representable integer.
     */
    export const min_int = Number.MIN_SAFE_INTEGER as int;

    /**
     * `logand(x, y)` is the bitwise logical and of `x` and `y`.
     */
    export const logand = (x: int, y: int): int => int(x & y);

    /**
     * `logor(x, y)` is the bitwise logical or of `x` and `y`.
     */
    export const logor = (x: int, y: int): int => int(x | y);

    /**
     * `logxor(x, y)` is the bitwise logical exclusive or of `x` and `y`.
     */
    export const logxor = (x: int, y: int): int => int(x ^ y);

    /**
     * `lognot(x)` is the bitwise logical negation of `x`.
     */
    export const lognot = (x: int): int => int(~x);

    /**
     * `shift_left(x, n)` shifts `x` to the left by `n` bits. The result is unspecified if `n < 0` or `n > Sys.int_size`.
     */
    export const shift_left = (x: int, n: int): int => int(x << n);

    /**
     * `shift_right(x, n)` shifts `x` to the right by `n` bits. The result is unspecified if `n < 0` or `n > Sys.int_size`.
     */
    export const shift_right = (x: int, n: int): int => int(x >> n);

    /**
     * `shift_right_logical(x, n)` shifts `x` to the right by `n` bits.
     * This is a logical shift: zeroes are inserted in the vacated bits regardless of the sign of `x`.
     * The result is unspecified if `n < 0` or `n > Sys.int_size`.
     */
    export const shift_right_logical = (x: int, n: int): int => int(x >>> n);

    /* --- Predicates and Comparisons --- */

    /**
     * `equal(x, y)` returns true if `x` is equal to `y`.
     */
    export const equal = (x: int, y: int): boolean => x === y;

    /**
     * `compare(x, y)` compares two integers and returns -1, 0, or 1.
     */
    export const compare = (x: int, y: int): int =>
        int(x < y ? -1 : x > y ? 1 : 0);

    /**
     * `min(x, y)` returns the smaller of two integers.
     */
    export const min = (x: int, y: int): int => (x < y ? x : y);

    /**
     * `max(x, y)` returns the greater of two integers.
     */
    export const max = (x: int, y: int): int => (x > y ? x : y);

    /* --- Converting --- */

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

    /**
     * `to_string(x)` returns the string representation of an integer.
     */
    export const to_string = (x: int): string => String(x);

    /* --- Hashing --- */

    /**
     * `seeded_hash(seed, x)` is a seeded hash function for integers.
     */
    export const seeded_hash = (seed: int, x: int): int => {
        const m = 0x5bd1e995;
        const r = 24;
        let h = seed ^ x;
        h = imul(h, m);
        h ^= h >>> r;
        h = imul(h, m);
        h ^= h >>> r;
        h = imul(h, m);
        return int(h);
    };

    /**
     * `hash(x)` is an unseeded hash function for integers.
     */
    export const hash = (x: int): int => {
        const h1 = 0xdeadbeef as int;
        return seeded_hash(h1, x);
    };
}

const imul = (a: number, b: number): number => {
    const aHi = (a >>> 16) & 0xffff;
    const aLo = a & 0xffff;
    const bHi = (b >>> 16) & 0xffff;
    const bLo = b & 0xffff;
    return aLo * bLo + (((aHi * bLo + aLo * bHi) << 16) >>> 0);
};

export default Int;
