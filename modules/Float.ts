import type { Nominal } from "../utils";
import { Invalid_argument, Failure, Not_implemented } from "./Exceptions";
import { int } from "./Int";
import Option, { type option } from "./Option";

export type float = Nominal<number, "float">;
export const float = (v: number | bigint | string): float => {
    let n: number;
    switch (typeof v) {
        case "number":
            n = v;
            break;
        case "string":
            n = parseFloat(v);
            break;
        case "bigint":
            n = Number(v);
            break;
        default:
            throw new Invalid_argument("Invalid float literal");
    }
    if (isNaN(n)) {
        throw new Invalid_argument("Invalid float literal");
    }
    return n as float;
};

/**
 * Floating-point arithmetic.
 *
 * JavaScript's floating-point numbers also follow the IEEE 754 standard, using
 * double precision (64 bits) numbers. Floating-point operations in JavaScript
 * do not throw exceptions for overflow, underflow, division by zero, etc.
 * Instead, special IEEE values are used, such as `Infinity` for `1.0 / 0.0`,
 * `-Infinity` for `-1.0 / 0.0`, and `NaN` (Not a Number) for `0.0 / 0.0`. These
 * special values propagate through floating-point computations as expected: for
 * example, `1.0 / Infinity` is `0.0`, and any basic arithmetic operation (`+`,
 * `-`, `*`, `/`) with `NaN` as an operand returns `NaN`.
 */
namespace Float {
    export type t = float;
    export const t = float;

    /**
     * The floating point 0.
     */
    export const zero: float = 0 as float;

    export type minus_zero = Nominal<float & -0, "minus_zero">;
    export const minus_zero: minus_zero = -0 as minus_zero;

    export const is_minus_zero = (zero: float): zero is minus_zero => {
        return 1 / zero === -Infinity && zero === 0;
    };

    /**
     * The floating point 1.
     */
    export const one: float = 1 as float;

    /**
     * The floating-point -1.
     */
    export const minus_one: float = -1 as float;

    /**
     * Unary negation.
     */
    export const neg = (x: float): float => -x as float;

    /**
     * Floating-point addition.
     */
    export const add = (x: float, y: float): float => (x + y) as float;

    /**
     * Floating-point subtraction.
     */
    export const sub = (x: float, y: float): float => (x - y) as float;

    /**
     * Floating-point multiplication.
     */
    export const mul = (x: float, y: float): float => (x * y) as float;

    /**
     * Floating-point division.
     */
    export const div = (x: float, y: float): float => (x / y) as float;

    /**
     * `fma(x, y, z)` returns `x * y + z`,  with a best effort for computing
     * this expression with a single rounding, using either hardware
     * instructions (providing full IEEE compliance) or a software emulation.
     */
    export const fma = (x: float, y: float, z: float): float =>
        (x * y + z) as float;

    /**
     * `rem(a, b)` returns the remainder of `a` with respect to `b`. The returned
     * value is `a - n * b`, where `n` is the quotient `a / b` rounded towards
     * zero to an integer.
     */
    export const rem = (a: float, b: float): float => {
        const n = Math.trunc(a / b);
        return (a - n * b) as float;
    };

    /**
     * `succ(x)` returns the floating point number right after `x` i.e., the
     * smallest floating-point number greater than `x`.
     */
    export const succ = (x: float): float => {
        if (x !== x) return x;
        if (x === -1 / 0) return -Number.MAX_VALUE as float;
        if (x === 1 / 0) return (+1 / 0) as float;
        if (x === Number.MAX_VALUE) return (+1 / 0) as float;
        let y = x * (x < 0 ? 1 - Number.EPSILON / 2 : 1 + Number.EPSILON);
        if (y === x) {
            const n = Number.MIN_VALUE * Number.EPSILON;
            y = n > 0 ? x + n : x + Number.MIN_VALUE;
        }
        if (y === +1 / 0) {
            y = +Number.MAX_VALUE;
        }
        let b = x + (y - x) / 2;
        if (x < b && b < y) {
            y = b;
        }
        const c = (y + x) / 2;
        if (x < c && c < y) {
            y = c;
        }
        return (y === 0 ? -0 : y) as float;
    };

    /**
     * `pred(x)` returns the floating point number right before `x` i.e., the
     * largest floating-point number less than `x`.
     */
    export const pred = (x: float): float => -succ(-x as float) as float;

    /**
     * `abs(x)` returns the absolute value of `x`.
     */
    export const abs = (x: float): float => Math.abs(x) as float;

    /**
     * Positive infinity.
     */
    export const infinity: float = Infinity as float;

    /**
     * Negative infinity.
     */
    export const neg_infinity: float = -Infinity as float;

    /**
     * A special floating-point value denoting the result of an undefined
     * operation such as `0.0 / 0.0`. Stands for 'not a number'. Any
     * floating-point operation with `nan` as argument returns `nan` as result,
     * unless otherwise specified in IEEE 754 standard. As for floating-point
     * comparisons, `=`, `<`, `<=`, `>` and `>=` return `false` and `<>` returns
     * `true` if one or both of their arguments is `nan`.
     */
    export const nan: float = NaN as float;

    /**
     * The constant pi.
     */
    export const pi: float = Math.PI as float;

    /**
     * The largest possible finite value of type `float`.
     */
    export const max_float: float = Number.MAX_VALUE as float;

    /**
     * The smallest possible, non-zero, non-denormalized value of type `float`.
     */
    export const min_float: float = Number.MIN_VALUE as float;

    /**
     * The difference between `1.0` and the smallest exactly representable
     * floating-point number greater than `1.0`.
     */
    export const epsilon: float = Number.EPSILON as float;

    /**
     * `is_finite(x)` is `true` if and only if `x` is finite i.e., not inifite
     * and not `Float.nan`.
     */
    export const is_finite = (x: float): boolean => Number.isFinite(x);

    /**
     * `is_infinite(x)` is `true` if and only if `x` is `Float.infinity` or
     * `Float.neg_infinity`.
     */
    export const is_infinite = (x: float): boolean =>
        x === Infinity || x === -Infinity;

    /**
     * `is_nan(x)` is `true` if and only if `x` is not a number.
     * @see {@link Float.nan}
     */
    export const is_nan = (x: float): boolean => isNaN(x);

    /**
     * `is_integer(x)` is `true` if and only if `x` is an integer.
     */
    export const is_integer = (x: float): boolean => Number.isInteger(x);

    /**
     * Converts an integer to a floating-point number.
     */
    export const of_int = (i: int): float => float(i);

    /**
     * Truncate the given floating-point number to an integer. The result is
     * unspecified if the argument is `nan` or falls outside the range of
     * representable integers.
     */
    export const to_int = (f: float): int => int(Math.trunc(f));

    /**
     * Convert the given string to a float using base 10.
     * @throws {Failure} if the given string is not a valid representation of a
     * float.
     */
    export const of_string = (s: string): float => {
        const f = parseFloat(s);
        if (isNaN(f)) {
            throw new Failure(`Invalid float literal: ${s}`);
        }
        return f as float;
    };

    /**
     * Same as `of_string`, but returns `None` instead of raising.
     */
    export const of_string_opt = (s: string): option<float> => {
        const f = parseFloat(s);
        if (isNaN(f)) {
            return Option.none();
        }
        return Option.some(f as float);
    };

    /**
     * Return a string representation of a floating-point number. This
     * conversion can involve a loss of precision. For greater control over the
     * manner in which the number is printed, see `Printf`. This function is an
     * alias for `string_of_float`.
     */
    export const to_string = (f: float): string => f.toString();

    /** Normal number, none of the below */
    export const FP_normal = Symbol("FP_normal");
    /** Number very close to 0.0, has reduced precision */
    export const FP_subnormal = Symbol("FP_subnormal");
    /** Number is 0.0 or -0.0 */
    export const FP_zero = Symbol("FP_zero");
    /** Number is positive or negative infinity */
    export const FP_infinity = Symbol("FP_infinity");
    /** Not a number: result of an undefined operation */
    export const FP_nan = Symbol("FP_nan");

    /**
     * The five classes of floating-point numbers, as determined by the
     * `Float.classify_float` function.
     */
    export type fpclass =
        | typeof FP_normal
        | typeof FP_subnormal
        | typeof FP_zero
        | typeof FP_infinity
        | typeof FP_nan;

    /**
     * Return the class of the given floating-point number: normal, subnormal,
     * zero, infinite, or not a number.
     */
    export const classify_float = (f: float): fpclass => {
        switch (f) {
            case NaN:
                return FP_nan;
            case 0:
            case -0:
                return FP_zero;
            case Infinity:
            case -Infinity:
                return FP_infinity;
            default:
                if (f <= Number.MIN_VALUE || f >= -Number.MIN_VALUE) {
                    return FP_subnormal;
                }
                return FP_normal;
        }
    };

    /**
     * Exponentiation.
     */
    export const pow = (x: float, y: float): float => Math.pow(x, y) as float;

    /**
     * Square root.
     */
    export const sqrt = (x: float): float => Math.sqrt(x) as float;

    /**
     * Cube root.
     */
    export const cbrt = (x: float): float => Math.cbrt(x) as float;

    /**
     * Exponential function.
     */
    export const exp = (x: float): float => Math.exp(x) as float;

    /**
     * Base 2 exponential function.
     */
    export const exp2 = (x: float): float => Math.pow(2, x) as float;

    /**
     * Natural logarithm.
     */
    export const log = (x: float): float => Math.log(x) as float;

    /**
     * Base 10 logarithm.
     */
    export const log10 = (x: float): float => Math.log10(x) as float;

    /**
     * Base 2 logarithm.
     */
    export const log2 = (x: float): float => Math.log2(x) as float;

    /**
     * `expm1(x)` computes `exp(x) - 1.0`, giving numerically-accurate results
     * even if `x` is close to `0.0`.
     */
    export const expm1 = (x: float): float => Math.expm1(x) as float;

    /**
     * `log1p(x)` computes `log(1.0 + x)` (natural logarithm), giving
     * numerically-accurate results even if `x` is close to `0.0`.
     */
    export const log1p = (x: float): float => Math.log1p(x) as float;

    /**
     * Cosine. Argument is in radians.
     */
    export const cos = (x: float): float => Math.cos(x) as float;

    /**
     * Sine. Argument is in radians.
     */
    export const sin = (x: float): float => Math.sin(x) as float;

    /**
     * Tangent. Argument is in radians.
     */
    export const tan = (x: float): float => Math.tan(x) as float;

    /**
     * Arc cosine. The argument must fall within the range `[-1.0, 1.0]`. Result
     * is in radians and is between `0.0` and `pi`.
     */
    export const acos = (x: float): float => Math.acos(x) as float;

    /**
     * Arc sine. The argument must fall within the range `[-1.0, 1.0]`. Result
     * is in radians and is between `-pi/2` and `pi/2`.
     */
    export const asin = (x: float): float => Math.asin(x) as float;

    /**
     * Arc tangent. Result is in radians and is between `-pi/2` and `pi/2`.
     */
    export const atan = (x: float): float => Math.atan(x) as float;

    /**
     * `atan2(y, x)` returns the arc tangent of `y / x`. The signs of `x` and `y`
     * are used to determine the quadrant of the result. Result is in radians
     * and is between `-pi` and `pi`.
     */
    export const atan2 = (y: float, x: float): float =>
        Math.atan2(y, x) as float;

    /**
     * `hypot(x, y)` returns the square root of `x * x + y * y`, that is, the
     * length of the hypotenuse of a right-angled triangle with sides of length
     * `x` and `y`, or, equivalently, the distance of the point `(x, y)` to
     * origin. If one of `x` or `y` is infinite, returns infinity even if the
     * other is `nan`.
     */
    export const hypot = (x: float, y: float): float =>
        Math.hypot(x, y) as float;

    /**
     * Hyperbolic cosine. Argument is in radians.
     */
    export const cosh = (x: float): float => Math.cosh(x) as float;

    /**
     * Hyperbolic sine. Argument is in radians.
     */
    export const sinh = (x: float): float => Math.sinh(x) as float;

    /**
     * Hyperbolic tangent. Argument is in radians.
     */
    export const tanh = (x: float): float => Math.tanh(x) as float;

    /**
     * Hyperbolic arc cosine. The argument must fall within the range `[1.0,
     * inf]`. Result is in radians and is between `0.0` and `inf`.
     */
    export const acosh = (x: float): float => Math.acosh(x) as float;

    /**
     * Hyperbolic arc sine. The argument and result range over the entire real
     * line. Result is in radians.
     */
    export const asinh = (x: float): float => Math.asinh(x) as float;

    /**
     * Hyperbolic arc tangent. The argument must fall within the range `[-1.0,
     * 1.0]`. Result is in radians and ranges over the entire real line.
     */
    export const atanh = (x: float): float => Math.atanh(x) as float;

    /**
     * Error function. The argument ranges over the entire real line. The result
     * is always within `[-1.0, 1.0]`.
     */
    export const erf = (x: float): float => {
        const a1 = 0.254829592;
        const a2 = -0.284496736;
        const a3 = 1.421413741;
        const a4 = -1.453152027;
        const a5 = 1.061405429;
        const p = 0.3275911;

        const sign = x < 0 ? -1 : 1;
        x = Math.abs(x) as float;

        const t = 1.0 / (1.0 + p * x);
        const y =
            1.0 -
            ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
                t *
                Math.exp(-x * x);

        return (sign * y) as float;
    };

    /**
     * Complementary error function (`erfc x = 1 - erf x`). The argument ranges
     * over the entire real line. The result is always within `[-1.0, 1.0]`.
     */
    export const erfc = (x: float): float => (1 - erf(x)) as float;

    /**
     * `trunc(x)` rounds `x` to the nearest integer whose absolute value is less
     * than or equal to `x`.
     */
    export const trunc = (x: float): float => Math.trunc(x) as float;

    /**
     * `round(x)` rounds `x` to the nearest integer with ties (fractional values of
     * `0.5`) rounded away from zero, regardless of the current rounding
     * direction. If `x` is an integer, `+0.0`, `-0.0`, `NaN`, or `Infinity`, `x`
     * itself is returned.
     */
    export const round = (x: float): float => {
        if (is_nan(x) || is_infinite(x) || x === 0) {
            return x;
        }
        return Math.round(x) as float;
    };

    /**
     * Round above to an integer value. `ceil(f)` returns the least integer value
     * greater than or equal to `f`. The result is returned as a float.
     */
    export const ceil = (x: float): float => Math.ceil(x) as float;

    /**
     * Round below to an integer value. `floor(f)` returns the greatest integer
     * value less than or equal to `f`. The result is returned as a float.
     */
    export const floor = (x: float): float => Math.floor(x) as float;

    /**
     * `next_after(x, y)` returns the next representable floating-point value
     * following `x` in the direction of `y`.
     *
     * More precisely, if `y` is greater (resp. less) than `x`, it returns the
     * smallest (resp. largest) representable number greater (resp. less) than
     * `x`. If `x` equals `y`, the function returns `y`. If `x` or `y` is `nan`,
     * `nan` is returned.
     *
     * @note `next_after(max_float, infinity) === infinity`
     * @note `next_after(0, infinity)` is the smallest denormalized positive number.
     * @note If `x` is the smallest denormalized positive number, `next_after(x, 0) === 0`.
     */
    export const next_after = (x: float, y: float): float => {
        return y < x ? pred(x) : y > x ? succ(x) : x !== x ? x : y;
    };

    export function sign(x: float): float {
        if (Number(x) !== Number(x)) return NaN as float;
        if (x === -Infinity) return -1 as float;
        return (1 / x < 0 ? -1 : 1) as float;
    }

    /**
     * `copy_sign(x, y)` returns a float whose absolute value is that of `x` and
     * whose sign is that of `y`. If `x` is `nan`, returns `nan`. If `y` is `nan`,
     * returns either `x` or `-x`, but it is not specified which.
     */
    export const copy_sign = (x: float, y: float): float => {
        return (sign(y) * abs(x)) as float;
    };

    /**
     * `sign_bit(x)` returns `true` if and only if the sign bit of `x` is set.
     * For example, `sign_bit(1.0)` and `sign_bit(0.0)` are `false`, while
     * `sign_bit(-1.0)` and `sign_bit(-0.0)` are `true`.
     */
    export const sign_bit = (x: float): boolean => sign(x) < 0;

    /**
     * `frexp(f)` returns the pair of the significant and the exponent of `f`.
     * When `f` is zero, the significant `x` and the exponent `n` of `f` are
     * equal to zero. When `f` is non-zero, they are defined by `f = x * 2 ** n`
     * and `0.5 <= x < 1.0`.
     */
    export const frexp = (value: float): [float, int] => {
        if (value === 0) {
            return [0 as float, 0 as int]; // Special case for zero
        }

        const s = sign(value);
        const absValue = abs(value);
        let exponent = Math.max(-1023, floor(log2(absValue)) + 1);
        let mantissa = absValue * Math.pow(2, -exponent);

        // Normalize mantissa to be in the range [0.5, 1)
        if (mantissa < 0.5) {
            mantissa *= 2;
            exponent -= 1;
        }

        return [(s * mantissa) as float, int(exponent)];
    };

    /**
     * `ldexp(x, n)` returns `x * 2 ** n`.
     */
    export const ldexp = (x: float, n: int): float =>
        (x * Math.pow(2, n)) as float;

    /**
     * `modf(f)` returns the pair of the fractional and integral part of `f`.
     */
    export const modf = (f: float): [float, float] => {
        const [significand, exponent] = frexp(f);
        return [significand, ldexp(f, int(-exponent))];
    };

    /**
     * `compare(x, y)` returns `0` if `x` is equal to `y`, a negative integer if
     * `x` is less than `y`, and a positive integer if `x` is greater than `y`.
     * `compare` treats `nan` as equal to itself and less than any other float
     * value. This treatment of `nan` ensures that `compare` defines a total
     * ordering relation.
     */
    export const compare = (x: t, y: t): int => {
        switch (true) {
            case is_nan(x) && is_nan(y):
            case x === y:
                return int(0);
            case is_nan(x):
                return int(-1);
            case is_nan(y):
                return int(1);
            case x < y:
                return int(-1);
            default:
                return int(1);
        }
    };

    /**
     * The equal function for floating-point numbers, compared using
     * {@link Float.compare `Float.compare`}.
     */
    export const equal = (x: float, y: float): boolean => compare(x, y) === 0;

    /**
     * `min(x, y)` returns the minimum of `x` and `y`. It returns `nan` when `x`
     * or `y` is `nan`. Moreover, `min(-0.0, +0.0) === -0.0`.
     */
    export const min = (x: float, y: float): float => {
        if (is_nan(x) || is_nan(y)) return nan;
        return x < y ? x : y;
    };

    /**
     * `max(x, y)` returns the maximum of `x` and `y`. It returns `nan` when `x`
     * or `y` is `nan`. Moreover, `max(-0.0, +0.0) === +0.0`.
     */
    export const max = (x: float, y: float): float => {
        if (is_nan(x) || is_nan(y)) return nan;
        return x > y ? x : y;
    };

    /**
     * `min_max(x, y)` is `[min(x, y), max(x, y)]`, just more efficient.
     */
    export const min_max = (x: float, y: float): [float, float] => [
        min(x, y),
        max(x, y),
    ];

    /**
     * `min_num(x, y)` returns the minimum of `x` and `y` treating `nan` as
     * missing values. If both `x` and `y` are `nan`, `nan` is returned.
     * Moreover, `min_num(-0.0, +0.0) === -0.0`.
     */
    export const min_num = (x: float, y: float): float => {
        if (is_nan(x) && is_nan(y)) return nan;
        if (is_nan(x)) return y;
        if (is_nan(y)) return x;
        return x < y ? x : y;
    };

    /**
     * `max_num(x, y)` returns the maximum of `x` and `y` treating `nan` as
     * missing values. If both `x` and `y` are `nan`, `nan` is returned.
     * Moreover, `max_num(-0.0, +0.0) === +0.0`.
     */
    export const max_num = (x: float, y: float): float => {
        if (is_nan(x) && is_nan(y)) return nan;
        if (is_nan(x)) return y;
        if (is_nan(y)) return x;
        return x > y ? x : y;
    };

    /**
     * `min_max_num(x, y)` is `[min_num(x, y), max_num(x, y)]`, just more
     * efficient. Note that in particular `min_max_num(x, nan) === [x, x]` and
     * `min_max_num(nan, y) === [y, y]`.
     */
    export const min_max_num = (x: float, y: float): [float, float] => [
        min_num(x, y),
        max_num(x, y),
    ];

    /**
     * A seeded hash function for floats, with the same output value as
     * `Hashtbl.seeded_hash`. This function allows this module to be passed as
     * argument to the functor `Hashtbl.MakeSeeded`.
     */
    export const seeded_hash = (seed: int, x: float): int => {
        throw new Not_implemented("seeded_hash");
    };

    /**
     * An unseeded hash function for floats, with the same output value as
     * `Hashtbl.hash`. This function allows this module to be passed as argument
     * to the functor `Hashtbl.Make`.
     */
    export const hash = (x: float): int => {
        throw new Not_implemented("hash");
    };
}

export default Float;
