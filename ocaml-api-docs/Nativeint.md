# Module [Nativeint](type_Nativeint.html)


```
module Nativeint: sig [..](Nativeint.html) end
```


Processor-native integers.


This module provides operations on the type `nativeint` of
 signed 32-bit integers (on 32-bit platforms) or
 signed 64-bit integers (on 64-bit platforms).
 This integer type has exactly the same width as that of a
 pointer type in the C compiler. All arithmetic operations over
 `nativeint` are taken modulo 232 or 264 depending
 on the word size of the architecture.


Performance notice: values of type `nativeint` occupy more memory
 space than values of type `int`, and arithmetic operations on
 `nativeint` are generally slower than those on `int`. Use `nativeint`
 only when the application requires the extra bit of precision
 over the `int` type.


Literals for native integers are suffixed by n:



```
     let zero: nativeint = 0n
     let one: nativeint = 1n
     let m_one: nativeint = -1n
    
```



---


```
val zero : nativeint
```


The native integer 0.




```
val one : nativeint
```


The native integer 1.




```
val minus_one : nativeint
```


The native integer -1.




```
val neg : nativeint -> nativeint
```


Unary negation.




```
val add : nativeint -> nativeint -> nativeint
```


Addition.




```
val sub : nativeint -> nativeint -> nativeint
```


Subtraction.




```
val mul : nativeint -> nativeint -> nativeint
```


Multiplication.




```
val div : nativeint -> nativeint -> nativeint
```


Integer division. This division rounds the real quotient of
 its arguments towards zero, as specified for [`(/)`](Stdlib.html#VAL(/)).



* **Raises** `Division_by_zero` if the second
 argument is zero.



```
val unsigned_div : nativeint -> nativeint -> nativeint
```


Same as [`Nativeint.div`](Nativeint.html#VALdiv), except that arguments and result are interpreted as  *unsigned* native integers.



* **Since** 4.08



```
val rem : nativeint -> nativeint -> nativeint
```


Integer remainder. If `y` is not zero, the result
 of `Nativeint.rem x y` satisfies the following properties:
 `Nativeint.zero <= Nativeint.rem x y < Nativeint.abs y` and
 `x = Nativeint.add (Nativeint.mul (Nativeint.div x y) y)  

                      (Nativeint.rem x y)`.
 If `y = 0`, `Nativeint.rem x y` raises `Division_by_zero`.




```
val unsigned_rem : nativeint -> nativeint -> nativeint
```


Same as [`Nativeint.rem`](Nativeint.html#VALrem), except that arguments and result are interpreted as  *unsigned* native integers.



* **Since** 4.08



```
val succ : nativeint -> nativeint
```


Successor.
 `Nativeint.succ x` is `Nativeint.add x Nativeint.one`.




```
val pred : nativeint -> nativeint
```


Predecessor.
 `Nativeint.pred x` is `Nativeint.sub x Nativeint.one`.




```
val abs : nativeint -> nativeint
```


`abs x` is the absolute value of `x`. On `min_int` this
 is `min_int` itself and thus remains negative.




```
val size : int
```


The size in bits of a native integer. This is equal to `32`
 on a 32-bit platform and to `64` on a 64-bit platform.




```
val max_int : nativeint
```


The greatest representable native integer,
 either 231 - 1 on a 32-bit platform,
 or 263 - 1 on a 64-bit platform.




```
val min_int : nativeint
```


The smallest representable native integer,
 either -231 on a 32-bit platform,
 or -263 on a 64-bit platform.




```
val logand : nativeint -> nativeint -> nativeint
```


Bitwise logical and.




```
val logor : nativeint -> nativeint -> nativeint
```


Bitwise logical or.




```
val logxor : nativeint -> nativeint -> nativeint
```


Bitwise logical exclusive or.




```
val lognot : nativeint -> nativeint
```


Bitwise logical negation.




```
val shift_left : nativeint -> int -> nativeint
```


`Nativeint.shift_left x y` shifts `x` to the left by `y` bits.
 The result is unspecified if `y < 0` or `y >= bitsize`,
 where `bitsize` is `32` on a 32-bit platform and
 `64` on a 64-bit platform.




```
val shift_right : nativeint -> int -> nativeint
```


`Nativeint.shift_right x y` shifts `x` to the right by `y` bits.
 This is an arithmetic shift: the sign bit of `x` is replicated
 and inserted in the vacated bits.
 The result is unspecified if `y < 0` or `y >= bitsize`.




```
val shift_right_logical : nativeint -> int -> nativeint
```


`Nativeint.shift_right_logical x y` shifts `x` to the right
 by `y` bits.
 This is a logical shift: zeroes are inserted in the vacated bits
 regardless of the sign of `x`.
 The result is unspecified if `y < 0` or `y >= bitsize`.




```
val of_int : int -> nativeint
```


Convert the given integer (type `int`) to a native integer
 (type `nativeint`).




```
val to_int : nativeint -> int
```


Convert the given native integer (type `nativeint`) to an
 integer (type `int`). The high-order bit is lost during
 the conversion.




```
val unsigned_to_int : nativeint -> int option
```


Same as [`Nativeint.to_int`](Nativeint.html#VALto_int), but interprets the argument as an *unsigned* integer.
 Returns `None` if the unsigned value of the argument cannot fit into an
 `int`.



* **Since** 4.08



```
val of_float : float -> nativeint
```


Convert the given floating-point number to a native integer,
 discarding the fractional part (truncate towards 0).
 If the truncated floating-point number is outside the range
 [[`Nativeint.min_int`](Nativeint.html#VALmin_int), [`Nativeint.max_int`](Nativeint.html#VALmax_int)], no exception is raised,
 and an unspecified, platform-dependent integer is returned.




```
val to_float : nativeint -> float
```


Convert the given native integer to a floating-point number.




```
val of_int32 : int32 -> nativeint
```


Convert the given 32-bit integer (type `int32`)
 to a native integer.




```
val to_int32 : nativeint -> int32
```


Convert the given native integer to a
 32-bit integer (type `int32`). On 64-bit platforms,
 the 64-bit native integer is taken modulo 232,
 i.e. the top 32 bits are lost. On 32-bit platforms,
 the conversion is exact.




```
val of_string : string -> nativeint
```


Convert the given string to a native integer.
 The string is read in decimal (by default, or if the string
 begins with `0u`) or in hexadecimal, octal or binary if the
 string begins with `0x`, `0o` or `0b` respectively.


The `0u` prefix reads the input as an unsigned integer in the range
 `[0, 2*Nativeint.max_int+1]`. If the input exceeds [`Nativeint.max_int`](Nativeint.html#VALmax_int)
 it is converted to the signed integer
 `Int64.min_int + input - Nativeint.max_int - 1`.



* **Raises** `Failure` if the given string is not
 a valid representation of an integer, or if the integer represented
 exceeds the range of integers representable in type `nativeint`.



```
val of_string_opt : string -> nativeint option
```


Same as `of_string`, but return `None` instead of raising.



* **Since** 4.05



```
val to_string : nativeint -> string
```


Return the string representation of its argument, in decimal.




```
type t = nativeint 
```


An alias for the type of native integers.




```
val compare : [t](Nativeint.html#TYPEt) -> [t](Nativeint.html#TYPEt) -> int
```


The comparison function for native integers, with the same specification as
 [`compare`](Stdlib.html#VALcompare). Along with the type `t`, this function `compare`
 allows the module `Nativeint` to be passed as argument to the functors
 [`Set.Make`](Set.Make.html) and [`Map.Make`](Map.Make.html).




```
val unsigned_compare : [t](Nativeint.html#TYPEt) -> [t](Nativeint.html#TYPEt) -> int
```


Same as [`Nativeint.compare`](Nativeint.html#VALcompare), except that arguments are interpreted as *unsigned*
 native integers.



* **Since** 4.08



```
val equal : [t](Nativeint.html#TYPEt) -> [t](Nativeint.html#TYPEt) -> bool
```


The equal function for native ints.



* **Since** 4.03



```
val min : [t](Nativeint.html#TYPEt) -> [t](Nativeint.html#TYPEt) -> [t](Nativeint.html#TYPEt)
```


Return the smaller of the two arguments.



* **Since** 4.13



```
val max : [t](Nativeint.html#TYPEt) -> [t](Nativeint.html#TYPEt) -> [t](Nativeint.html#TYPEt)
```


Return the greater of the two arguments.



* **Since** 4.13



```
val seeded_hash : int -> [t](Nativeint.html#TYPEt) -> int
```


A seeded hash function for native ints, with the same output value as
 [`Hashtbl.seeded_hash`](Hashtbl.html#VALseeded_hash). This function allows this module to be passed as
 argument to the functor [`Hashtbl.MakeSeeded`](Hashtbl.MakeSeeded.html).



* **Since** 5.1



```
val hash : [t](Nativeint.html#TYPEt) -> int
```


An unseeded hash function for native ints, with the same output value as
 [`Hashtbl.hash`](Hashtbl.html#VALhash). This function allows this module to be passed as argument
 to the functor [`Hashtbl.Make`](Hashtbl.Make.html).



* **Since** 5.1


