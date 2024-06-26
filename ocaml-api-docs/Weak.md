# Module [Weak](type_Weak.html)


```
module Weak: sig [..](Weak.html) end
```


Arrays of weak pointers and hash sets of weak pointers.





---

## Low-level functions


```
type `!'a` t 
```


The type of arrays of weak pointers (weak arrays). A weak
 pointer is a value that the garbage collector may erase whenever
 the value is not used any more (through normal pointers) by the
 program. Note that finalisation functions are run before the
 weak pointers are erased, because the finalisation functions
 can make values alive again (before 4.03 the finalisation
 functions were run after).


A weak pointer is said to be full if it points to a value,
 empty if the value was erased by the GC.


Notes:


* Integers are not allocated and cannot be stored in weak arrays.
* Weak arrays cannot be marshaled using [`output_value`](Stdlib.html#VALoutput_value)
 nor the functions of the [`Marshal`](Marshal.html) module.




```
val create : int -> 'a [t](Weak.html#TYPEt)
```


`Weak.create n` returns a new weak array of length `n`.
 All the pointers are initially empty.



* **Raises** `Invalid_argument` if `n` is not comprised between zero and
 [`Obj.Ephemeron.max_ephe_length`](Obj.Ephemeron.html#VALmax_ephe_length) (limits included).



```
val length : 'a [t](Weak.html#TYPEt) -> int
```


`Weak.length ar` returns the length (number of elements) of
 `ar`.




```
val set : 'a [t](Weak.html#TYPEt) -> int -> 'a option -> unit
```


`Weak.set ar n (Some el)` sets the `n`th cell of `ar` to be a
 (full) pointer to `el`; `Weak.set ar n None` sets the `n`th
 cell of `ar` to empty.



* **Raises** `Invalid_argument` if `n` is not in the range
 0 to [`Weak.length`](Weak.html#VALlength)`ar - 1`.



```
val get : 'a [t](Weak.html#TYPEt) -> int -> 'a option
```


`Weak.get ar n` returns None if the `n`th cell of `ar` is
 empty, `Some x` (where `x` is the value) if it is full.



* **Raises** `Invalid_argument` if `n` is not in the range
 0 to [`Weak.length`](Weak.html#VALlength)`ar - 1`.



```
val get_copy : 'a [t](Weak.html#TYPEt) -> int -> 'a option
```


`Weak.get_copy ar n` returns None if the `n`th cell of `ar` is
 empty, `Some x` (where `x` is a (shallow) copy of the value) if
 it is full.
 In addition to pitfalls with mutable values, the interesting
 difference with `get` is that `get_copy` does not prevent
 the incremental GC from erasing the value in its current cycle
 (`get` may delay the erasure to the next GC cycle).



* **Raises** `Invalid_argument` if `n` is not in the range
 0 to [`Weak.length`](Weak.html#VALlength)`ar - 1`.

 If the element is a custom block it is not copied.



```
val check : 'a [t](Weak.html#TYPEt) -> int -> bool
```


`Weak.check ar n` returns `true` if the `n`th cell of `ar` is
 full, `false` if it is empty. Note that even if `Weak.check ar n`
 returns `true`, a subsequent [`Weak.get`](Weak.html#VALget)`ar n` can return `None`.



* **Raises** `Invalid_argument` if `n` is not in the range
 0 to [`Weak.length`](Weak.html#VALlength)`ar - 1`.



```
val fill : 'a [t](Weak.html#TYPEt) -> int -> int -> 'a option -> unit
```


`Weak.fill ar ofs len el` sets to `el` all pointers of `ar` from
 `ofs` to `ofs + len - 1`.



* **Raises** `Invalid_argument` if `ofs` and `len` do not designate a valid subarray of `ar`.



```
val blit : 'a [t](Weak.html#TYPEt) -> int -> 'a [t](Weak.html#TYPEt) -> int -> int -> unit
```


`Weak.blit ar1 off1 ar2 off2 len` copies `len` weak pointers
 from `ar1` (starting at `off1`) to `ar2` (starting at `off2`).
 It works correctly even if `ar1` and `ar2` are the same.



* **Raises** `Invalid_argument` if `off1` and `len` do
 not designate a valid subarray of `ar1`, or if `off2` and `len`
 do not designate a valid subarray of `ar2`.


## Weak hash sets

A weak hash set is a hashed set of values. Each value may
 magically disappear from the set when it is not used by the
 rest of the program any more. This is normally used to share
 data structures without inducing memory leaks.
 Weak hash sets are defined on values from a [`Hashtbl.HashedType`](Hashtbl.HashedType.html)
 module; the `equal` relation and `hash` function are taken from that
 module. We will say that `v` is an instance of `x` if `equal x v`
 is `true`.

The `equal` relation must be able to work on a shallow copy of
 the values and give the same result as with the values themselves.

**Unsynchronized accesses**

Unsynchronized accesses to weak hash sets are a programming error.
 Unsynchronized accesses to a weak hash set may lead to an invalid weak hash
 set state. Thus, concurrent accesses to weak hash sets must be synchronized
 (for instance with a [`Mutex.t`](Mutex.html#TYPEt)).


```
module type [S](Weak.S.html) = sig [..](Weak.S.html) end
```

The output signature of the functor [`Weak.Make`](Weak.Make.html).



```
module [Make](Weak.Make.html): `functor (``H``:``[Hashtbl.HashedType](Hashtbl.HashedType.html)``) ->``[S](Weak.S.html)` `with type data = H.t`
```

Functor building an implementation of the weak hash set structure.


