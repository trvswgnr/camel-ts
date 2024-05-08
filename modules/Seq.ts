import type { Fn, Nominal } from "../utils";
import { tuple } from "./Tuple";
import { fn_void_to_unit, type unit } from "./Unit";
import Option, { fn_nullable_to_option, type option } from "./Option";
import type { bool } from "./Bool";
import { fn_number_to_int, type int } from "./Int";
import { Exception } from "./Exceptions";
import type { either } from "./Either";
import * as CamlSeq from "../melange/seq.mjs";

class Forced_twice extends Exception<string> {
    constructor(message: string) {
        super(message);
        this.name = "Forced_twice";
    }
}

const Nil = Symbol("Nil");
type Nil = Nominal<0, typeof Nil>;

const Cons = Symbol("Cons");
type _Cons<a> = {
    _0: a;
    _1: seq<a>;
};
type Cons<a> = Nominal<_Cons<a>, typeof Cons>;

/**
 * A node is either `Nil`, which means that the sequence is empty, or `Cons (x,
 * xs)`, which means that `x` is the first element of the sequence and that `xs`
 * is the remainder of the sequence.
 */
type node<a> = Nil | Cons<a>;

/**
 * A sequence `xs` of type `seq<a>` is a delayed list of elements of type `a`.
 * Such a sequence is queried by performing a function application `xs()`. This
 * function application returns a node, allowing the caller to determine whether
 * the sequence is empty or nonempty, and in the latter case, to obtain its head
 * and tail.
 */
export type seq<a> = () => node<a>;
export function seq<a, F extends Fn>(xs: F): seq<a> {
    return xs;
}

/**
## Consuming sequences

The functions in this section consume their argument, a sequence, either
partially or completely:

-   `is_empty` and `uncons` consume the sequence down to depth 1. That is, they
    demand the first argument of the sequence, if there is one.
-   `iter`, `fold_left`, `length`, etc., consume the sequence all the way to its
    end. They terminate only if the sequence is finite.
-   `for_all`, `exists`, `find`, etc. consume the sequence down to a certain
    depth, which is a priori unpredictable.

Similarly, among the functions that consume two sequences, one can distinguish
two groups:

-   `iter2` and `fold_left2` consume both sequences all the way to the end,
    provided the sequences have the same length.
-   `for_all2`, `exists2`, `equal`, `compare` consume the sequences down to a
    certain depth, which is a priori unpredictable.

The functions that consume two sequences can be applied to two sequences of
distinct lengths: in that case, the excess elements in the longer sequence are
ignored. (It may be the case that one excess element is demanded, even though
this element is not used.)

None of the functions in this section is lazy. These functions are consumers:
they force some computation to take place.
*/
interface Consuming {
    is_empty<a>(xs: seq<a>): bool;
    uncons<a>(xs: seq<a>): option<tuple<[a, seq<a>]>>;
    length<a>(xs: seq<a>): int;
    iter<a>(f: (x: a) => unit, seq: seq<a>): unit;
    fold_left<a, acc>(f: (accu: acc, x: a) => acc, accu: acc, seq: seq<a>): acc;
    iteri<a>(f: (i: int, x: a) => unit, seq: seq<a>): unit;
    fold_lefti<a, acc>(
        f: (accu: acc, i: int, x: a) => acc,
        accu: acc,
        seq: seq<a>,
    ): acc;
    for_all<a>(f: (x: a) => bool, seq: seq<a>): bool;
    exists<a>(f: (x: a) => bool, seq: seq<a>): bool;
    find<a>(f: (x: a) => bool, seq: seq<a>): option<a>;
    find_index<a>(f: (x: a) => bool, seq: seq<a>): option<int>;
    find_map<a, b>(f: (x: a) => option<b>, seq: seq<a>): option<b>;
    find_mapi<a, b>(f: (i: int, x: a) => option<b>, seq: seq<a>): option<b>;
    iter2<a, b>(f: (x: a, y: b) => unit, seq1: seq<a>, seq2: seq<b>): unit;
    fold_left2<a, b, acc>(
        f: (accu: acc, x: a, y: b) => acc,
        accu: acc,
        seq1: seq<a>,
        seq2: seq<b>,
    ): acc;
    for_all2<a, b>(f: (x: a, y: b) => bool, seq1: seq<a>, seq2: seq<b>): bool;
    exists2<a, b>(f: (x: a, y: b) => bool, seq1: seq<a>, seq2: seq<b>): bool;
    equal<a, b>(f: (x: a, y: b) => bool, seq1: seq<a>, seq2: seq<b>): bool;
    compare<a, b>(f: (x: a, y: b) => int, seq1: seq<a>, seq2: seq<b>): int;
}

const ConsumingImpl: Consuming = {
    is_empty: CamlSeq.is_empty,
    uncons: <a>(...args: any[]): option<tuple<[a, seq<a>]>> => {
        const result = CamlSeq.uncons(...args);
        return result === null || result === undefined
            ? Option.none()
            : Option.some(result as any);
    },
    length: fn_number_to_int(CamlSeq.length),
    iter: fn_void_to_unit(CamlSeq.iter),
    iteri: fn_void_to_unit(CamlSeq.iteri),
    fold_left: CamlSeq.fold_left,
    fold_lefti: CamlSeq.fold_lefti,
    for_all: CamlSeq.for_all,
    exists: CamlSeq.exists,
    find: fn_nullable_to_option(CamlSeq.find),
    find_index: (...args: any[]): option<int> => {
        const result = CamlSeq.find_index(...args);
        return result === null || result === undefined
            ? Option.none()
            : Option.some(result as int);
    },
    find_map: fn_nullable_to_option(CamlSeq.find_map),
    find_mapi: fn_nullable_to_option(CamlSeq.find_mapi),
    iter2: fn_void_to_unit(CamlSeq.iter2),
    fold_left2: CamlSeq.fold_left2,
    for_all2: CamlSeq.for_all2,
    exists2: CamlSeq.exists2,
    equal: CamlSeq.equal,
    compare: CamlSeq.compare,
};

/**
## Constructing sequences

The functions in this section are lazy: that is, they return sequences whose
elements are computed only when demanded.
*/
interface Constructing {
    /**
     * `empty()` is the empty sequence. It has no elements. Its length is 0.
     */
    empty<a>(): seq<a>;
    /**
     * `return(x)` is the sequence whose sole element is `x`. Its length is 1.
     */
    return<a>(x: a): seq<a>;
    /**
     * `cons(x, xs)` is the sequence that begins with the element `x`, followed
     * with the sequence `xs`.
     *
     * Writing `cons(f(), xs)` causes the function call `f()` to take place
     * immediately. For this call to be delayed until the sequence is queried,
     * one must instead write `(() => Cons(f(), xs))`.
     */
    cons<a>(x: a, next: seq<a>): seq<a>;
    /**
     * `init(n, f)` is the sequence `f(0), f(1), ..., f(n-1)`.
     *
     * `n` must be nonnegative.
     *
     * If desired, the infinite sequence `f(0), f(1), ...` can be defined as
     * `map(f, ints(0))`.
     *
     * @throws {Invalid_argument} if `n` is negative.
     */
    init<a>(n: int, f: (i: int) => a): seq<a>;
    /**
     * `unfold` constructs a sequence out of a step function and an initial
     * state.
     *
     * If `f(u)` is `None` then `unfold(f, u)` is the empty sequence. If `f(u)`
     * is `Some (x, u')` then `unfold(f, u)` is the nonempty sequence `cons(x,
     * unfold(f, u'))`.
     *
     * For example, `unfold((x) => is_empty(x) ? Nil : Cons(x[0], x.slice(1)),
     * l)` is equivalent to `List.to_seq(l)`.
     */
    unfold<a, b>(f: (b: b) => option<tuple<[a, b]>>, u: b): seq<a>;
    /**
     * `repeat(x)` is the infinite sequence where the element `x` is repeated
     * indefinitely.
     *
     * `repeat(x)` is equivalent to `cycle(return(x))`.
     */
    repeat<a>(x: a): seq<a>;
    /**
     * `forever(f)` is an infinite sequence where every element is produced (on
     * demand) by the function call `f()`.
     *
     * For instance, `forever(Random.bool)` is an infinite sequence of random
     * bits.
     *
     * `forever(f)` is equivalent to `map(f, repeat())`.
     */
    forever<a>(f: () => a): seq<a>;
    /**
     * `cycle(xs)` is the infinite sequence that consists of an infinite number
     * of repetitions of the sequence `xs`.
     *
     * If `xs` is an empty sequence, then `cycle(xs)` is empty as well.
     *
     * Consuming (a prefix of) the sequence `cycle(xs)` once can cause the
     * sequence `xs` to be consumed more than once. Therefore, `xs` must be
     * persistent.
     */
    cycle<a>(xs: seq<a>): seq<a>;
    /**
     * `iterate(f, x)` is the infinite sequence whose elements are `x`, `f(x)`,
     * `f(f(x))`, and so on.
     *
     * In other words, it is the orbit of the function `f`, starting at `x`.
     */
    iterate<a>(f: (x: a) => a, x: a): seq<a>;
}

/**
## Transforming sequences

The functions in this section are lazy: that is, they return sequences whose
elements are computed only when demanded.
*/
interface Transforming {
    /**
     * `map(f, xs)` is the image of the sequence `xs` through the transformation
     * `f`.
     *
     * If `xs` is the sequence `x0; x1; ...` then `map(f, xs)` is the sequence
     * `f(x0); f(x1); ...`.
     */
    map<a, b>(f: (x: a) => b, seq: seq<a>): seq<b>;
    /**
     * `mapi(f, xs)` is analogous to `map`, but applies the function `f` to an
     * index and an element.
     *
     * `mapi(f, xs)` is equivalent to `map2(f, ints(0), xs)`.
     */
    mapi<a, b>(f: (i: int, x: a) => b, seq: seq<a>): seq<b>;
    /**
     * `filter(p, xs)` is the sequence of the elements `x` of `xs` that satisfy
     * `p(x)`.
     *
     * In other words, `filter(p, xs)` is the sequence `xs` deprived of the
     * elements `x` such that `p(x)` is false.
     */
    filter<a>(p: (x: a) => bool, seq: seq<a>): seq<a>;
    /**
     * `filter_map(f, xs)` is the sequence of the elements `y` such that `f(x) =
     * Some y`, where `x` ranges over `xs`.
     *
     * `filter_map(f, xs)` is equivalent to `map(Option.get,
     * filter(Option.is_some, map(f, xs)))`.
     */
    filter_map<a, b>(f: (x: a) => option<b>, seq: seq<a>): seq<b>;
    /**
     * If `xs` is a sequence `[x0; x1; x2; ...]` then `scan(f, a0, xs)` is a
     * sequence of accumulators `[a0; a1; a2; ...]` where `a1` is `f(a0, x0)`,
     * `a2` is `f(a1, x1)`, and so on.
     *
     * Thus, `scan(f, a0, xs)` is conceptually related to `fold_left(f, a0,
     * xs)`. However, instead of performing an eager iteration and immediately
     * returning the final accumulator, it returns a sequence of accumulators.
     *
     * For instance, `scan(Int.add, 0)` transforms a sequence of integers into
     * the sequence of its partial sums.
     *
     * If `xs` has length `n` then `scan(f, a0, xs)` has length `n+1`.
     */
    scan<a, b>(f: (b: b, x: a) => b, a0: b, seq: seq<a>): seq<b>;
    /**
     * `take(n, xs)` is the sequence of the first `n` elements of `xs`.
     *
     * If `xs` has fewer than `n` elements, then `take(n, xs)` is equivalent to
     * `xs`.
     *
     * `n` must be nonnegative.
     *
     * @throws {Invalid_argument} if `n` is negative.
     */
    take<a>(n: int, seq: seq<a>): seq<a>;
    /**
     * `drop(n, xs)` is the sequence `xs`, deprived of its first `n` elements.
     *
     * If `xs` has fewer than `n` elements, then `drop(n, xs)` is empty.
     *
     * `n` must be nonnegative.
     *
     * `drop` is lazy: the first `n+1` elements of the sequence `xs` are
     * demanded only when the first element of `drop(n, xs)` is demanded. For
     * this reason, `drop(1, xs)` is *not* equivalent to `tail(xs)`, which
     * queries `xs` immediately.
     *
     * @throws {Invalid_argument} if `n` is negative.
     */
    drop<a>(n: int, seq: seq<a>): seq<a>;
    /**
     * `take_while(p, xs)` is the longest prefix of the sequence `xs` where
     * every element `x` satisfies `p(x)`.
     */
    take_while<a>(p: (x: a) => bool, seq: seq<a>): seq<a>;
    /**
     * `drop_while(p, xs)` is the sequence `xs`, deprived of the prefix
     * `take_while(p, xs)`.
     */
    drop_while<a>(p: (x: a) => bool, seq: seq<a>): seq<a>;
    /**
     * Provided the function `eq` defines an equality on elements, `group(eq,
     * xs)` is the sequence of the maximal runs of adjacent duplicate elements
     * of the sequence `xs`.
     *
     * Every element of `group(eq, xs)` is a nonempty sequence of equal
     * elements.
     *
     * The concatenation `concat(group(eq, xs))` is equal to `xs`.
     *
     * Consuming `group(eq, xs)`, and consuming the sequences that it contains,
     * can cause `xs` to be consumed more than once. Therefore, `xs` must be
     * persistent.
     */
    group<a>(eq: (x: a, y: a) => bool, seq: seq<a>): seq<seq<a>>;
    /**
     * The sequence `memoize(xs)` has the same elements as the sequence `xs`.
     *
     * Regardless of whether `xs` is ephemeral or persistent, `memoize(xs)` is
     * persistent: even if it is queried several times, `xs` is queried at most
     * once.
     *
     * The construction of the sequence `memoize(xs)` internally relies on
     * suspensions provided by the module `Lazy`. These suspensions are *not*
     * thread-safe. Therefore, the sequence `memoize(xs)` must *not* be queried
     * by multiple threads concurrently.
     */
    memoize<a>(seq: seq<a>): seq<a>;
    /**
     * This exception is raised when a sequence returned by `once(xs)` or a
     * suffix of it is queried more than once.
     */
    Forced_twice: Forced_twice;
    /**
     * The sequence `once(xs)` has the same elements as the sequence `xs`.
     *
     * Regardless of whether `xs` is ephemeral or persistent, `once(xs)` is an
     * ephemeral sequence: it can be queried at most once. If it (or a suffix of
     * it) is queried more than once, then the exception `Forced_twice` is
     * raised. This can be useful, while debugging or testing, to ensure that a
     * sequence is consumed at most once.
     *
     * @throws {Forced_twice} if `once(xs)` or a suffix of it is queried more
     * than once.
     */
    once<a>(seq: seq<a>): seq<a>;
    /**
     * If `xss` is a matrix (a sequence of rows), then `transpose(xss)` is the
     * sequence of the columns of the matrix `xss`.
     *
     * The rows of the matrix `xss` are not required to have the same length.
     *
     * The matrix `xss` is not required to be finite (in either direction).
     *
     * The matrix `xss` must be persistent.
     */
    transpose<a>(xss: seq<seq<a>>): seq<seq<a>>;
}

/**
 * Combining Sequences
 */
interface Combining {
    /**
     * `append(xs, ys)` is the concatenation of the sequences `xs` and `ys`.
     *
     * Its elements are the elements of `xs`, followed by the elements of `ys`.
     */
    append<a>(xs: seq<a>, ys: seq<a>): seq<a>;
    /**
     * If `xss` is a sequence of sequences, then `concat xss` is its
     * concatenation.
     *
     * If `xss` is the sequence `xs0; xs1; ...` then `concat(xss)` is the
     * sequence `xs0 @ xs1 @ ...`.
     */
    concat<a>(xss: seq<seq<a>>): seq<a>;
    /**
     * `flat_map(f, xs)` is equivalent to `concat(map(f, xs))`.
     */
    flat_map<a, b>(f: (x: a) => seq<b>, xs: seq<a>): seq<b>;
    /**
     * `concat_map(f, xs)` is equivalent to `concat(map(f, xs))`.
     *
     * `concat_map` is an alias for `flat_map`.
     */
    concat_map<a, b>(f: (x: a) => seq<b>, xs: seq<a>): seq<b>;
    /**
     * `zip(xs, ys)` is the sequence of pairs `tuple<[x, y]>` drawn
     * synchronously from the sequences `xs` and `ys`.
     *
     * If the sequences `xs` and `ys` have different lengths, then the sequence
     * ends as soon as one sequence is exhausted; the excess elements in the
     * other sequence are ignored.
     *
     * `zip(xs, ys)` is equivalent to `map2(fun x y -> (x, y), xs, ys)`.
     */
    zip<a, b>(xs: seq<a>, ys: seq<b>): seq<[a, b]>;
    /**
     * `map2(f, xs, ys)` is the sequence of the elements `f(x, y)`, where the
     * pairs `(x, y)` are drawn synchronously from the sequences `xs` and `ys`.
     *
     * If the sequences `xs` and `ys` have different lengths, then the sequence
     * ends as soon as one sequence is exhausted; the excess elements in the
     * other sequence are ignored.
     *
     * `map2(f, xs, ys)` is equivalent to `map(([x, y]: tuple<[a, b]>) => f(x,
     * y), zip(xs, ys))`.
     */
    map2<a, b, c>(f: (x: a, y: b) => c, xs: seq<a>, ys: seq<b>): seq<c>;
    /**
     * `interleave(xs, ys)` is the sequence that begins with the first element
     * of `xs`, continues with the first element of `ys`, and so on.
     *
     * When one of the sequences `xs` and `ys` is exhausted, `interleave(xs,
     * ys)` continues with the rest of the other sequence.
     */
    interleave<a>(xs: seq<a>, ys: seq<a>): seq<a>;
    /**
     * If the sequences `xs` and `ys` are sorted according to the total preorder
     * `cmp`, then `sorted_merge(cmp, xs, ys)` is the sorted sequence obtained
     * by merging the sequences `xs` and `ys`.
     */
    sorted_merge<a>(cmp: (x: a, y: a) => int, xs: seq<a>, ys: seq<a>): seq<a>;
    /**
     * `product(xs, ys)` is the Cartesian product of the sequences `xs` and
     * `ys`.
     *
     * For every element `x` of `xs` and for every element `y` of `ys`, the pair
     * `(x, y)` appears once as an element of `product(xs, ys)`.
     *
     * The order in which the pairs appear is unspecified.
     *
     * The sequences `xs` and `ys` are not required to be finite.
     *
     * The sequences `xs` and `ys` must be persistent.
     */
    product<a, b>(xs: seq<a>, ys: seq<b>): seq<[a, b]>;
    /**
     * `map_product(f, xs, ys)` is the image through `f` of the Cartesian
     * product of the sequences `xs` and `ys`.
     *
     * For every element `x` of `xs` and for every element `y` of `ys`, the
     * element `f(x, y)` appears once as an element of `map_product(f, xs, ys)`.
     *
     * The order in which these elements appear is unspecified.
     *
     * The sequences `xs` and `ys` are not required to be finite.
     *
     * The sequences `xs` and `ys` must be persistent.
     *
     * `map_product(f, xs, ys)` is equivalent to `map(([x, y]: tuple<[a, b]>) =>
     * f(x, y), product(xs, ys))`.
     */
    map_product<a, b, c>(f: (x: a, y: b) => c, xs: seq<a>, ys: seq<b>): seq<c>;
}

/**
 * Splitting a sequence into two sequences
 */
interface Splitting {
    /**
     * `unzip(xs)` transforms a sequence of pairs into a pair of sequences.
     *
     * `unzip(xs)` is equivalent to `tuple<[map(first, xs), map(second, xs)]>`.
     */
    unzip<a, b>(xs: seq<tuple<[a, b]>>): tuple<[seq<a>, seq<b>]>;
    /**
     * `split` is an alias for `unzip`.
     */
    split<a, b>(xs: seq<tuple<[a, b]>>): tuple<[seq<a>, seq<b>]>;
    /**
     * `partition_map(f, xs)` returns a pair of sequences `(ys, zs)`, where:
     *
     * - `ys` is the sequence of the elements `y` such that `f x = Left y`,
     *   where `x` ranges over `xs`.
     * - `zs` is the sequence of the elements `z` such that `f x = Right z`,
     *   where `x` ranges over `xs`.
     *
     * `partition_map(f, xs)` is equivalent to
     * `filter_map(Either.find_left(map(f, xs)), xs)`.
     *
     * Querying either of the sequences returned by `partition_map(f, xs)`
     * causes `xs` to be queried twice. Thus, `xs` must be persistent and cheap.
     * If that is not the case, use `partition_map(f, memoize(xs))`.
     */
    partition_map<a, b, c>(
        f: (x: a) => either<b, c>,
        xs: seq<a>,
    ): tuple<[seq<b>, seq<c>]>;
    /**
     * `partition(p, xs)` returns a pair of the subsequence of the elements of
     * `xs` that satisfy `p` and the subsequence of the elements of `xs` that do
     * not satisfy `p`.
     *
     * `partition(p, xs)` is equivalent to `filter(p, xs), filter(fun x -> not
     * (p x), xs)`.
     *
     * Consuming both of the sequences returned by `partition(p, xs)` causes
     * `xs` to be consumed twice and causes the function `p` to be applied twice
     * to each element of the list. Therefore, `p` should be pure and cheap.
     * Furthermore, `xs` should be persistent and cheap. If that is not the
     * case, use `partition(p, memoize(xs))`.
     */
    partition<a>(p: (x: a) => bool, xs: seq<a>): tuple<[seq<a>, seq<a>]>;
}

/**
 * A dispenser is a representation of a sequence as a function of type `() =>
 * option<a>`. Every time this function is invoked, it returns the next element
 * of the sequence. When there are no more elements, it returns `None`. A
 * dispenser has mutable internal state, therefore is ephemeral: the sequence
 * that it represents can be consumed at most once.
 */
interface Converting {
    /**
     * `of_dispenser(it)` is the sequence of the elements produced by the
     * dispenser `it`. It is an ephemeral sequence: it can be consumed at most
     * once. If a persistent sequence is needed, use
     * `memoize(of_dispenser(it))`.
     */
    of_dispenser<a>(it: () => option<a>): seq<a>;
    /**
     * `to_dispenser(xs)` is a fresh dispenser on the sequence `xs`.
     *
     * This dispenser has mutable internal state, which is not protected by a
     * lock; so, it must not be used by several threads concurrently.
     */
    to_dispenser<a>(xs: seq<a>): () => option<a>;
}

/**
 * Sequences of integers
 */
interface Integers {
    /**
     * `ints(i)` is the infinite sequence of the integers beginning at `i` and
     * counting up.
     */
    ints(i: int): seq<int>;
}
