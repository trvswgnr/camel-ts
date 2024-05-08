import type { Nominal } from "../utils";

export type unit = Nominal<void, "unit">;
export const unit = void 0 as unit;

/**
 * Unit values.
 */
namespace Unit {
    /**
     * The unit type.
     */
    export type t = unit;

    /**
     * `equal(u1, u2)` is `true`.
     */
    export const equal = (u1: unit, u2: unit): true => true;

    /**
     * `compare(u1, u2)` is `0`.
     */
    export const compare = (u1: unit, u2: unit): 0 => 0;

    /**
     * `to_string(u)` is `"()"`.
     */
    export const to_string = (u: unit): "()" => "()";
}

export function fn_void_to_unit<A extends readonly any[], R>(
    f: (...args: A) => R,
): (...args: A) => unit {
    return (...args) => {
        f(...args);
        return unit;
    };
}

export default Unit;
