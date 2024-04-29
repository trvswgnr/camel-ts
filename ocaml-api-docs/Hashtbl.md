# Module [Hashtbl](type_Hashtbl.html)


```
module Hashtbl: sig [..](Hashtbl.html) end
```


Hash tables and hash functions.


Hash tables are hashed association tables, with in-place modification.
 Because most operations on a hash table modify their input, they're
 more commonly used in imperative code. The lookup of the value associated
 with a key (see [`Hashtbl.find`](Hashtbl.html#VALfind), [`Hashtbl.find_opt`](Hashtbl.html#VALfind_opt)) is normally very fast, often faster
 than the equivalent lookup in [`Map`](Map.html).


The functors [`Hashtbl.Make`](Hashtbl.Make.html) and [`Hashtbl.MakeSeeded`](Hashtbl.MakeSeeded.html) can be used when
 performance or flexibility are key.
 The user provides custom equality and hash functions for the key type,
 and obtains a custom hash table type for this particular type of key.


**Warning** a hash table is only as good as the hash function. A bad hash
 function will turn the table into a degenerate association list,
 with linear time lookup instead of constant time lookup.


The polymorphic [`Hashtbl.t`](Hashtbl.html#TYPEt) hash table is useful in simpler cases or
 in interactive environments. It uses the polymorphic [`Hashtbl.hash`](Hashtbl.html#VALhash) function
 defined in the OCaml runtime (at the time of writing, it's SipHash),
 as well as the polymorphic equality `(=)`.


See  [the examples section](Hashtbl.html#examples).



* **Alert unsynchronized\_access.** Unsynchronized accesses to hash tables are a programming error.




---

**Unsynchronized accesses**

Unsynchronized accesses to a hash table may lead to an invalid hash table
 state. Thus, concurrent accesses to a hash tables must be synchronized
 (for instance with a [`Mutex.t`](Mutex.html#TYPEt)).

## Generic interface


```
type `(!'a, !'b)` t 
```


The type of hash tables from type `'a` to type `'b`.




```
val create : ?random:bool -> int -> ('a, 'b) [t](Hashtbl.html#TYPEt)
```


`Hashtbl.create n` creates a new, empty hash table, with
 initial size `n`. For best results, `n` should be on the
 order of the expected number of elements that will be in
 the table. The table grows as needed, so `n` is just an
 initial guess.


The optional `~random` parameter (a boolean) controls whether
 the internal organization of the hash table is randomized at each
 execution of `Hashtbl.create` or deterministic over all executions.


A hash table that is created with `~random` set to `false` uses a
 fixed hash function ([`Hashtbl.hash`](Hashtbl.html#VALhash)) to distribute keys among
 buckets. As a consequence, collisions between keys happen
 deterministically. In Web-facing applications or other
 security-sensitive applications, the deterministic collision
 patterns can be exploited by a malicious user to create a
 denial-of-service attack: the attacker sends input crafted to
 create many collisions in the table, slowing the application down.


A hash table that is created with `~random` set to `true` uses the seeded
 hash function [`Hashtbl.seeded_hash`](Hashtbl.html#VALseeded_hash) with a seed that is randomly chosen at hash
 table creation time. In effect, the hash function used is randomly
 selected among `2^{30}` different hash functions. All these hash
 functions have different collision patterns, rendering ineffective the
 denial-of-service attack described above. However, because of
 randomization, enumerating all elements of the hash table using [`Hashtbl.fold`](Hashtbl.html#VALfold)
 or [`Hashtbl.iter`](Hashtbl.html#VALiter) is no longer deterministic: elements are enumerated in
 different orders at different runs of the program.


If no `~random` parameter is given, hash tables are created
 in non-random mode by default. This default can be changed
 either programmatically by calling [`Hashtbl.randomize`](Hashtbl.html#VALrandomize) or by
 setting the `R` flag in the `OCAMLRUNPARAM` environment variable.



* **Before 4.00**  the `~random` parameter was not present and all
 hash tables were created in non-randomized mode.



```
val clear : ('a, 'b) [t](Hashtbl.html#TYPEt) -> unit
```


Empty a hash table. Use `reset` instead of `clear` to shrink the
 size of the bucket table to its initial size.




```
val reset : ('a, 'b) [t](Hashtbl.html#TYPEt) -> unit
```


Empty a hash table and shrink the size of the bucket table
 to its initial size.



* **Since** 4.00



```
val copy : ('a, 'b) [t](Hashtbl.html#TYPEt) -> ('a, 'b) [t](Hashtbl.html#TYPEt)
```


Return a copy of the given hashtable.




```
val add : ('a, 'b) [t](Hashtbl.html#TYPEt) -> 'a -> 'b -> unit
```


`Hashtbl.add tbl key data` adds a binding of `key` to `data`
 in table `tbl`.


**Warning**: Previous bindings for `key` are not removed, but simply
 hidden. That is, after performing [`Hashtbl.remove`](Hashtbl.html#VALremove)`tbl key`,
 the previous binding for `key`, if any, is restored.
 (Same behavior as with association lists.)


If you desire the classic behavior of replacing elements,
 see [`Hashtbl.replace`](Hashtbl.html#VALreplace).




```
val find : ('a, 'b) [t](Hashtbl.html#TYPEt) -> 'a -> 'b
```


`Hashtbl.find tbl x` returns the current binding of `x` in `tbl`,
 or raises `Not_found` if no such binding exists.




```
val find_opt : ('a, 'b) [t](Hashtbl.html#TYPEt) -> 'a -> 'b option
```


`Hashtbl.find_opt tbl x` returns the current binding of `x` in `tbl`,
 or `None` if no such binding exists.



* **Since** 4.05



```
val find_all : ('a, 'b) [t](Hashtbl.html#TYPEt) -> 'a -> 'b list
```


`Hashtbl.find_all tbl x` returns the list of all data
 associated with `x` in `tbl`.
 The current binding is returned first, then the previous
 bindings, in reverse order of introduction in the table.




```
val mem : ('a, 'b) [t](Hashtbl.html#TYPEt) -> 'a -> bool
```


`Hashtbl.mem tbl x` checks if `x` is bound in `tbl`.




```
val remove : ('a, 'b) [t](Hashtbl.html#TYPEt) -> 'a -> unit
```


`Hashtbl.remove tbl x` removes the current binding of `x` in `tbl`,
 restoring the previous binding if it exists.
 It does nothing if `x` is not bound in `tbl`.




```
val replace : ('a, 'b) [t](Hashtbl.html#TYPEt) -> 'a -> 'b -> unit
```


`Hashtbl.replace tbl key data` replaces the current binding of `key`
 in `tbl` by a binding of `key` to `data`. If `key` is unbound in `tbl`,
 a binding of `key` to `data` is added to `tbl`.
 This is functionally equivalent to [`Hashtbl.remove`](Hashtbl.html#VALremove)`tbl key`
 followed by [`Hashtbl.add`](Hashtbl.html#VALadd)`tbl key data`.




```
val iter : ('a -> 'b -> unit) -> ('a, 'b) [t](Hashtbl.html#TYPEt) -> unit
```


`Hashtbl.iter f tbl` applies `f` to all bindings in table `tbl`.
 `f` receives the key as first argument, and the associated value
 as second argument. Each binding is presented exactly once to `f`.


The order in which the bindings are passed to `f` is unspecified.
 However, if the table contains several bindings for the same key,
 they are passed to `f` in reverse order of introduction, that is,
 the most recent binding is passed first.


If the hash table was created in non-randomized mode, the order
 in which the bindings are enumerated is reproducible between
 successive runs of the program, and even between minor versions
 of OCaml. For randomized hash tables, the order of enumeration
 is entirely random.


The behavior is not specified if the hash table is modified
 by `f` during the iteration.




```
val filter_map_inplace : ('a -> 'b -> 'b option) -> ('a, 'b) [t](Hashtbl.html#TYPEt) -> unit
```


`Hashtbl.filter_map_inplace f tbl` applies `f` to all bindings in
 table `tbl` and update each binding depending on the result of
 `f`. If `f` returns `None`, the binding is discarded. If it
 returns `Some new_val`, the binding is update to associate the key
 to `new_val`.


Other comments for [`Hashtbl.iter`](Hashtbl.html#VALiter) apply as well.



* **Since** 4.03



```
val fold : ('a -> 'b -> 'acc -> 'acc) -> ('a, 'b) [t](Hashtbl.html#TYPEt) -> 'acc -> 'acc
```


`Hashtbl.fold f tbl init` computes
 `(f kN dN ... (f k1 d1 init)...)`,
 where `k1 ... kN` are the keys of all bindings in `tbl`,
 and `d1 ... dN` are the associated values.
 Each binding is presented exactly once to `f`.


The order in which the bindings are passed to `f` is unspecified.
 However, if the table contains several bindings for the same key,
 they are passed to `f` in reverse order of introduction, that is,
 the most recent binding is passed first.


If the hash table was created in non-randomized mode, the order
 in which the bindings are enumerated is reproducible between
 successive runs of the program, and even between minor versions
 of OCaml. For randomized hash tables, the order of enumeration
 is entirely random.


The behavior is not specified if the hash table is modified
 by `f` during the iteration.




```
val length : ('a, 'b) [t](Hashtbl.html#TYPEt) -> int
```


`Hashtbl.length tbl` returns the number of bindings in `tbl`.
 It takes constant time. Multiple bindings are counted once each, so
 `Hashtbl.length` gives the number of times `Hashtbl.iter` calls its
 first argument.




```
val randomize : unit -> unit
```


After a call to `Hashtbl.randomize()`, hash tables are created in
 randomized mode by default: [`Hashtbl.create`](Hashtbl.html#VALcreate) returns randomized
 hash tables, unless the `~random:false` optional parameter is given.
 The same effect can be achieved by setting the `R` parameter in
 the `OCAMLRUNPARAM` environment variable.


It is recommended that applications or Web frameworks that need to
 protect themselves against the denial-of-service attack described
 in [`Hashtbl.create`](Hashtbl.html#VALcreate) call `Hashtbl.randomize()` at initialization
 time before any domains are created.


Note that once `Hashtbl.randomize()` was called, there is no way
 to revert to the non-randomized default behavior of [`Hashtbl.create`](Hashtbl.html#VALcreate).
 This is intentional. Non-randomized hash tables can still be
 created using `Hashtbl.create ~random:false`.



* **Since** 4.00



```
val is_randomized : unit -> bool
```


Return `true` if the tables are currently created in randomized mode
 by default, `false` otherwise.



* **Since** 4.03



```
val rebuild : ?random:bool -> ('a, 'b) [t](Hashtbl.html#TYPEt) -> ('a, 'b) [t](Hashtbl.html#TYPEt)
```


Return a copy of the given hashtable. Unlike [`Hashtbl.copy`](Hashtbl.html#VALcopy),
 [`Hashtbl.rebuild`](Hashtbl.html#VALrebuild)`h` re-hashes all the (key, value) entries of
 the original table `h`. The returned hash table is randomized if
 `h` was randomized, or the optional `random` parameter is true, or
 if the default is to create randomized hash tables; see
 [`Hashtbl.create`](Hashtbl.html#VALcreate) for more information.


[`Hashtbl.rebuild`](Hashtbl.html#VALrebuild) can safely be used to import a hash table built
 by an old version of the [`Hashtbl`](Hashtbl.html) module, then marshaled to
 persistent storage. After unmarshaling, apply [`Hashtbl.rebuild`](Hashtbl.html#VALrebuild)
 to produce a hash table for the current version of the [`Hashtbl`](Hashtbl.html)
 module.



* **Since** 4.12



```
type statistics = {
```


|  | `num_bindings : `int`;` | `(*` | Number of bindings present in the table.  Same value as returned by [`Hashtbl.length`](Hashtbl.html#VALlength). | `*)` |
| --- | --- | --- | --- | --- |
|  | `num_buckets : `int`;` | `(*` | Number of buckets in the table. | `*)` |
|  | `max_bucket_length : `int`;` | `(*` | Maximal number of bindings per bucket. | `*)` |
|  | `bucket_histogram : `int array`;` | `(*` | Histogram of bucket sizes. This array `histo` has  length `max_bucket_length + 1`. The value of  `histo.(i)` is the number of buckets whose size is `i`. | `*)` |

`}`
* **Since** 4.00



```
val stats : ('a, 'b) [t](Hashtbl.html#TYPEt) -> [statistics](Hashtbl.html#TYPEstatistics)
```


`Hashtbl.stats tbl` returns statistics about the table `tbl`:
 number of buckets, size of the biggest bucket, distribution of
 buckets by size.



* **Since** 4.00


## Hash tables and Sequences


```
val to_seq : ('a, 'b) [t](Hashtbl.html#TYPEt) -> ('a * 'b) [Seq.t](Seq.html#TYPEt)
```


Iterate on the whole table. The order in which the bindings
 appear in the sequence is unspecified. However, if the table contains
 several bindings for the same key, they appear in reversed order of
 introduction, that is, the most recent binding appears first.


The behavior is not specified if the hash table is modified
 during the iteration.



* **Since** 4.07



```
val to_seq_keys : ('a, 'b) [t](Hashtbl.html#TYPEt) -> 'a [Seq.t](Seq.html#TYPEt)
```


Same as `Seq.map fst (to_seq m)`



* **Since** 4.07



```
val to_seq_values : ('a, 'b) [t](Hashtbl.html#TYPEt) -> 'b [Seq.t](Seq.html#TYPEt)
```


Same as `Seq.map snd (to_seq m)`



* **Since** 4.07



```
val add_seq : ('a, 'b) [t](Hashtbl.html#TYPEt) -> ('a * 'b) [Seq.t](Seq.html#TYPEt) -> unit
```


Add the given bindings to the table, using [`Hashtbl.add`](Hashtbl.html#VALadd)



* **Since** 4.07



```
val replace_seq : ('a, 'b) [t](Hashtbl.html#TYPEt) -> ('a * 'b) [Seq.t](Seq.html#TYPEt) -> unit
```


Add the given bindings to the table, using [`Hashtbl.replace`](Hashtbl.html#VALreplace)



* **Since** 4.07



```
val of_seq : ('a * 'b) [Seq.t](Seq.html#TYPEt) -> ('a, 'b) [t](Hashtbl.html#TYPEt)
```


Build a table from the given bindings. The bindings are added
 in the same order they appear in the sequence, using [`Hashtbl.replace_seq`](Hashtbl.html#VALreplace_seq),
 which means that if two pairs have the same key, only the latest one
 will appear in the table.



* **Since** 4.07


## Functorial interface

The functorial interface allows the use of specific comparison
 and hash functions, either for performance/security concerns,
 or because keys are not hashable/comparable with the polymorphic builtins.

For instance, one might want to specialize a table for integer keys:


```
      module IntHash =
        struct
          type t = int
          let equal i j = i=j
          let hash i = i land max_int
        end

      module IntHashtbl = Hashtbl.Make(IntHash)

      let h = IntHashtbl.create 17 in
      IntHashtbl.add h 12 "hello"
    
```
This creates a new module `IntHashtbl`, with a new type `'a  

    IntHashtbl.t` of tables from `int` to `'a`. In this example, `h`
 contains `string` values so its type is `string IntHashtbl.t`.

Note that the new type `'a IntHashtbl.t` is not compatible with
 the type `('a,'b) Hashtbl.t` of the generic interface. For
 example, `Hashtbl.length h` would not type-check, you must use
 `IntHashtbl.length`.


```
module type [HashedType](Hashtbl.HashedType.html) = sig [..](Hashtbl.HashedType.html) end
```

The input signature of the functor [`Hashtbl.Make`](Hashtbl.Make.html).



```
module type [S](Hashtbl.S.html) = sig [..](Hashtbl.S.html) end
```

The output signature of the functor [`Hashtbl.Make`](Hashtbl.Make.html).



```
module [Make](Hashtbl.Make.html): `functor (``H``:``[HashedType](Hashtbl.HashedType.html)``) ->``[S](Hashtbl.S.html)` `with type key = H.t`
```

Functor building an implementation of the hashtable structure.



```
module type [SeededHashedType](Hashtbl.SeededHashedType.html) = sig [..](Hashtbl.SeededHashedType.html) end
```

The input signature of the functor [`Hashtbl.MakeSeeded`](Hashtbl.MakeSeeded.html).



```
module type [SeededS](Hashtbl.SeededS.html) = sig [..](Hashtbl.SeededS.html) end
```

The output signature of the functor [`Hashtbl.MakeSeeded`](Hashtbl.MakeSeeded.html).



```
module [MakeSeeded](Hashtbl.MakeSeeded.html): `functor (``H``:``[SeededHashedType](Hashtbl.SeededHashedType.html)``) ->``[SeededS](Hashtbl.SeededS.html)` `with type key = H.t`
```

Functor building an implementation of the hashtable structure.


## The polymorphic hash functions


```
val hash : 'a -> int
```


`Hashtbl.hash x` associates a nonnegative integer to any value of
 any type. It is guaranteed that
 if `x = y` or `Stdlib.compare x y = 0`, then `hash x = hash y`.
 Moreover, `hash` always terminates, even on cyclic structures.




```
val seeded_hash : int -> 'a -> int
```


A variant of [`Hashtbl.hash`](Hashtbl.html#VALhash) that is further parameterized by
 an integer seed.



* **Since** 4.00



```
val hash_param : int -> int -> 'a -> int
```


`Hashtbl.hash_param meaningful total x` computes a hash value for `x`,
 with the same properties as for `hash`. The two extra integer
 parameters `meaningful` and `total` give more precise control over
 hashing. Hashing performs a breadth-first, left-to-right traversal
 of the structure `x`, stopping after `meaningful` meaningful nodes
 were encountered, or `total` nodes (meaningful or not) were
 encountered. If `total` as specified by the user exceeds a certain
 value, currently 256, then it is capped to that value.
 Meaningful nodes are: integers; floating-point
 numbers; strings; characters; booleans; and constant
 constructors. Larger values of `meaningful` and `total` means that
 more nodes are taken into account to compute the final hash value,
 and therefore collisions are less likely to happen. However,
 hashing takes longer. The parameters `meaningful` and `total`
 govern the tradeoff between accuracy and speed. As default
 choices, [`Hashtbl.hash`](Hashtbl.html#VALhash) and [`Hashtbl.seeded_hash`](Hashtbl.html#VALseeded_hash) take
 `meaningful = 10` and `total = 100`.




```
val seeded_hash_param : int -> int -> int -> 'a -> int
```


A variant of [`Hashtbl.hash_param`](Hashtbl.html#VALhash_param) that is further parameterized by
 an integer seed. Usage:
 `Hashtbl.seeded_hash_param meaningful total seed x`.



* **Since** 4.00


## Examples

### Basic Example


```
    (* 0...99 *)
    let seq = Seq.ints 0 |> Seq.take 100

    (* build from Seq.t *)
    # let tbl =
        seq
        |> Seq.map (fun x -> x, string_of_int x)
        |> Hashtbl.of_seq
    val tbl : (int, string) Hashtbl.t = <abstr>

    # Hashtbl.length tbl
    - : int = 100

    # Hashtbl.find_opt tbl 32
    - : string option = Some "32"

    # Hashtbl.find_opt tbl 166
    - : string option = None

    # Hashtbl.replace tbl 166 "one six six"
    - : unit = ()

    # Hashtbl.find_opt tbl 166
    - : string option = Some "one six six"

    # Hashtbl.length tbl
    - : int = 101
    
```
### Counting Elements

Given a sequence of elements (here, a [`Seq.t`](Seq.html#TYPEt)), we want to count how many
 times each distinct element occurs in the sequence. A simple way to do this,
 assuming the elements are comparable and hashable, is to use a hash table
 that maps elements to their number of occurrences.

Here we illustrate that principle using a sequence of (ascii) characters
 (type `char`).
 We use a custom `Char_tbl` specialized for `char`.


```
    # module Char_tbl = Hashtbl.Make(struct
        type t = char
        let equal = Char.equal
        let hash = Hashtbl.hash
      end)

    (*  count distinct occurrences of chars in [seq] *)
    # let count_chars (seq : char Seq.t) : _ list =
        let counts = Char_tbl.create 16 in
        Seq.iter
          (fun c ->
            let count_c =
              Char_tbl.find_opt counts c
              |> Option.value ~default:0
            in
            Char_tbl.replace counts c (count_c + 1))
          seq;
        (* turn into a list *)
        Char_tbl.fold (fun c n l -> (c,n) :: l) counts []
          |> List.sort (fun (c1,_)(c2,_) -> Char.compare c1 c2)
    val count_chars : Char_tbl.key Seq.t -> (Char.t * int) list = <fun>

    (* basic seq from a string *)
    # let seq = String.to_seq "hello world, and all the camels in it!"
    val seq : char Seq.t = <fun>

    # count_chars seq
    - : (Char.t * int) list =
    [(' ', 7); ('!', 1); (',', 1); ('a', 3); ('c', 1); ('d', 2); ('e', 3);
     ('h', 2); ('i', 2); ('l', 6); ('m', 1); ('n', 2); ('o', 2); ('r', 1);
     ('s', 1); ('t', 2); ('w', 1)]

    (* "abcabcabc..." *)
    # let seq2 =
        Seq.cycle (String.to_seq "abc") |> Seq.take 31
    val seq2 : char Seq.t = <fun>

    # String.of_seq seq2
    - : String.t = "abcabcabcabcabcabcabcabcabcabca"

    # count_chars seq2
    - : (Char.t * int) list = [('a', 11); ('b', 10); ('c', 10)]

  
```
