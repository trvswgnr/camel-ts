# Module [Ephemeron](type_Ephemeron.html)


```
module Ephemeron: sig [..](Ephemeron.html) end
```


Ephemerons and weak hash tables.


Ephemerons and weak hash tables are useful when one wants to cache
 or memorize the computation of a function, as long as the
 arguments and the function are used, without creating memory leaks
 by continuously keeping old computation results that are not
 useful anymore because one argument or the function is freed. An
 implementation using [`Hashtbl.t`](Hashtbl.html#TYPEt) is not suitable because all
 associations would keep the arguments and the result in memory.


Ephemerons can also be used for "adding" a field to an arbitrary
 boxed OCaml value: you can attach some information to a value
 created by an external library without memory leaks.


Ephemerons hold some keys and one or no data. They are all boxed
 OCaml values. The keys of an ephemeron have the same behavior
 as weak pointers according to the garbage collector. In fact
 OCaml weak pointers are implemented as ephemerons without data.


The keys and data of an ephemeron are said to be full if they
 point to a value, or empty if the value has never been set, has
 been unset, or was erased by the GC. In the function that accesses
 the keys or data these two states are represented by the `option`
 type.


The data is considered by the garbage collector alive if all the
 full keys are alive and if the ephemeron is alive. When one of the
 keys is not considered alive anymore by the GC, the data is
 emptied from the ephemeron. The data could be alive for another
 reason and in that case the GC will not free it, but the ephemeron
 will not hold the data anymore.


The ephemerons complicate the notion of liveness of values, because
 it is not anymore an equivalence with the reachability from root
 value by usual pointers (not weak and not ephemerons). With ephemerons
 the notion of liveness is constructed by the least fixpoint of:
 A value is alive if:


* it is a root value
* it is reachable from alive value by usual pointers
* it is the data of an alive ephemeron with all its full keys alive


Notes:


* All the types defined in this module cannot be marshaled
 using [`output_value`](Stdlib.html#VALoutput_value) or the functions of the
 [`Marshal`](Marshal.html) module.


Ephemerons are defined in a language agnostic way in this paper:
 B. Hayes, Ephemerons: A New Finalization Mechanism, OOPSLA'97



* **Since** 4.03
* **Alert unsynchronized\_access.** Unsynchronized accesses to weak hash tables are a programming error.




---

**Unsynchronized accesses**

Unsynchronized accesses to a weak hash table may lead to an invalid
 weak hash table state. Thus, concurrent accesses to a buffer must be
 synchronized (for instance with a [`Mutex.t`](Mutex.html#TYPEt)).


```
module type [S](Ephemeron.S.html) = sig [..](Ephemeron.S.html) end
```

The output signature of the functors [`Ephemeron.K1.Make`](Ephemeron.K1.Make.html) and [`Ephemeron.K2.Make`](Ephemeron.K2.Make.html).



```
module type [SeededS](Ephemeron.SeededS.html) = sig [..](Ephemeron.SeededS.html) end
```

The output signature of the functors [`Ephemeron.K1.MakeSeeded`](Ephemeron.K1.MakeSeeded.html) and [`Ephemeron.K2.MakeSeeded`](Ephemeron.K2.MakeSeeded.html).



```
module [K1](Ephemeron.K1.html): sig [..](Ephemeron.K1.html) end
```

Ephemerons with one key.



```
module [K2](Ephemeron.K2.html): sig [..](Ephemeron.K2.html) end
```

Ephemerons with two keys.



```
module [Kn](Ephemeron.Kn.html): sig [..](Ephemeron.Kn.html) end
```

Ephemerons with arbitrary number of keys of the same type.


