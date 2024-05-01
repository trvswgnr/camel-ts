import { tramp, type thunk, Thunk, type NoInfer } from "../utils";
import { Failure, Invalid_argument } from "./Exceptions";
import Int, { type int } from "./Int";
import Option, { type option } from "./Option";

export type list<a> = List.Empty | List.Cons<a>;

/**
 * Create an empty list.
 */
export function list<a>(): list<a>;
/**
 * Takes a variable number of arguments and returns a new list containing the
 * arguments.
 */
export function list<a>(...els: a[]): list<a>;
export function list<a>(...els: a[]): list<a> {
    return List.of_js_array(els);
}

/**
 * List operations.
 */
namespace List {
    /**
     * An alias for the type of lists.
     */
    export type t<a> = list<a>;

    const Empty = Symbol("Empty");
    export type Empty = { readonly t: typeof Empty };

    const Cons = Symbol("Cons");
    export type Cons<T> = {
        readonly t: typeof Cons;
        readonly head: T;
        readonly tail: list<T>;
    };

    /**
     * `is_list(v)` returns `true` if `v` is a list, and `false` otherwise.
     * @note not part of OCaml's standard library
     */
    export const is_list = <a>(v: a | list<a>): v is list<a> => {
        if (typeof v !== "object" || v === null || !("t" in v)) {
            return false;
        }
        return v.t === Empty || v.t === Cons;
    };

    /**
     * Match on a list.
     * @note not part of OCaml's standard library
     */
    export function match<T, U>(
        l: list<T>,
        cases: { Empty: () => U; Cons: (head: T, tail: list<T>) => U },
    ): U {
        return l.t === Empty ? cases.Empty() : cases.Cons(l.head, l.tail);
    }

    /**
     * Return the length (number of elements) of the given list.
     */
    export const length = <a>(l: list<a>): int => length_aux(0, l);
    function length_aux<a>(len: number, l: list<a>): int {
        let current = l;
        let length = len;
        while (current.t !== Empty) {
            length = length + 1;
            current = current.tail;
        }
        return length as int;
    }

    /**
     * Compare the lengths of two lists. `compare_lengths(l1, l2)` is equivalent
     * to `Int.compare(length(l1), length(l2))`, except that the computation
     * stops after reaching the end of the shortest list.
     */
    export const compare_lengths = <a>(l1: list<a>, l2: list<a>): int => {
        return tramp(compare_lengths_aux)(l1, l2) as int;
    };
    function compare_lengths_aux<a>(
        l1: list<a>,
        l2: list<a>,
    ): number | thunk<number> {
        switch (true) {
            case List.is_empty(l1) && List.is_empty(l2):
                return 0;
            case List.is_empty(l1):
                return -1;
            case List.is_empty(l2):
                return 1;
            case List.is_cons(l1) && List.is_cons(l2):
                return () => List.compare_lengths(l1.tail, l2.tail);
            default:
                throw new Invalid_argument("List.compare_lengths");
        }
    }

    /**
     * Compare the length of a list to an integer. `compare_length_with(l, len)` is
     * equivalent to `compare(length(l), len)`, except that the computation
     * stops after at most `len` iterations on the list.
     */
    export const compare_length_with = <a>(l: list<a>, n: int): int => {
        return tramp(compare_length_with_aux)(l, n) as int;
    };
    function compare_length_with_aux<a>(
        l: list<a>,
        n: number,
    ): thunk<number> | number {
        if (List.is_empty(l)) {
            if (n === 0) return 0;
            if (n > 0) return -1;
            return 1;
        }
        if (n <= 0) return 1;
        return () => List.compare_length_with(l.tail, (n - 1) as int);
    }

    /**
     * `is_empty(l)` is true if and only if `l` has no elements. It is
     * equivalent to `compare_length_with(l, 0) === 0`.
     */
    export const is_empty = <a>(l: list<a>): l is Empty => {
        return l.t === Empty;
    };

    export const is_cons = <a>(l: list<a>): l is Cons<a> => {
        return l.t === Cons;
    };

    /**
     * Create an empty list.
     * @note not part of OCaml's standard library
     */
    export const empty = <a>(): list<a> => ({ t: Empty });

    /**
     * `cons(head, tail)` returns a new list with `head` as the first element
     * and `tail` as the rest of the list.
     */
    export function cons<a>(head: a): (tail: list<a>) => list<a>;
    export function cons<a>(head: a, tail: list<a>): list<a>;
    export function cons<a>(head: a, tail?: list<a>) {
        if (tail !== undefined) {
            return {
                t: Cons,
                head,
                tail,
            } as list<a>;
        }
        return (tail: list<a>) => List.cons(head, tail);
    }

    /**
     * Return the first element of the given list.
     * @throws {Failure} if the list is empty.
     */
    export const hd = <a>(l: list<a>): a => {
        if (List.is_empty(l)) throw new Failure("hd");
        return l.head;
    };

    /**
     * Return the given list without its first element.
     * @throws {Failure} if the list is empty.
     */
    export const tl = <a>(l: list<a>): list<a> => {
        if (List.is_empty(l)) throw new Failure("tl");
        return l.tail;
    };

    /**
     * Return the n-th element of the given list. The first element (head of the
     * list) is at position 0.
     * @throws {Failure} if the list is too short.
     * @throws {Invalid_argument} if n is negative.
     */
    export const nth = <a>(l: list<a>, n: int): a => {
        if (n < 0) throw new Invalid_argument("List.nth");
        return tramp(nth_aux)(l, n);
    };
    function nth_aux<a>(l: list<a>, n: number): thunk<a> | a {
        if (n < 0) throw new Invalid_argument("List.nth");
        if (l.t === Empty) throw new Failure("nth");
        if (n === 0) return l.head;
        return () => List.nth(l.tail, (n - 1) as int);
    }

    /**
     * Return the `n`-th element of the given list. The first element (head of the
     * list) is at position 0. Return `None` if the list is too short.
     * @throws {Invalid_argument} if `n` is negative.
     */
    export function nth_opt<a>(l: list<a>, n: int): option<a> {
        if (n < 0) throw new Invalid_argument("List.nth");
        return tramp(nth_opt_aux)(l, n);
    }
    function nth_opt_aux<a>(
        l: list<a>,
        n: number,
    ): thunk<option<a>> | option<a> {
        if (n < 0) throw new Invalid_argument("List.nth");
        if (l.t === Empty) return Option.none();
        if (n === 0) return Option.some(l.head);
        return () => List.nth_opt(l.tail, (n - 1) as int);
    }

    /**
     * List reversal.
     */
    export const rev = <a>(l: list<a>): list<a> => {
        return tramp(rev_aux)(l, empty<a>());
    };
    function rev_aux<a>(l: list<a>, acc: list<a>): thunk<list<a>> | list<a> {
        if (l.t === Empty) {
            return acc;
        }
        return () => List.cons(l.head, List.append(l.tail, acc));
    }

    /**
     * `init len f` is [f 0; f 1; ...; f (len-1)], evaluated left to right.
     * @throws {Invalid_argument} if `len` is negative.
     */
    export const init = <a>(len: int, f: (n: int) => a): list<a> => {
        return init_helper(Int.zero, (len - 1) as int, f);
    };
    function init_helper<a>(i: int, last: int, f: (n: int) => a) {
        return tramp(init_helper_aux)(i, last, f);
    }
    function init_helper_aux<a>(
        i: int,
        last: int,
        f: (n: int) => a,
    ): thunk<list<a>> | list<a> {
        if (i > last) return empty<a>();
        if (i === last) return list(f(i));
        const r1 = f(i);
        const r2 = f((i + 1) as int);
        return () => {
            const l1 = init_helper((i + 2) as int, last, f);
            const l2 = List.cons(r2, l1);
            return List.cons(r1, l2);
        };
    }

    /**
     * Create a list from a JavaScript array.
     * @note not part of OCaml's standard library
     */
    export const of_js_array = <a>(arr: a[]): list<a> => {
        return tramp(of_js_array_aux)(arr);
    };
    function of_js_array_aux<a>(arr: a[]): thunk<list<a>> | list<a> {
        if (arr.length === 0) return empty<a>();
        return () => List.cons(arr[0]!, of_js_array(arr.slice(1)));
    }

    /**
     * `append(l0, l1)` appends `l1` to `l0`. Same function as the infix
     * operator `@` (in OCaml).
     */
    export const append = <a>(l0: list<a>, l1: list<a>): list<a> => {
        return tramp(append_aux)(l0, l1);
    };
    function append_aux<a>(l0: list<a>, l1: list<a>): thunk<list<a>> | list<a> {
        if (l0.t === Empty) {
            return l1;
        }
        return () => List.cons(l0.head, List.append(l0.tail, l1));
    }

    /**
     * `rev_append l1 l2` reverses `l1` and concatenates it with `l2`. This is
     * equivalent to `(List.rev l1) @ l2`.
     */
    export const rev_append = <a>(l1: list<a>, l2: list<a>): list<a> => {
        return List.append(List.rev(l1), l2);
    };

    /**
     * Concatenate a list of lists. The elements of the argument are all
     * concatenated together (in the same order) to give the result.
     */
    export const concat = <a>(l: list<list<a>>): list<a> => {
        return tramp(concat_aux)(l);
    };
    function concat_aux<a>(l: list<list<a>>): thunk<list<a>> | list<a> {
        if (List.is_empty(l)) return empty<a>();
        return () => List.append(List.hd(l), List.concat(List.tl(l)));
    }
    export const flatten = concat;

    /**
     * `equal(eq, l1, l2)` holds when `l1` and `l2` have the same length, and
     * for each pair of elements `ai`, `bi` at the same position we have `eq(ai,
     * bi)`.
     * @note the `eq` function may be called even if the lists have different
     * lengths. If you know your equality function is costly, you may want to
     * check `List.compare_lengths(l1, l2)` first.
     */
    export const equal = <a>(
        l1: list<a>,
        l2: list<a>,
        eq: (a: a, b: a) => boolean,
    ): boolean => tramp(equal_aux)(l1, l2, eq);
    function equal_aux<a>(
        l1: list<a>,
        l2: list<a>,
        eq: (a: a, b: a) => boolean,
    ): thunk<boolean> | boolean {
        if (List.is_empty(l1) && List.is_empty(l2)) return true;
        if (List.is_empty(l1) || List.is_empty(l2)) return false;
        return () => eq(l1.head, l2.head) && List.equal(l1.tail, l2.tail, eq);
    }

    /**
     * `compare cmp(l1, l2)` performs a lexicographic comparison of the two input
     * lists, using the same 'a -> 'a -> int interface as compare:
     * a1 :: l1 is smaller than a2 :: l2 (negative result) if a1 is smaller than
     * a2, or if they are equal (0 result) and l1 is smaller than l2
     * the empty list [] is strictly smaller than non-empty lists
     * Note: the cmp function will be called even if the lists have different
     * lengths.
     */
}

export function js_array_from_list<a>(l: list<a>): a[] {
    let current = l;
    const arr: a[] = [];
    while (List.is_cons(current)) {
        arr.push(current.head);
        current = current.tail;
    }
    return arr;
}

export default List;
