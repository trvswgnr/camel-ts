import { trampoline, type thunk } from "../utils";
import { Failure, Invalid_argument } from "./Exceptions";
import Int, { type int } from "./Int";

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
