# Module [Random](type_Random.html)


```
module Random: sig [..](Random.html) end
```


Pseudo-random number generators (PRNG).


With multiple domains, each domain has its own generator that evolves
 independently of the generators of other domains. When a domain is
 created, its generator is initialized by splitting the state
 of the generator associated with the parent domain.


In contrast, all threads within a domain share the same domain-local
 generator. Independent generators can be created with the [`Random.split`](Random.html#VALsplit)
 function and used with the functions from the [`Random.State`](Random.State.html) module.





---

## Basic functions


```
val init : int -> unit
```


Initialize the domain-local generator, using the argument as a seed.
 The same seed will always yield the same sequence of numbers.




```
val full_init : int array -> unit
```


Same as [`Random.init`](Random.html#VALinit) but takes more data as seed.




```
val self_init : unit -> unit
```


Initialize the domain-local generator with a random seed chosen
 in a system-dependent way. If `/dev/urandom` is available on the host
 machine, it is used to provide a highly random initial seed. Otherwise, a
 less random seed is computed from system parameters (current time, process
 IDs, domain-local state).




```
val bits : unit -> int
```


Return 30 random bits in a nonnegative integer.



* **Before 5.0**  used a different algorithm (affects all the following functions)



```
val int : int -> int
```


`Random.int bound` returns a random integer between 0 (inclusive)
 and `bound` (exclusive). `bound` must be greater than 0 and less
 than 230.




```
val full_int : int -> int
```


`Random.full_int bound` returns a random integer between 0 (inclusive)
 and `bound` (exclusive). `bound` may be any positive integer.


If `bound` is less than 230, `Random.full_int bound` is equal to
 [`Random.int`](Random.html#VALint)`bound`. If `bound` is greater than 230 (on 64-bit systems
 or non-standard environments, such as JavaScript), `Random.full_int`
 returns a value, where [`Random.int`](Random.html#VALint) raises [`Invalid_argument`](Stdlib.html#EXCEPTIONInvalid_argument).



* **Since** 4.13



```
val int32 : [Int32.t](Int32.html#TYPEt) -> [Int32.t](Int32.html#TYPEt)
```


`Random.int32 bound` returns a random integer between 0 (inclusive)
 and `bound` (exclusive). `bound` must be greater than 0.




```
val nativeint : [Nativeint.t](Nativeint.html#TYPEt) -> [Nativeint.t](Nativeint.html#TYPEt)
```


`Random.nativeint bound` returns a random integer between 0 (inclusive)
 and `bound` (exclusive). `bound` must be greater than 0.




```
val int64 : [Int64.t](Int64.html#TYPEt) -> [Int64.t](Int64.html#TYPEt)
```


`Random.int64 bound` returns a random integer between 0 (inclusive)
 and `bound` (exclusive). `bound` must be greater than 0.




```
val float : float -> float
```


`Random.float bound` returns a random floating-point number
 between 0 and `bound` (inclusive). If `bound` is
 negative, the result is negative or zero. If `bound` is 0,
 the result is 0.




```
val bool : unit -> bool
```


`Random.bool ()` returns `true` or `false` with probability 0.5 each.




```
val bits32 : unit -> [Int32.t](Int32.html#TYPEt)
```


`Random.bits32 ()` returns 32 random bits as an integer between
 [`Int32.min_int`](Int32.html#VALmin_int) and [`Int32.max_int`](Int32.html#VALmax_int).



* **Since** 4.14



```
val bits64 : unit -> [Int64.t](Int64.html#TYPEt)
```


`Random.bits64 ()` returns 64 random bits as an integer between
 [`Int64.min_int`](Int64.html#VALmin_int) and [`Int64.max_int`](Int64.html#VALmax_int).



* **Since** 4.14



```
val nativebits : unit -> [Nativeint.t](Nativeint.html#TYPEt)
```


`Random.nativebits ()` returns 32 or 64 random bits (depending on
 the bit width of the platform) as an integer between
 [`Nativeint.min_int`](Nativeint.html#VALmin_int) and [`Nativeint.max_int`](Nativeint.html#VALmax_int).



* **Since** 4.14


## Advanced functions

The functions from module [`Random.State`](Random.State.html) manipulate the current state
 of the random generator explicitly.
 This allows using one or several deterministic PRNGs,
 even in a multi-threaded program, without interference from
 other parts of the program.


```
module [State](Random.State.html): sig [..](Random.State.html) end
```

```
val get_state : unit -> [State.t](Random.State.html#TYPEt)
```


`get_state()` returns a fresh copy of the current state of the
 domain-local generator (which is used by the basic functions).




```
val set_state : [State.t](Random.State.html#TYPEt) -> unit
```


`set_state s` updates the current state of the domain-local
 generator (which is used by the basic functions) by copying
 the state `s` into it.




```
val split : unit -> [State.t](Random.State.html#TYPEt)
```


Draw a fresh PRNG state from the current state of the domain-local
 generator used by the default functions.
 (The state of the domain-local generator is modified.)
 See [`Random.State.split`](Random.State.html#VALsplit).



* **Since** 5.0


