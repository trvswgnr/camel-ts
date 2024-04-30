import { Invalid_argument, Not_implemented } from "./Exceptions";
import { Nominal } from "../utils";
import Int, { type int } from "./Int";
import Float, { type float } from "./Float";
import type { list } from "./List";
import List from "./List";
import Option, { type option } from "./Option";

class _array<T> {
    [key: int]: T;
}

export type array<T> = Nominal<_array<T>, "array">;

const make_empty_array = <T>(): array<T> => new _array<T>() as array<T>;

/**
 * Array operations.
 */
namespace Array {
    /**
     * An alias for the type of arrays.
     */
    export type t<T> = array<T>;

    /**
     * Return the length (number of elements) of the given array.
     */
    export const length = <T>(a: t<T>): int => Object.keys(a).length as int;

    /**
     * `get(a, n)` returns the element number `n` of array `a`. The first
     * element has number 0. The last element has number `length(a) - 1`.
     *
     * You can also write `a[n]` instead of `get(a, n)`.
     *
     * @throws {Invalid_argument} if `n` is outside the range 0 to `(length(a) -
     * 1)`.
     */
    export const get = <T>(a: t<T>, n: int): T => {
        if (n < 0 || n >= length(a)) {
            throw new Invalid_argument("index out of bounds");
        }
        return a[n]!;
    };

    /**
     * `set(a, n, x)` modifies array `a` in place, replacing element number `n`
     * with `x`.
     *
     * You can also write `a[n] = x` instead of `set(a, n, x)`.
     *
     * @throws {Invalid_argument} if `n` is outside the range 0 to `length(a) -
     * 1`.
     */
    export const set = <T>(a: t<T>, n: int, x: T): void => {
        if (n < 0 || n >= length(a)) {
            throw new Invalid_argument("index out of bounds");
        }
        a[n] = x;
    };

    /**
     * `make(n, x)` returns a fresh array of length `n`, initialized with `x`.
     * All the elements of this new array are initially physically equal to `x`
     * (in the sense of the `==` predicate). Consequently, if `x` is mutable,
     * it is shared among all elements of the array, and modifying `x` through
     * one of the array entries will modify all other entries at the same time.
     *
     * @throws {Invalid_argument} if `n < 0` or `n > Sys.max_array_length`. If
     * the value of `x` is a floating-point number, then the maximum size is
     * only `Sys.max_array_length / 2`.
     */
    export const make = <T>(n: int, x: T): array<T> => {
        const arr = make_empty_array<T>();
        for (let i = 0 as int; i < n; i++) {
            arr[i] = x;
        }
        return arr;
    };

    /**
     * `create_float(n)` returns a fresh float array of length `n`, with
     * uninitialized data.
     */
    export const create_float = (n: int): array<float> => {
        const arr = make_empty_array<float>();
        for (let i = 0 as int; i < n; i++) {
            arr[i] = Float.nan;
        }
        return arr;
    };

    /**
     * `init(n, f)` returns a fresh array of length `n`, with element number `i`
     * initialized to the result of `f(i)`. In other terms, `init(n, f)`
     * tabulates the results of `f` applied in order to the integers `0` to
     * `n-1`.
     *
     * @throws {Invalid_argument} if `n < 0` or `n > Sys.max_array_length`. If
     * the return type of `f` is `float`, then the maximum size is only
     * `Sys.max_array_length / 2`.
     */
    export const init = <T>(n: int, f: (i: int) => T): array<T> => {
        const arr = make_empty_array<T>();
        for (let i = 0 as int; i < n; i++) {
            arr[i] = f(i);
        }
        return arr;
    };

    /**
     * `make_matrix(dimx, dimy, e)` returns a two-dimensional array (an array of
     * arrays) with first dimension `dimx` and second dimension `dimy`. All the
     * elements of this new matrix are initially physically equal to `e`. The
     * element `(x, y)` of a matrix `m` is accessed with the notation `m[x][y]`.
     *
     * @throws {Invalid_argument} if `dimx` or `dimy` is negative or greater
     * than `Sys.max_array_length`. If the value of `e` is a floating-point
     * number, then the maximum size is only `Sys.max_array_length / 2`.
     */
    export const make_matrix = <T>(
        dimx: int,
        dimy: int,
        e: T,
    ): array<array<T>> => {
        const arr = make_empty_array<array<T>>();
        for (let i = 0 as int; i < dimx; i++) {
            arr[i] = make(dimy, e);
        }
        return arr;
    };

    /**
     * `append(v1, v2)` returns a fresh array containing the concatenation of
     * the arrays `v1` and `v2`.
     *
     * @throws {Invalid_argument} if `length(v1) + length(v2) > Sys.max_array_length`.
     */
    export const append = <T>(v1: t<T>, v2: t<T>): t<T> => {
        const arr = make_empty_array<T>();
        for (let i = 0 as int; i < length(v1); i++) {
            arr[i] = get(v1, i);
        }
        for (let i = 0 as int; i < length(v2); i++) {
            arr[(length(v1) + i) as int] = get(v2, i);
        }
        return arr;
    };

    /**
     * Same as `Array.append`, but concatenates a list of arrays.
     */
    export const concat = <T>(lists: list<t<T>>): t<T> => {
        const arr = make_empty_array<T>();
        for (let i = 0 as int; i < List.length(lists); i++) {
            const a = List.get(lists, i);
            for (let j = 0 as int; j < length(a); j++) {
                arr[(length(arr) + j) as int] = get(a, j);
            }
        }
        return arr;
    };

    /**
     * `sub(a, pos, len)` returns a fresh array of length `len`, containing the
     * elements number `pos` to `pos + len - 1` of array `a`.
     *
     * @throws {Invalid_argument} if `pos` or `len` is outside the range 0 to
     * `length(a) - 1`.
     */
    export const sub = <T>(a: t<T>, pos: int, len: int): t<T> => {
        if (pos < 0 || pos >= length(a) || len < 0 || pos + len > length(a)) {
            throw new Invalid_argument("invalid pos or len");
        }
        const arr = make_empty_array<T>();
        for (let i = 0 as int; i < len; i++) {
            arr[i] = get(a, (pos + i) as int);
        }
        return arr;
    };

    /**
     * `copy(a)` returns a copy of a, that is, a fresh array containing the same
     * elements as a.
     */
    export const copy = <T>(a: t<T>): t<T> => {
        const arr = make_empty_array<T>();
        for (let i = 0 as int; i < length(a); i++) {
            arr[i] = get(a, i);
        }
        return arr;
    };

    /**
     * `fill(a, pos, len, x)` modifies the array `a` in place, storing `x` in
     * elements number `pos` to `pos + len - 1`.
     *
     * @throws {Invalid_argument} if `pos` and `len` do not designate a valid
     * subarray of `a`.
     */
    export const fill = <T>(a: t<T>, pos: int, len: int, x: T): void => {
        if (pos < 0 || len < 0 || pos + len > length(a)) {
            throw new Invalid_argument("invalid pos or len");
        }
        for (let i = 0 as int; i < len; i++) {
            set(a, (pos + i) as int, x);
        }
    };

    /**
     * `blit(src, src_pos, dst, dst_pos, len)` copies `len` elements from array
     * `src`, starting at element number `src_pos`, to array `dst`, starting at
     * element number `dst_pos`. It works correctly even if `src` and `dst` are
     * the same array, and the source and destination chunks overlap.
     *
     * @throws {Invalid_argument} if `src_pos` and `len` do not designate a
     * valid subarray of `src`, or if `dst_pos` and `len` do not designate a
     * valid subarray of `dst`.
     */
    export const blit = <T>(
        src: t<T>,
        src_pos: int,
        dst: t<T>,
        dst_pos: int,
        len: int,
    ): void => {
        if (
            src_pos < 0 ||
            len < 0 ||
            src_pos + len > length(src) ||
            dst_pos < 0 ||
            dst_pos + len > length(dst)
        ) {
            throw new Invalid_argument("invalid src/dst pos or len");
        }
        for (let i = 0; i < len; i++) {
            set(dst, (dst_pos + i) as int, get(src, (src_pos + i) as int));
        }
    };

    /**
     * `to_list(a)` returns the list of all the elements of `a`.
     */
    export const to_list = <T>(a: t<T>): T[] => {
        const list: T[] = [];
        for (let i = 0 as int; i < length(a); i++) {
            list.push(get(a, i));
        }
        return list;
    };

    /**
     * `of_list(l)` returns a fresh array containing the elements of `l`.
     *
     * @throws {Invalid_argument} if the length of `l` is greater than
     * `Sys.max_array_length`.
     */
    export const of_list = <T>(l: list<T>): t<T> => {
        const arr = make_empty_array<T>();
        for (let i = 0 as int; i < List.length(l); i++) {
            arr[i] = List.get(l, i);
        }
        return arr;
    };

    /**
     * `iter(f, a)` applies function `f` in turn to all the elements of `a`. It
     * is equivalent to `f(a[0]); f(a[1]); ...; f(a[length(a) - 1]); ()`.
     */
    export const iter = <T>(f: (x: T) => void, a: t<T>): void => {
        for (let i = 0 as int; i < length(a); i++) {
            f(get(a, i));
        }
    };

    /**
     * Same as `iter`, but the function is applied to the index of the element
     * as first argument, and the element itself as second argument.
     */
    export const iteri = <T>(f: (i: int, x: T) => void, a: t<T>): void => {
        for (let i = 0; i < length(a); i++) {
            f(i as int, get(a, i as int));
        }
    };

    /**
     * `map(f, a)` applies function `f` to all the elements of `a`, and builds
     * an array with the results returned by `f`:
     * `[| f(a[0]); f(a[1]); ...; f(a[length(a) - 1]) |]`.
     */
    export const map = <T, U>(f: (x: T) => U, a: t<T>): t<U> => {
        const arr = make_empty_array<U>();
        for (let i = 0 as int; i < length(a); i++) {
            arr[i] = f(get(a, i));
        }
        return arr;
    };

    /**
     * `map_inplace(f, a)` applies function `f` to all elements of `a`, and
     * updates their values in place.
     */
    export const map_inplace = <T>(f: (x: T) => T, a: t<T>): void => {
        for (let i = 0 as int; i < length(a); i++) {
            a[i] = f(a[i]!);
        }
    };

    /**
     * Same as `Array.map`, but the function is applied to the index of the element
     * as first argument, and the element itself as second argument.
     */
    export const mapi = <T, U>(f: (i: int, x: T) => U, a: t<T>): t<U> => {
        const arr = make_empty_array<U>();
        for (let i = 0 as int; i < length(a); i++) {
            arr[i] = f(i, get(a, i));
        }
        return arr;
    };

    /**
     * Same as `Array.map_inplace`, but the function is applied to the index of the
     * element as first argument, and the element itself as second argument.
     */
    export const mapi_inplace = <T>(f: (i: int, x: T) => T, a: t<T>): void => {
        for (let i = 0 as int; i < length(a); i++) {
            a[i] = f(i, a[i]!);
        }
    };

    /**
     * `fold_left(f, init, a)` computes `f (... (f (f init a.(0)) a.(1)) ...)
     * a.(n-1)`, where `n` is the length of the array `a`.
     */
    export const fold_left = <T, U>(
        f: (acc: U, x: T) => U,
        init: U,
        a: t<T>,
    ): U => {
        let acc = init;
        for (let i = 0 as int; i < length(a); i++) {
            acc = f(acc, get(a, i));
        }
        return acc;
    };

    /**
     * `fold_left_map` is a combination of `Array.fold_left` and `Array.map` that
     * threads an accumulator through calls to `f`.
     */
    export const fold_left_map = <T, U, V>(
        f: (acc: U, x: T) => [U, V],
        init: U,
        a: t<T>,
    ): [U, t<V>] => {
        let acc = init;
        const arr = make_empty_array<V>();
        for (let i = 0 as int; i < length(a); i++) {
            const [newAcc, y] = f(acc, get(a, i));
            acc = newAcc;
            arr[i] = y;
        }
        return [acc, arr];
    };

    /**
     * `fold_right(f, a, init)` computes `f a.(0) (f a.(1) ( ... (f a.(n-1) init)
     * ...))`, where `n` is the length of the array `a`.
     */
    export const fold_right = <T, U>(
        f: (x: T, acc: U) => U,
        a: t<T>,
        init: U,
    ): U => {
        let acc = init;
        for (let i = (length(a) - 1) as int; i >= 0; i--) {
            acc = f(get(a, i), acc);
        }
        return acc;
    };

    /**
     * `iter2(f, a, b)` applies function `f` to all the elements of `a` and `b`.
     *
     * @throws {Invalid_argument} if the arrays are not the same size.
     */
    export const iter2 = <T, U>(
        f: (x: T, y: U) => void,
        a: t<T>,
        b: t<U>,
    ): void => {
        if (length(a) !== length(b)) {
            throw new Invalid_argument("arrays must have the same length");
        }
        for (let i = 0 as int; i < length(a); i++) {
            f(get(a, i), get(b, i));
        }
    };

    /**
     * `map2(f, a, b)` applies function `f` to all the elements of `a` and `b`,
     * and builds an array with the results returned by `f`:
     * `[| f a.(0) b.(0); ...; f a.(length a - 1) b.(length b - 1)|]`.
     *
     * @throws {Invalid_argument} if the arrays are not the same size.
     */
    export const map2 = <T, U, V>(
        f: (x: T, y: U) => V,
        a: t<T>,
        b: t<U>,
    ): t<V> => {
        if (length(a) !== length(b)) {
            throw new Invalid_argument("arrays must have the same length");
        }
        const arr = make_empty_array<V>();
        for (let i = 0 as int; i < length(a); i++) {
            arr[i] = f(get(a, i), get(b, i));
        }
        return arr;
    };

    /**
     * `for_all(f, a)` checks if all elements of the array `a` satisfy the
     * predicate `f`. That is, it returns `(f a.(0)) && (f a.(1)) && ... && (f a.(n-1))`.
     */
    export const for_all = <T>(f: (x: T) => boolean, a: t<T>): boolean => {
        for (let i = 0 as int; i < length(a); i++) {
            if (!f(get(a, i))) {
                return false;
            }
        }
        return true;
    };

    /**
     * `exists(f, a)` checks if at least one element of the array `a` satisfies
     * the predicate `f`. That is, it returns
     * `(f a.(0)) || (f a.(1)) || ... || (f a.(n-1))`.
     */
    export const exists = <T>(f: (x: T) => boolean, a: t<T>): boolean => {
        for (let i = 0 as int; i < length(a); i++) {
            if (f(get(a, i))) {
                return true;
            }
        }
        return false;
    };

    /**
     * Same as `Array.for_all`, but for a two-argument predicate.
     *
     * @throws {Invalid_argument} if the two arrays have different lengths.
     */
    export const for_all2 = <T, U>(
        f: (x: T, y: U) => boolean,
        a: t<T>,
        b: t<U>,
    ): boolean => {
        if (length(a) !== length(b)) {
            throw new Invalid_argument("arrays must have the same length");
        }
        for (let i = 0 as int; i < length(a); i++) {
            if (!f(get(a, i), get(b, i))) {
                return false;
            }
        }
        return true;
    };

    /**
     * Same as `Array.exists`, but for a two-argument predicate.
     *
     * @throws {Invalid_argument} if the two arrays have different lengths.
     */
    export const exists2 = <T, U>(
        f: (x: T, y: U) => boolean,
        a: t<T>,
        b: t<U>,
    ): boolean => {
        if (length(a) !== length(b)) {
            throw new Invalid_argument("arrays must have the same length");
        }
        for (let i = 0 as int; i < length(a); i++) {
            if (f(get(a, i), get(b, i))) {
                return true;
            }
        }
        return false;
    };

    /**
     * `mem(a, arr)` returns true if and only if `a` is structurally equal to an
     * element of `arr` (i.e. there is an `x` in `arr` such that `compare(a, x) = 0`).
     */
    export const mem = <T>(a: T, arr: t<T>): boolean => {
        for (let i = 0 as int; i < length(arr); i++) {
            if (arr[i] === a) {
                return true;
            }
        }
        return false;
    };

    /**
     * Same as `Array.mem`, but uses physical equality instead of structural
     * equality to compare array elements.
     */
    export const memq = <T>(a: T, arr: t<T>): boolean => {
        for (let i = 0 as int; i < length(arr); i++) {
            if (arr[i] === a) {
                return true;
            }
        }
        return false;
    };

    /**
     * `find_opt(f, a)` returns the first element of the array `a` that satisfies
     * the predicate `f`, or `None` if there is no value that satisfies `f` in
     * the array `a`.
     */
    export const find_opt = <T>(f: (x: T) => boolean, a: t<T>): option<T> => {
        for (let i = 0 as int; i < length(a); i++) {
            if (f(get(a, i))) {
                return Option.some(get(a, i));
            }
        }
        return Option.none();
    };

    /**
     * `find_index(f, a)` returns `Some(i)`, where `i` is the index of the first
     * element of the array `a` that satisfies `f(x)`, if there is such an element.
     *
     * It returns `None` if there is no such element.
     */
    export const find_index = <T>(
        f: (x: T) => boolean,
        a: t<T>,
    ): option<int> => {
        for (let i = 0 as int; i < length(a); i++) {
            if (f(get(a, i))) {
                return Option.some(i);
            }
        }
        return Option.none();
    };

    /**
     * `find_map(f, a)` applies `f` to the elements of `a` in order, and returns
     * the first result of the form `Some(v)`, or `None` if none exist.
     */
    export const find_map = <T, U>(
        f: (x: T) => option<U>,
        a: t<T>,
    ): option<U> => {
        for (let i = 0 as int; i < length(a); i++) {
            const result = f(get(a, i));
            if (Option.is_some(result)) {
                return result;
            }
        }
        return Option.none();
    };

    /**
     * Same as `find_map`, but the predicate is applied to the index of the
     * element as first argument (counting from 0), and the element itself as
     * second argument.
     */
    export const find_mapi = <T, U>(
        f: (i: int, x: T) => option<U>,
        a: t<T>,
    ): option<U> => {
        for (let i = 0 as int; i < length(a); i++) {
            const result = f(i, get(a, i));
            if (Option.is_some(result)) {
                return result;
            }
        }
        return Option.none();
    };

    /**
     * `split(a)` is `([|a1; ...; an|], [|b1; ...; bn|])`, where
     * `a` is `[|(a1,b1); ...; (an,bn)|]`.
     */
    export const split = <T, U>(a: t<[T, U]>): [t<T>, t<U>] => {
        const arr1 = make_empty_array<T>();
        const arr2 = make_empty_array<U>();
        for (let i = 0 as int; i < length(a); i++) {
            const [x, y] = get(a, i);
            arr1[i] = x;
            arr2[i] = y;
        }
        return [arr1, arr2];
    };

    /**
     * `combine(a1, a2)` is `[|(a1.(0),a2.(0)); ...; (a1.(n-1),a2.(n-1))|]`,
     * where `n` is the minimum of `length(a1)` and `length(a2)`.
     *
     * @throws {Invalid_argument} if the two arrays have different lengths.
     */
    export const combine = <T, U>(a1: t<T>, a2: t<U>): t<[T, U]> => {
        if (length(a1) !== length(a2)) {
            throw new Invalid_argument("arrays must have the same length");
        }
        const arr = make_empty_array<[T, U]>();
        for (let i = 0 as int; i < length(a1); i++) {
            arr[i] = [get(a1, i), get(a2, i)];
        }
        return arr;
    };

    /**
     * Sort an array in increasing order according to a comparison function.
     * The comparison function must return 0 if its arguments compare as equal,
     * a positive integer if the first is greater, and a negative integer if
     * the first is smaller (see below for a complete specification).
     *
     * After calling `sort`, the array is sorted in place in increasing order.
     * `sort` is guaranteed to run in constant heap space and (at most)
     * logarithmic stack space.
     *
     * The current implementation uses Heap Sort. It runs in constant stack space.
     *
     * Specification of the comparison function:
     * Let `a` be the array and `cmp` the comparison function.
     * The following must be true for all x, y, z in a :
     * - `cmp(x, y) > 0` if and only if `cmp(y, x) < 0`
     * - if `cmp(x, y) >= 0` and `cmp(y, z) >= 0` then `cmp(x, z) >= 0`
     *
     * When `sort` returns, `a` contains the same elements as before, reordered
     * in such a way that for all i and j valid indices of `a`:
     * - `cmp(a[i], a[j]) >= 0` if and only if `i >= j`
     */
    export const sort = <T>(cmp: (a: T, b: T) => int, a: t<T>): void => {
        const arr = a as any;
        // Heap Sort implementation
        const heapify = (start: number, end: number) => {
            let root = start;
            while (root * 2 + 1 < end) {
                let child = root * 2 + 1;
                if (child + 1 < end && cmp(arr[child]!, arr[child + 1]!) < 0) {
                    child++;
                }
                if (cmp(arr[root]!, arr[child]!) < 0) {
                    [arr[root], arr[child]] = [arr[child]!, arr[root]!];
                    root = child;
                } else {
                    return;
                }
            }
        };

        for (let start = Math.floor(length(arr) / 2) - 1; start >= 0; start--) {
            heapify(start as int, length(arr));
        }

        for (let end = length(arr) - 1; end > 0; end--) {
            [arr[end], arr[0]] = [arr[0]!, arr[end]!];
            heapify(0, end as int);
        }
    };

    /**
     * Same as `Array.sort`, but the sorting algorithm is stable (i.e. elements
     * that compare equal are kept in their original order) and not guaranteed
     * to run in constant heap space.
     *
     * The current implementation uses Merge Sort. It uses a temporary array of
     * length n/2, where n is the length of the array. It is usually faster than
     * the current implementation of `Array.sort`.
     */
    export const stable_sort = <T>(cmp: (a: T, b: T) => int, a: t<T>): void => {
        const arr = a as any;
        // Merge Sort implementation
        const merge = (start: int, mid: int, end: int) => {
            let i = start;
            let j = mid;
            const temp = make_empty_array<T>() as any;
            let k = 0 as int;

            while (i < mid && j < end) {
                if (cmp(arr[i]!, arr[j]!) <= 0) {
                    temp[k++] = arr[i++]!;
                } else {
                    temp[k++] = arr[j++]!;
                }
            }

            while (i < mid) {
                temp[k++] = arr[i++]!;
            }

            while (j < end) {
                temp[k++] = arr[j++]!;
            }

            for (let p = 0 as int; p < k; p++) {
                arr[start + p] = temp[p]!;
            }
        };

        const sort = (start: int, end: int) => {
            if (end - start < 2) {
                return;
            }
            const mid = Math.floor((start + end) / 2) as int;
            sort(start, mid);
            sort(mid, end);
            merge(start, mid, end);
        };

        sort(Int.zero, length(arr));
    };

    /**
     * Same as `Array.sort` or `Array.stable_sort`, whichever is faster on typical input.
     */
    export const fast_sort = stable_sort;

    /**
     * Iterate on the array, in increasing order. Modifications of the array
     * during iteration will be reflected in the sequence.
     */
    export function* to_seq<T>(a: t<T>): Generator<T, void, void> {
        for (let i = 0 as int; i < length(a); i++) {
            yield get(a, i);
        }
    }

    /**
     * Iterate on the array, in increasing order, yielding indices along elements.
     * Modifications of the array during iteration will be reflected in the sequence.
     */
    export function* to_seqi<T>(a: t<T>): Generator<[int, T], void, void> {
        for (let i = 0 as int; i < length(a); i++) {
            yield [i, get(a, i)];
        }
    }

    /**
     * Create an array from the generator.
     */
    export const of_seq = <T>(gen: Generator<T, void, void>): t<T> => {
        const arr = make_empty_array<T>();
        let i = 0;
        for (const x of gen) {
            arr[i++ as int] = x;
        }
        return arr;
    };
}

export default Array;
