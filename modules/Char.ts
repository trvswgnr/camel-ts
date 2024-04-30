/*
```md
# Module [Char](type_Char.html)
```
module Char: sig [..](Char.html) end
```
Character operations.
---
```
val code : char -> int
```
Return the ASCII code of the argument.
```
val chr : int -> char
```
Return the character with the given ASCII code.
* **Raises** `Invalid_argument` if the argument is
 outside the range 0--255.
```
val escaped : char -> string
```
Return a string representing the given character,
 with special characters escaped following the lexical conventions
 of OCaml.
 All characters outside the ASCII printable range (32..126) are
 escaped, as well as backslash, double-quote, and single-quote.
```
val lowercase_ascii : char -> char
```
Convert the given character to its equivalent lowercase character,
 using the US-ASCII character set.
* **Since** 4.03
```
val uppercase_ascii : char -> char
```
Convert the given character to its equivalent uppercase character,
 using the US-ASCII character set.
* **Since** 4.03
```
type t = char 
```
An alias for the type of characters.
```
val compare : [t](Char.html#TYPEt) -> [t](Char.html#TYPEt) -> int
```
The comparison function for characters, with the same specification as
 [`compare`](Stdlib.html#VALcompare). Along with the type `t`, this function `compare`
 allows the module `Char` to be passed as argument to the functors
 [`Set.Make`](Set.Make.html) and [`Map.Make`](Map.Make.html).
```
val equal : [t](Char.html#TYPEt) -> [t](Char.html#TYPEt) -> bool
```
The equal function for chars.
* **Since** 4.03
```
val seeded_hash : int -> [t](Char.html#TYPEt) -> int
```
A seeded hash function for characters, with the same output value as
 [`Hashtbl.seeded_hash`](Hashtbl.html#VALseeded_hash). This function allows this module to be passed as
 argument to the functor [`Hashtbl.MakeSeeded`](Hashtbl.MakeSeeded.html).
* **Since** 5.1
```
val hash : [t](Char.html#TYPEt) -> int
```
An unseeded hash function for characters, with the same output value as
 [`Hashtbl.hash`](Hashtbl.html#VALhash). This function allows this module to be passed as argument
 to the functor [`Hashtbl.Make`](Hashtbl.Make.html).
* **Since** 5.1
```
*/

import { Nominal } from "../utils";
import { Invalid_argument, Not_implemented } from "./Exceptions";
import type { int } from "./Int";

export type char = Nominal<string, "char">;
export const char = (s: string): char => {
    if (s.length !== 1) {
        throw new Invalid_argument("must be a single character");
    }
    return s as char;
};

/**
 * Character operations.
 */
namespace Char {
    /**
     * An alias for the type of characters.
     */
    export type t = char;

    /**
     * Return the ASCII code of the argument.
     *
     * @throws {Invalid_argument} if the character is not a valid Unicode character.
     */
    export const code = (c: char): int => {
        const char_code = c.charCodeAt(0);
        if (isNaN(char_code)) {
            throw new Invalid_argument("invalid character");
        }
        return char_code as int;
    };

    /**
     * Return the character with the given ASCII code.
     *
     * @throws {Invalid_argument} if the code is outside the range 0-255.
     */
    export const chr = (i: int): char => {
        if (i < 0 || i > 255) {
            throw new Invalid_argument("invalid code");
        }
        return String.fromCharCode(i) as char;
    };

    /**
     * Return a string representing the given character, with special characters
     * escaped following the lexical conventions of OCaml. All characters
     * outside the ASCII printable range (32..126) are escaped, as well as
     * backslash, double-quote, and single-quote.
     */
    export const escaped = (c: char): string => {
        const charCode = c.charCodeAt(0);

        if (
            charCode >= 32 &&
            charCode <= 126 &&
            c !== "\\" &&
            c !== '"' &&
            c !== "'"
        ) {
            return c;
        }

        switch (c) {
            case "\\":
                return "\\\\";
            case '"':
                return '\\"';
            case "'":
                return "\\'";
            case "\n":
                return "\\n";
            case "\t":
                return "\\t";
            case "\r":
                return "\\r";
            case "\b":
                return "\\b";
            default:
                if (charCode < 256) {
                    return "\\" + charCode.toString(8).padStart(3, "0");
                } else {
                    return "\\u" + charCode.toString(16).padStart(4, "0");
                }
        }
    };

    /**
     * Convert the given character to its equivalent lowercase character, using
     * the US-ASCII character set.
     */
    export const lowercase_ascii = (c: char): char => {
        return c.toLowerCase() as char;
    };

    /**
     * Convert the given character to its equivalent uppercase character, using
     * the US-ASCII character set.
     */
    export const uppercase_ascii = (c: char): char => {
        return c.toUpperCase() as char;
    };

    /**
     * The comparison function for characters, with the same specification as
     * `Stdlib.VALcompare`. Along with the type `t`, this function `compare`
     * allows the module `Char` to be passed as argument to the functors
     * `Set.Make` and `Map.Make`.
     */
    export const compare = (x: char, y: char): int => {
        const comparison = x.localeCompare(y);
        if (comparison < 0) {
            return -1 as int;
        }
        if (comparison > 0) {
            return 1 as int;
        }
        return 0 as int;
    };

    /**
     * The equal function for chars.
     */
    export const equal = (x: char, y: char): boolean => x === y;

    /**
     * A seeded hash function for characters, with the same output value as
     * `Hashtbl.seeded_hash`. This function allows this module to be passed as
     * argument to the functor `Hashtbl.MakeSeeded`.
     */
    export const seeded_hash = (seed: int, c: char): int => {
        throw new Not_implemented("Char.seeded_hash");
        // return Hashtbl.seeded_hash(seed, c);
    };

    /**
     * An unseeded hash function for characters, with the same output value as
     * `Hashtbl.hash`. This function allows this module to be passed as argument
     * to the functor `Hashtbl.Make`.
     */
    export const hash = (c: char): int => {
        throw new Not_implemented("Char.hash");
        // return Hashtbl.hash(c);
    };
}

export default Char;
