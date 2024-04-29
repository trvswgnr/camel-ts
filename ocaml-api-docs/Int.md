# Module [Int](type_Int.html)


```
module Int: sig [..](Int.html) end
```


Integer values.


Integers are [`Sys.int_size`](Sys.html#VALint_size) bits wide and use two's complement
 representation. All operations are taken modulo
 2`Sys.int_size`. They do not fail on overflow.



* **Since** 4.08




---

## Integers


```
type t = int 
```


The type for integer values.




```
val zero : int
```


`zero` is the integer `0`.




```
val one : int
```


`one` is the integer `1`.




```
val minus_one : int
```


`minus_one` is the integer `-1`.




```
val neg : int -> int
```


`neg x` is `~-x`.




```
val add : int -> int -> int
```


`add x y` is the addition `x + y`.




```
val sub : int -> int -> int
```


`sub x y` is the subtraction `x - y`.




```
val mul : int -> int -> int
```


`mul x y` is the multiplication `x * y`.




```
val div : int -> int -> int
```


`div x y` is the division `x / y`. See [`(/)`](Stdlib.html#VAL(/)) for details.




```
val rem : int -> int -> int
```


`rem x y` is the remainder `x mod y`. See [`(mod)`](Stdlib.html#VAL(mod)) for details.




```
val succ : int -> int
```


`succ x` is `add x 1`.




```
val pred : int -> int
```


`pred x` is `sub x 1`.




```
val abs : int -> int
```


`abs x` is the absolute value of `x`. That is `x` if `x` is positive
 and `neg x` if `x` is negative. **Warning.** This may be negative if
 the argument is [`Int.min_int`](Int.html#VALmin_int).




```
val max_int : int
```


`max_int` is the greatest representable integer,
 `2{^[Sys.int_size - 1]} - 1`.




```
val min_int : int
```


`min_int` is the smallest representable integer,
 `-2{^[Sys.int_size - 1]}`.




```
val logand : int -> int -> int
```


`logand x y` is the bitwise logical and of `x` and `y`.




```
val logor : int -> int -> int
```


`logor x y` is the bitwise logical or of `x` and `y`.




```
val logxor : int -> int -> int
```


`logxor x y` is the bitwise logical exclusive or of `x` and `y`.




```
val lognot : int -> int
```


`lognot x` is the bitwise logical negation of `x`.




```
val shift_left : int -> int -> int
```


`shift_left x n` shifts `x` to the left by `n` bits. The result
 is unspecified if `n < 0` or `n >`[`Sys.int_size`](Sys.html#VALint_size).




```
val shift_right : int -> int -> int
```


`shift_right x n` shifts `x` to the right by `n` bits. This is an
 arithmetic shift: the sign bit of `x` is replicated and inserted
 in the vacated bits. The result is unspecified if `n < 0` or
 `n >`[`Sys.int_size`](Sys.html#VALint_size).




```
val shift_right_logical : int -> int -> int
```


`shift_right x n` shifts `x` to the right by `n` bits. This is a
 logical shift: zeroes are inserted in the vacated bits regardless
 of the sign of `x`. The result is unspecified if `n < 0` or
 `n >`[`Sys.int_size`](Sys.html#VALint_size).



## Predicates and comparisons


```
val equal : int -> int -> bool
```


`equal x y` is `true` if and only if `x = y`.




```
val compare : int -> int -> int
```


`compare x y` is [`compare`](Stdlib.html#VALcompare)`x y` but more efficient.




```
val min : int -> int -> int
```


Return the smaller of the two arguments.



* **Since** 4.13



```
val max : int -> int -> int
```


Return the greater of the two arguments.



* **Since** 4.13


## Converting


```
val to_float : int -> float
```


`to_float x` is `x` as a floating point number.




```
val of_float : float -> int
```


`of_float x` truncates `x` to an integer. The result is
 unspecified if the argument is `nan` or falls outside the range of
 representable integers.




```
val to_string : int -> string
```


`to_string x` is the written representation of `x` in decimal.




```
val seeded_hash : int -> int -> int
```


A seeded hash function for ints, with the same output value as
 [`Hashtbl.seeded_hash`](Hashtbl.html#VALseeded_hash). This function allows this module to be passed as
 argument to the functor [`Hashtbl.MakeSeeded`](Hashtbl.MakeSeeded.html).



* **Since** 5.1



```
val hash : int -> int
```


An unseeded hash function for ints, with the same output value as
 [`Hashtbl.hash`](Hashtbl.html#VALhash). This function allows this module to be passed as argument
 to the functor [`Hashtbl.Make`](Hashtbl.Make.html).



* **Since** 5.1


