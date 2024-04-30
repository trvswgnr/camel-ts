import { trampoline, type thunk } from "../utils";
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
    let l = empty<a>();
    if (els.length === 0) {
        return l;
    }
    for (let i = els.length - 1; i >= 0; i--) {
        l = List.cons(els[i]!, l);
    }
    return l;
}

/**
 * List operations.
 */
namespace List {
    /**
     * An alias for the type of lists.
     */
    export type t<a> = list<a>;

    export const Empty = Symbol("Empty");
    export type Empty = { readonly t: typeof Empty };

    export const Cons = Symbol("Cons");
    export type Cons<T> = {
        readonly t: typeof Cons;
        readonly head: T;
        readonly tail: list<T>;
    };

    /**
     * `is_list(v)` returns `true` if `v` is a list, and `false` otherwise.
     */
    export const is_list = <a>(v: a | list<a>): v is list<a> => {
        if (typeof v !== "object" || v === null || !("t" in v)) {
            return false;
        }
        return v.t === List.Empty || v.t === List.Cons;
    };

    /**
     * Helper to allow pattern matching on lists.
     */
    export const match = <T, U>(
        l: list<T>,
        cases: { Empty: () => U; Cons: (head: T, tail: list<T>) => U },
    ) => {
        return l.t === List.Empty ? cases.Empty() : cases.Cons(l.head, l.tail);
    };

    /**
     * Return the length (number of elements) of the given list.
     */
    export const length = <a>(l: list<a>): int => length_aux(0, l);

    /**
     * Compare the lengths of two lists. `compare_lengths(l1, l2)` is equivalent
     * to `Int.compare(length(l1), length(l2))`, except that the computation
     * stops after reaching the end of the shortest list.
     */
    export const compare_lengths = <a>(l1: list<a>, l2: list<a>): int => {
        let current1 = l1;
        let current2 = l2;

        while (current1.t !== List.Empty && current2.t !== List.Empty) {
            current1 = current1.tail;
            current2 = current2.tail;
        }

        switch (true) {
            case current1.t === List.Empty && current2.t === List.Empty:
                return 0 as int; // Both lists are of the same length
            case current1.t === List.Empty:
                return -1 as int; // l1 is shorter than l2
            default:
                return 1 as int; // l1 is longer than l2
        }
    };

    /**
     * Compare the length of a list to an integer. `compare_length_with(l, len)` is
     * equivalent to `compare(length(l), len)`, except that the computation
     * stops after at most `len` iterations on the list.
     */
    export const compare_length_with = <a>(l: list<a>, len: int): int => {
        let current = l;
        let count = 0;

        while (current.t !== List.Empty && count < len) {
            current = current.tail;
            count++;
        }

        switch (true) {
            case current.t === List.Empty && count < len:
                return -1 as int;
            case current.t !== List.Empty && count === len:
                return 1 as int;
            default:
                return 0 as int;
        }
    };

    /**
     * `is_empty(l)` is true if and only if `l` has no elements. It is
     * equivalent to `compare_length_with(l, 0) === 0`.
     */
    export const is_empty = <a>(l: list<a>): l is List.Empty => {
        return compare_length_with(l, 0 as int) === 0;
    };

    /**
     * `cons(head, tail)` returns a new list with `head` as the first element
     * and `tail` as the rest of the list.
     */
    export const cons = <a>(head: a, tail: list<a>): list<a> => {
        return {
            t: List.Cons,
            head,
            tail,
        };
    };

    /**
     * Return the first element of the given list.
     * @throws {Failure} if the list is empty.
     */
    export const hd = <a>(l: list<a>): a => {
        if (l.t === List.Empty) {
            throw new Failure("hd");
        }
        return l.head;
    };

    /**
     * Return the given list without its first element.
     * @throws {Failure} if the list is empty.
     */
    export const tl = <a>(l: list<a>): list<a> => {
        if (l.t === List.Empty) {
            throw new Failure("List.tl");
        }
        return l.tail;
    };

    /**
     * Return the n-th element of the given list. The first element (head of the
     * list) is at position 0.
     * @throws {Failure} if the list is too short.
     * @throws {Invalid_argument} if n is negative.
     */
    export const nth = <a>(l: list<a>, n: int): a => {
        if (n < 0) {
            throw new Invalid_argument("List.nth");
        }
        let current = l;
        let i = n as number;
        while (current.t !== List.Empty) {
            if (i === 0) {
                return current.head;
            }
            i = i - 1;
            current = current.tail;
        }
        throw new Failure("nth");
    };

    /**
     * Return the `n`-th element of the given list. The first element (head of the
     * list) is at position 0. Return `None` if the list is too short.
     * @throws {Invalid_argument} if `n` is negative.
     */
    export const nth_opt = <a>(l: list<a>, n: int): option<a> => {
        if (n < 0) {
            throw new Invalid_argument("List.nth");
        }
        let current = l;
        let i = n as number;
        while (current.t !== List.Empty) {
            if (i === 0) {
                return Option.some(current.head);
            }
            i = i - 1;
            current = current.tail;
        }
        return Option.none();
    };

    /**
     * List reversal.
     */
    export const rev = <a>(l: list<a>): list<a> => {
        return trampoline(rev_aux)(l, empty<a>());
    };

    /**
     * `init len f` is [f 0; f 1; ...; f (len-1)], evaluated left to right.
     * @throws {Invalid_argument} if `len` is negative.
     */
    export const init = <a>(len: int, f: (n: int) => a): list<a> => {
        if (len < 0) {
            throw new Invalid_argument("List.init");
        }
        return list(...Array(len).map((_, i) => f(i as int)));
    };

    /**
     * `append(l0, l1)` appends `l1` to `l0`. Same function as the infix
     * operator `@` (in OCaml).
     */
    export const append = <a>(l0: list<a>, l1: list<a>): list<a> => {
        return trampoline(append_aux)(l0, l1);
    };
}

function empty<a>(): list<a> {
    return { t: List.Empty };
}

function length_aux<a>(len: number, l: list<a>): int {
    let current = l;
    let length = len;
    while (current.t !== List.Empty) {
        length = length + 1;
        current = current.tail;
    }
    return length as int;
}

function append_aux<a>(l0: list<a>, l1: list<a>): thunk<list<a>> | list<a> {
    if (l0.t === List.Empty) {
        return l1;
    }
    return () => List.cons(l0.head, List.append(l0.tail, l1));
}

function rev_aux<a>(l: list<a>, acc: list<a>): thunk<list<a>> | list<a> {
    if (l.t === List.Empty) {
        return acc;
    }
    return () => List.cons(l.head, List.append(l.tail, acc));
}

export function js_array_from_list<a>(l: list<a>): a[] {
    let current = l;
    const arr: a[] = [];
    while (current.t !== List.Empty) {
        arr.push(current.head);
        current = current.tail;
    }
    return arr;
}

export default List;
