import { Invalid_argument } from "./Exceptions";
import Int, { type int } from "./Int";

/**
 * `compare(x, y)` returns 0 if `x` is equal to `y`, a negative integer if `x`
 * is less than `y`, and a positive integer if `x` is greater than `y`. The
 * ordering implemented by `compare(x, y)` is compatible with the comparison
 * predicates =, < and > defined above, with one difference on the treatment of
 * the float value `nan`. Namely, the comparison predicates treat `nan` as
 * different from any other float value, including itself; while `compare(x, y)`
 * treats `nan` as equal to itself and less than any other float value. This
 * treatment of nan ensures that compare defines a total ordering relation.
 *
 * `compare(x, y)` applied to functional values may raise `Invalid_argument`.
 * `compare(x, y)` applied to cyclic structures may not terminate.
 *
 * The `compare(x, y)` function can be used as the comparison function required
 * by the `Set.Make` and `Map.Make` functors, as well as the `List.sort` and
 * `Array.sort` functions.
 */
export function compare<T>(x: T, y: T): int {
    if (typeof x !== typeof y) throw new Invalid_argument("compare(x, y)");
    if (typeof x === "number" && typeof y === "number") {
        if (isNaN(x) && isNaN(y)) return Int.zero;
        if (isNaN(x) && !isNaN(y)) return Int.minus_one;
        if (!isNaN(x) && isNaN(y)) return Int.one;
        return x < y ? Int.minus_one : Int.one;
    }
    if (typeof x === "string" && typeof y === "string") {
        return x.localeCompare(y) as int;
    }

    if (typeof x === "boolean" && typeof y === "boolean") {
        return x === y ? Int.zero : x ? Int.one : Int.minus_one;
    }

    if (typeof x === "object" && typeof y === "object") {
        if (x === null && y === null) return Int.zero;
        if (x === null) return Int.minus_one;
        if (y === null) return Int.one;
    }

    if (x === y) return Int.zero;
    if (x < y) return Int.minus_one;
    return Int.one;
}
