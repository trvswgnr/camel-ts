# Module [Stdlib](type_Stdlib.html)


```
module Stdlib: sig [..](Stdlib.html) end
```


The OCaml Standard library.


This module is automatically opened at the beginning of each
 compilation. All components of this module can therefore be
 referred by their short name, without prefixing them by `Stdlib`.


In particular, it provides the basic operations over the built-in
 types (numbers, booleans, byte sequences, strings, exceptions,
 references, lists, arrays, input-output channels, ...) and the
 [standard library modules](Stdlib.html#modules).





---

## Exceptions


```
val raise : exn -> 'a
```


Raise the given exception value




```
val raise_notrace : exn -> 'a
```


A faster version `raise` which does not record the backtrace.



* **Since** 4.02



```
val invalid_arg : string -> 'a
```


Raise exception `Invalid_argument` with the given string.




```
val failwith : string -> 'a
```


Raise exception `Failure` with the given string.




```
exception Exit
```


The `Exit` exception is not raised by any library function. It is
 provided for use in your programs.




```
exception Match_failure of (string * int * int)
```


Exception raised when none of the cases of a pattern-matching
 apply. The arguments are the location of the match keyword in the
 source code (file name, line number, column number).




```
exception Assert_failure of (string * int * int)
```


Exception raised when an assertion fails. The arguments are the
 location of the assert keyword in the source code (file name, line
 number, column number).




```
exception Invalid_argument of string
```


Exception raised by library functions to signal that the given
 arguments do not make sense. The string gives some information to
 the programmer. As a general rule, this exception should not be
 caught, it denotes a programming error and the code should be
 modified not to trigger it.




```
exception Failure of string
```


Exception raised by library functions to signal that they are
 undefined on the given arguments. The string is meant to give some
 information to the programmer; you must not pattern match on the
 string literal because it may change in future versions (use
 Failure \_ instead).




```
exception Not_found
```


Exception raised by search functions when the desired object could
 not be found.




```
exception Out_of_memory
```


Exception raised by the garbage collector when there is
 insufficient memory to complete the computation. (Not reliable for
 allocations on the minor heap.)




```
exception Stack_overflow
```


Exception raised by the bytecode interpreter when the evaluation
 stack reaches its maximal size. This often indicates infinite or
 excessively deep recursion in the user's program.


Before 4.10, it was not fully implemented by the native-code
 compiler.




```
exception Sys_error of string
```


Exception raised by the input/output functions to report an
 operating system error. The string is meant to give some
 information to the programmer; you must not pattern match on the
 string literal because it may change in future versions (use
 Sys\_error \_ instead).




```
exception End_of_file
```


Exception raised by input functions to signal that the end of file
 has been reached.




```
exception Division_by_zero
```


Exception raised by integer division and remainder operations when
 their second argument is zero.




```
exception Sys_blocked_io
```


A special case of Sys\_error raised when no I/O is possible on a
 non-blocking I/O channel.




```
exception Undefined_recursive_module of (string * int * int)
```


Exception raised when an ill-founded recursive module definition
 is evaluated. The arguments are the location of the definition in
 the source code (file name, line number, column number).



## Comparisons


```
val (=) : 'a -> 'a -> bool
```


`e1 = e2` tests for structural equality of `e1` and `e2`.
 Mutable structures (e.g. references and arrays) are equal
 if and only if their current contents are structurally equal,
 even if the two mutable objects are not the same physical object.
 Equality between functional values raises `Invalid_argument`.
 Equality between cyclic data structures may not terminate.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (<>) : 'a -> 'a -> bool
```


Negation of [`(=)`](Stdlib.html#VAL(=)).
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (<) : 'a -> 'a -> bool
```


See [`(>=)`](Stdlib.html#VAL(>=)).
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (>) : 'a -> 'a -> bool
```


See [`(>=)`](Stdlib.html#VAL(>=)).
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (<=) : 'a -> 'a -> bool
```


See [`(>=)`](Stdlib.html#VAL(>=)).
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (>=) : 'a -> 'a -> bool
```


Structural ordering functions. These functions coincide with
 the usual orderings over integers, characters, strings, byte sequences
 and floating-point numbers, and extend them to a
 total ordering over all types.
 The ordering is compatible with `( = )`. As in the case
 of `( = )`, mutable structures are compared by contents.
 Comparison between functional values raises `Invalid_argument`.
 Comparison between cyclic structures may not terminate.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val compare : 'a -> 'a -> int
```


`compare x y` returns `0` if `x` is equal to `y`,
 a negative integer if `x` is less than `y`, and a positive integer
 if `x` is greater than `y`. The ordering implemented by `compare`
 is compatible with the comparison predicates `=`, `<` and `>`
 defined above, with one difference on the treatment of the float value
 [`nan`](Stdlib.html#VALnan). Namely, the comparison predicates treat `nan`
 as different from any other float value, including itself;
 while `compare` treats `nan` as equal to itself and less than any
 other float value. This treatment of `nan` ensures that `compare`
 defines a total ordering relation.


`compare` applied to functional values may raise `Invalid_argument`.
 `compare` applied to cyclic structures may not terminate.


The `compare` function can be used as the comparison function
 required by the [`Set.Make`](Set.Make.html) and [`Map.Make`](Map.Make.html) functors, as well as
 the [`List.sort`](List.html#VALsort) and [`Array.sort`](Array.html#VALsort) functions.




```
val min : 'a -> 'a -> 'a
```


Return the smaller of the two arguments.
 The result is unspecified if one of the arguments contains
 the float value `nan`.




```
val max : 'a -> 'a -> 'a
```


Return the greater of the two arguments.
 The result is unspecified if one of the arguments contains
 the float value `nan`.




```
val (==) : 'a -> 'a -> bool
```


`e1 == e2` tests for physical equality of `e1` and `e2`.
 On mutable types such as references, arrays, byte sequences, records with
 mutable fields and objects with mutable instance variables,
 `e1 == e2` is true if and only if physical modification of `e1`
 also affects `e2`.
 On non-mutable types, the behavior of `( == )` is
 implementation-dependent; however, it is guaranteed that
 `e1 == e2` implies `compare e1 e2 = 0`.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (!=) : 'a -> 'a -> bool
```


Negation of [`(==)`](Stdlib.html#VAL(==)).
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



## Boolean operations


```
val not : bool -> bool
```


The boolean negation.




```
val (&&) : bool -> bool -> bool
```


The boolean 'and'. Evaluation is sequential, left-to-right:
 in `e1 && e2`, `e1` is evaluated first, and if it returns `false`,
 `e2` is not evaluated at all.
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (||) : bool -> bool -> bool
```


The boolean 'or'. Evaluation is sequential, left-to-right:
 in `e1 || e2`, `e1` is evaluated first, and if it returns `true`,
 `e2` is not evaluated at all.
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



## Debugging


```
val __LOC__ : string
```


`__LOC__` returns the location at which this expression appears in
 the file currently being parsed by the compiler, with the standard
 error format of OCaml: "File %S, line %d, characters %d-%d".



* **Since** 4.02



```
val __FILE__ : string
```


`__FILE__` returns the name of the file currently being
 parsed by the compiler.



* **Since** 4.02



```
val __LINE__ : int
```


`__LINE__` returns the line number at which this expression
 appears in the file currently being parsed by the compiler.



* **Since** 4.02



```
val __MODULE__ : string
```


`__MODULE__` returns the module name of the file being
 parsed by the compiler.



* **Since** 4.02



```
val __POS__ : string * int * int * int
```


`__POS__` returns a tuple `(file,lnum,cnum,enum)`, corresponding
 to the location at which this expression appears in the file
 currently being parsed by the compiler. `file` is the current
 filename, `lnum` the line number, `cnum` the character position in
 the line and `enum` the last character position in the line.



* **Since** 4.02



```
val __FUNCTION__ : string
```


`__FUNCTION__` returns the name of the current function or method, including
 any enclosing modules or classes.



* **Since** 4.12



```
val __LOC_OF__ : 'a -> string * 'a
```


`__LOC_OF__ expr` returns a pair `(loc, expr)` where `loc` is the
 location of `expr` in the file currently being parsed by the
 compiler, with the standard error format of OCaml: "File %S, line
 %d, characters %d-%d".



* **Since** 4.02



```
val __LINE_OF__ : 'a -> int * 'a
```


`__LINE_OF__ expr` returns a pair `(line, expr)`, where `line` is the
 line number at which the expression `expr` appears in the file
 currently being parsed by the compiler.



* **Since** 4.02



```
val __POS_OF__ : 'a -> (string * int * int * int) * 'a
```


`__POS_OF__ expr` returns a pair `(loc,expr)`, where `loc` is a
 tuple `(file,lnum,cnum,enum)` corresponding to the location at
 which the expression `expr` appears in the file currently being
 parsed by the compiler. `file` is the current filename, `lnum` the
 line number, `cnum` the character position in the line and `enum`
 the last character position in the line.



* **Since** 4.02


## Composition operators


```
val (|>) : 'a -> ('a -> 'b) -> 'b
```


Reverse-application operator: `x |> f |> g` is exactly equivalent
 to `g (f (x))`.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



* **Since** 4.01



```
val (@@) : ('a -> 'b) -> 'a -> 'b
```


Application operator: `g @@ f @@ x` is exactly equivalent to
 `g (f (x))`.
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



* **Since** 4.01


## Integer arithmetic

Integers are `Sys.int_size` bits wide.
 All operations are taken modulo 2`Sys.int_size`.
 They do not fail on overflow.


```
val (~-) : int -> int
```


Unary negation. You can also write `- e` instead of `~- e`.
 Unary operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (~+) : int -> int
```


Unary addition. You can also write `+ e` instead of `~+ e`.
 Unary operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



* **Since** 3.12



```
val succ : int -> int
```


`succ x` is `x + 1`.




```
val pred : int -> int
```


`pred x` is `x - 1`.




```
val (+) : int -> int -> int
```


Integer addition.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (-) : int -> int -> int
```


Integer subtraction.
 Left-associative operator, , see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val ( * ) : int -> int -> int
```


Integer multiplication.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (/) : int -> int -> int
```


Integer division.
 Integer division rounds the real quotient of its arguments towards zero.
 More precisely, if `x >= 0` and `y > 0`, `x / y` is the greatest integer
 less than or equal to the real quotient of `x` by `y`. Moreover,
 `(- x) / y = x / (- y) = - (x / y)`.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



* **Raises** `Division_by_zero` if the second argument is 0.



```
val (mod) : int -> int -> int
```


Integer remainder. If `y` is not zero, the result
 of `x mod y` satisfies the following properties:
 `x = (x / y) * y + x mod y` and
 `abs(x mod y) <= abs(y) - 1`.
 If `y = 0`, `x mod y` raises `Division_by_zero`.
 Note that `x mod y` is negative only if `x < 0`.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



* **Raises** `Division_by_zero` if `y` is zero.



```
val abs : int -> int
```


`abs x` is the absolute value of `x`. On `min_int` this
 is `min_int` itself and thus remains negative.




```
val max_int : int
```


The greatest representable integer.




```
val min_int : int
```


The smallest representable integer.



### Bitwise operations


```
val (land) : int -> int -> int
```


Bitwise logical and.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (lor) : int -> int -> int
```


Bitwise logical or.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (lxor) : int -> int -> int
```


Bitwise logical exclusive or.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val lnot : int -> int
```


Bitwise logical negation.




```
val (lsl) : int -> int -> int
```


`n lsl m` shifts `n` to the left by `m` bits.
 The result is unspecified if `m < 0` or `m > Sys.int_size`.
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (lsr) : int -> int -> int
```


`n lsr m` shifts `n` to the right by `m` bits.
 This is a logical shift: zeroes are inserted regardless of
 the sign of `n`.
 The result is unspecified if `m < 0` or `m > Sys.int_size`.
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (asr) : int -> int -> int
```


`n asr m` shifts `n` to the right by `m` bits.
 This is an arithmetic shift: the sign bit of `n` is replicated.
 The result is unspecified if `m < 0` or `m > Sys.int_size`.
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



## Floating-point arithmetic

OCaml's floating-point numbers follow the
 IEEE 754 standard, using double precision (64 bits) numbers.
 Floating-point operations never raise an exception on overflow,
 underflow, division by zero, etc. Instead, special IEEE numbers
 are returned as appropriate, such as `infinity` for `1.0 /. 0.0`,
 `neg_infinity` for `-1.0 /. 0.0`, and `nan` ('not a number')
 for `0.0 /. 0.0`. These special numbers then propagate through
 floating-point computations as expected: for instance,
 `1.0 /. infinity` is `0.0`, basic arithmetic operations
 (`+.`, `-.`, `*.`, `/.`) with `nan` as an argument return `nan`, ...


```
val (~-.) : float -> float
```


Unary negation. You can also write `-. e` instead of `~-. e`.
 Unary operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (~+.) : float -> float
```


Unary addition. You can also write `+. e` instead of `~+. e`.
 Unary operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



* **Since** 3.12



```
val (+.) : float -> float -> float
```


Floating-point addition.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (-.) : float -> float -> float
```


Floating-point subtraction.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val ( *. ) : float -> float -> float
```


Floating-point multiplication.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (/.) : float -> float -> float
```


Floating-point division.
 Left-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val ( ** ) : float -> float -> float
```


Exponentiation.
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val sqrt : float -> float
```


Square root.




```
val exp : float -> float
```


Exponential.




```
val log : float -> float
```


Natural logarithm.




```
val log10 : float -> float
```


Base 10 logarithm.




```
val expm1 : float -> float
```


`expm1 x` computes `exp x -. 1.0`, giving numerically-accurate results
 even if `x` is close to `0.0`.



* **Since** 3.12



```
val log1p : float -> float
```


`log1p x` computes `log(1.0 +. x)` (natural logarithm),
 giving numerically-accurate results even if `x` is close to `0.0`.



* **Since** 3.12



```
val cos : float -> float
```


Cosine. Argument is in radians.




```
val sin : float -> float
```


Sine. Argument is in radians.




```
val tan : float -> float
```


Tangent. Argument is in radians.




```
val acos : float -> float
```


Arc cosine. The argument must fall within the range `[-1.0, 1.0]`.
 Result is in radians and is between `0.0` and `pi`.




```
val asin : float -> float
```


Arc sine. The argument must fall within the range `[-1.0, 1.0]`.
 Result is in radians and is between `-pi/2` and `pi/2`.




```
val atan : float -> float
```


Arc tangent.
 Result is in radians and is between `-pi/2` and `pi/2`.




```
val atan2 : float -> float -> float
```


`atan2 y x` returns the arc tangent of `y /. x`. The signs of `x`
 and `y` are used to determine the quadrant of the result.
 Result is in radians and is between `-pi` and `pi`.




```
val hypot : float -> float -> float
```


`hypot x y` returns `sqrt(x *. x + y *. y)`, that is, the length
 of the hypotenuse of a right-angled triangle with sides of length
 `x` and `y`, or, equivalently, the distance of the point `(x,y)`
 to origin. If one of `x` or `y` is infinite, returns `infinity`
 even if the other is `nan`.



* **Since** 4.00



```
val cosh : float -> float
```


Hyperbolic cosine. Argument is in radians.




```
val sinh : float -> float
```


Hyperbolic sine. Argument is in radians.




```
val tanh : float -> float
```


Hyperbolic tangent. Argument is in radians.




```
val acosh : float -> float
```


Hyperbolic arc cosine. The argument must fall within the range
 `[1.0, inf]`.
 Result is in radians and is between `0.0` and `inf`.



* **Since** 4.13



```
val asinh : float -> float
```


Hyperbolic arc sine. The argument and result range over the entire
 real line.
 Result is in radians.



* **Since** 4.13



```
val atanh : float -> float
```


Hyperbolic arc tangent. The argument must fall within the range
 `[-1.0, 1.0]`.
 Result is in radians and ranges over the entire real line.



* **Since** 4.13



```
val ceil : float -> float
```


Round above to an integer value.
 `ceil f` returns the least integer value greater than or equal to `f`.
 The result is returned as a float.




```
val floor : float -> float
```


Round below to an integer value.
 `floor f` returns the greatest integer value less than or
 equal to `f`.
 The result is returned as a float.




```
val abs_float : float -> float
```


`abs_float f` returns the absolute value of `f`.




```
val copysign : float -> float -> float
```


`copysign x y` returns a float whose absolute value is that of `x`
 and whose sign is that of `y`. If `x` is `nan`, returns `nan`.
 If `y` is `nan`, returns either `x` or `-. x`, but it is not
 specified which.



* **Since** 4.00



```
val mod_float : float -> float -> float
```


`mod_float a b` returns the remainder of `a` with respect to
 `b`. The returned value is `a -. n *. b`, where `n`
 is the quotient `a /. b` rounded towards zero to an integer.




```
val frexp : float -> float * int
```


`frexp f` returns the pair of the significant
 and the exponent of `f`. When `f` is zero, the
 significant `x` and the exponent `n` of `f` are equal to
 zero. When `f` is non-zero, they are defined by
 `f = x *. 2 ** n` and `0.5 <= x < 1.0`.




```
val ldexp : float -> int -> float
```


`ldexp x n` returns `x *. 2 ** n`.




```
val modf : float -> float * float
```


`modf f` returns the pair of the fractional and integral
 part of `f`.




```
val float : int -> float
```


Same as [`float_of_int`](Stdlib.html#VALfloat_of_int).




```
val float_of_int : int -> float
```


Convert an integer to floating-point.




```
val truncate : float -> int
```


Same as [`int_of_float`](Stdlib.html#VALint_of_float).




```
val int_of_float : float -> int
```


Truncate the given floating-point number to an integer.
 The result is unspecified if the argument is `nan` or falls outside the
 range of representable integers.




```
val infinity : float
```


Positive infinity.




```
val neg_infinity : float
```


Negative infinity.




```
val nan : float
```


A special floating-point value denoting the result of an
 undefined operation such as `0.0 /. 0.0`. Stands for
 'not a number'. Any floating-point operation with `nan` as
 argument returns `nan` as result, unless otherwise specified in
 IEEE 754 standard. As for floating-point comparisons,
 `=`, `<`, `<=`, `>` and `>=` return `false` and `<>` returns `true`
 if one or both of their arguments is `nan`.


`nan` is a quiet NaN since 5.1; it was a signaling NaN before.




```
val max_float : float
```


The largest positive finite value of type `float`.




```
val min_float : float
```


The smallest positive, non-zero, non-denormalized value of type `float`.




```
val epsilon_float : float
```


The difference between `1.0` and the smallest exactly representable
 floating-point number greater than `1.0`.




```
type fpclass = 
```


| `|` | `FP_normal` | `(*` | Normal number, none of the below | `*)` |
| --- | --- | --- | --- | --- |
| `|` | `FP_subnormal` | `(*` | Number very close to 0.0, has reduced precision | `*)` |
| `|` | `FP_zero` | `(*` | Number is 0.0 or -0.0 | `*)` |
| `|` | `FP_infinite` | `(*` | Number is positive or negative infinity | `*)` |
| `|` | `FP_nan` | `(*` | Not a number: result of an undefined operation | `*)` |



The five classes of floating-point numbers, as determined by
 the [`classify_float`](Stdlib.html#VALclassify_float) function.




```
val classify_float : float -> [fpclass](Stdlib.html#TYPEfpclass)
```


Return the class of the given floating-point number:
 normal, subnormal, zero, infinite, or not a number.



## String operations

More string operations are provided in module [`String`](Stdlib.String.html).


```
val (^) : string -> string -> string
```


String concatenation.
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



* **Raises** `Invalid_argument` if the result is longer then
 than [`Sys.max_string_length`](Sys.html#VALmax_string_length) bytes.


## Character operations

More character operations are provided in module [`Char`](Stdlib.Char.html).


```
val int_of_char : char -> int
```


Return the ASCII code of the argument.




```
val char_of_int : int -> char
```


Return the character with the given ASCII code.



* **Raises** `Invalid_argument` if the argument is
 outside the range 0--255.


## Unit operations


```
val ignore : 'a -> unit
```


Discard the value of its argument and return `()`.
 For instance, `ignore(f x)` discards the result of
 the side-effecting function `f`. It is equivalent to
 `f x; ()`, except that the latter may generate a
 compiler warning; writing `ignore(f x)` instead
 avoids the warning.



## String conversion functions


```
val string_of_bool : bool -> string
```


Return the string representation of a boolean. As the returned values
 may be shared, the user should not modify them directly.




```
val bool_of_string_opt : string -> bool option
```


Convert the given string to a boolean.


Return `None` if the string is not `"true"` or `"false"`.



* **Since** 4.05



```
val bool_of_string : string -> bool
```


Same as [`bool_of_string_opt`](Stdlib.html#VALbool_of_string_opt), but raise
 `Invalid_argument "bool_of_string"` instead of returning `None`.




```
val string_of_int : int -> string
```


Return the string representation of an integer, in decimal.




```
val int_of_string_opt : string -> int option
```


Convert the given string to an integer.
 The string is read in decimal (by default, or if the string
 begins with `0u`), in hexadecimal (if it begins with `0x` or
 `0X`), in octal (if it begins with `0o` or `0O`), or in binary
 (if it begins with `0b` or `0B`).


The `0u` prefix reads the input as an unsigned integer in the range
 `[0, 2*max_int+1]`. If the input exceeds [`max_int`](Stdlib.html#VALmax_int)
 it is converted to the signed integer
 `min_int + input - max_int - 1`.


The `_` (underscore) character can appear anywhere in the string
 and is ignored.


Return `None` if the given string is not a valid representation of an
 integer, or if the integer represented exceeds the range of integers
 representable in type `int`.



* **Since** 4.05



```
val int_of_string : string -> int
```


Same as [`int_of_string_opt`](Stdlib.html#VALint_of_string_opt), but raise
 `Failure "int_of_string"` instead of returning `None`.




```
val string_of_float : float -> string
```


Return a string representation of a floating-point number.


This conversion can involve a loss of precision. For greater control over
 the manner in which the number is printed, see [`Printf`](Stdlib.Printf.html).




```
val float_of_string_opt : string -> float option
```


Convert the given string to a float. The string is read in decimal
 (by default) or in hexadecimal (marked by `0x` or `0X`).


The format of decimal floating-point numbers is
 `[-] dd.ddd (e|E) [+|-] dd`, where `d` stands for a decimal digit.


The format of hexadecimal floating-point numbers is
 `[-] 0(x|X) hh.hhh (p|P) [+|-] dd`, where `h` stands for an
 hexadecimal digit and `d` for a decimal digit.


In both cases, at least one of the integer and fractional parts must be
 given; the exponent part is optional.


The `_` (underscore) character can appear anywhere in the string
 and is ignored.


Depending on the execution platforms, other representations of
 floating-point numbers can be accepted, but should not be relied upon.


Return `None` if the given string is not a valid representation of a float.



* **Since** 4.05



```
val float_of_string : string -> float
```


Same as [`float_of_string_opt`](Stdlib.html#VALfloat_of_string_opt), but raise
 `Failure "float_of_string"` instead of returning `None`.



## Pair operations


```
val fst : 'a * 'b -> 'a
```


Return the first component of a pair.




```
val snd : 'a * 'b -> 'b
```


Return the second component of a pair.



## List operations

More list operations are provided in module [`List`](Stdlib.List.html).


```
val (@) : 'a list -> 'a list -> 'a list
```


`l0 @ l1` appends `l1` to `l0`. Same function as [`List.append`](List.html#VALappend).
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



* **Since** 5.1 this function is tail-recursive.


## Input/output

Note: all input/output functions can raise `Sys_error` when the system
 calls they invoke fail.


```
type in_channel 
```


The type of input channel.




```
type out_channel 
```


The type of output channel.




```
val stdin : [in_channel](Stdlib.html#TYPEin_channel)
```


The standard input for the process.




```
val stdout : [out_channel](Stdlib.html#TYPEout_channel)
```


The standard output for the process.




```
val stderr : [out_channel](Stdlib.html#TYPEout_channel)
```


The standard error output for the process.



### Output functions on standard output


```
val print_char : char -> unit
```


Print a character on standard output.




```
val print_string : string -> unit
```


Print a string on standard output.




```
val print_bytes : bytes -> unit
```


Print a byte sequence on standard output.



* **Since** 4.02



```
val print_int : int -> unit
```


Print an integer, in decimal, on standard output.




```
val print_float : float -> unit
```


Print a floating-point number, in decimal, on standard output.


The conversion of the number to a string uses [`string_of_float`](Stdlib.html#VALstring_of_float) and
 can involve a loss of precision.




```
val print_endline : string -> unit
```


Print a string, followed by a newline character, on
 standard output and flush standard output.




```
val print_newline : unit -> unit
```


Print a newline character on standard output, and flush
 standard output. This can be used to simulate line
 buffering of standard output.



### Output functions on standard error


```
val prerr_char : char -> unit
```


Print a character on standard error.




```
val prerr_string : string -> unit
```


Print a string on standard error.




```
val prerr_bytes : bytes -> unit
```


Print a byte sequence on standard error.



* **Since** 4.02



```
val prerr_int : int -> unit
```


Print an integer, in decimal, on standard error.




```
val prerr_float : float -> unit
```


Print a floating-point number, in decimal, on standard error.


The conversion of the number to a string uses [`string_of_float`](Stdlib.html#VALstring_of_float) and
 can involve a loss of precision.




```
val prerr_endline : string -> unit
```


Print a string, followed by a newline character on standard
 error and flush standard error.




```
val prerr_newline : unit -> unit
```


Print a newline character on standard error, and flush
 standard error.



### Input functions on standard input


```
val read_line : unit -> string
```


Flush standard output, then read characters from standard input
 until a newline character is encountered.


Return the string of all characters read, without the newline character
 at the end.



* **Raises** `End_of_file` if the end of the file is reached at the beginning of
 line.



```
val read_int_opt : unit -> int option
```


Flush standard output, then read one line from standard input
 and convert it to an integer.


Return `None` if the line read is not a valid representation of an integer.



* **Since** 4.05



```
val read_int : unit -> int
```


Same as [`read_int_opt`](Stdlib.html#VALread_int_opt), but raise `Failure "int_of_string"`
 instead of returning `None`.




```
val read_float_opt : unit -> float option
```


Flush standard output, then read one line from standard input
 and convert it to a floating-point number.


Return `None` if the line read is not a valid representation of a
 floating-point number.



* **Since** 4.05



```
val read_float : unit -> float
```


Same as [`read_float_opt`](Stdlib.html#VALread_float_opt), but raise `Failure "float_of_string"`
 instead of returning `None`.



### General output functions


```
type open_flag = 
```


| `|` | `Open_rdonly` | `(*` | open for reading. | `*)` |
| --- | --- | --- | --- | --- |
| `|` | `Open_wronly` | `(*` | open for writing. | `*)` |
| `|` | `Open_append` | `(*` | open for appending: always write at end of file. | `*)` |
| `|` | `Open_creat` | `(*` | create the file if it does not exist. | `*)` |
| `|` | `Open_trunc` | `(*` | empty the file if it already exists. | `*)` |
| `|` | `Open_excl` | `(*` | fail if Open\_creat and the file already exists. | `*)` |
| `|` | `Open_binary` | `(*` | open in binary mode (no conversion). | `*)` |
| `|` | `Open_text` | `(*` | open in text mode (may perform conversions). | `*)` |
| `|` | `Open_nonblock` | `(*` | open in non-blocking mode. | `*)` |



Opening modes for [`open_out_gen`](Stdlib.html#VALopen_out_gen) and
 [`open_in_gen`](Stdlib.html#VALopen_in_gen).




```
val open_out : string -> [out_channel](Stdlib.html#TYPEout_channel)
```


Open the named file for writing, and return a new output channel
 on that file, positioned at the beginning of the file. The
 file is truncated to zero length if it already exists. It
 is created if it does not already exists.




```
val open_out_bin : string -> [out_channel](Stdlib.html#TYPEout_channel)
```


Same as [`open_out`](Stdlib.html#VALopen_out), but the file is opened in binary mode,
 so that no translation takes place during writes. On operating
 systems that do not distinguish between text mode and binary
 mode, this function behaves like [`open_out`](Stdlib.html#VALopen_out).




```
val open_out_gen : [open_flag](Stdlib.html#TYPEopen_flag) list -> int -> string -> [out_channel](Stdlib.html#TYPEout_channel)
```


`open_out_gen mode perm filename` opens the named file for writing,
 as described above. The extra argument `mode`
 specifies the opening mode. The extra argument `perm` specifies
 the file permissions, in case the file must be created.
 [`open_out`](Stdlib.html#VALopen_out) and [`open_out_bin`](Stdlib.html#VALopen_out_bin) are special
 cases of this function.




```
val flush : [out_channel](Stdlib.html#TYPEout_channel) -> unit
```


Flush the buffer associated with the given output channel,
 performing all pending writes on that channel.
 Interactive programs must be careful about flushing standard
 output and standard error at the right time.




```
val flush_all : unit -> unit
```


Flush all open output channels; ignore errors.




```
val output_char : [out_channel](Stdlib.html#TYPEout_channel) -> char -> unit
```


Write the character on the given output channel.




```
val output_string : [out_channel](Stdlib.html#TYPEout_channel) -> string -> unit
```


Write the string on the given output channel.




```
val output_bytes : [out_channel](Stdlib.html#TYPEout_channel) -> bytes -> unit
```


Write the byte sequence on the given output channel.



* **Since** 4.02



```
val output : [out_channel](Stdlib.html#TYPEout_channel) -> bytes -> int -> int -> unit
```


`output oc buf pos len` writes `len` characters from byte sequence `buf`,
 starting at offset `pos`, to the given output channel `oc`.



* **Raises** `Invalid_argument` if `pos` and `len` do not
 designate a valid range of `buf`.



```
val output_substring : [out_channel](Stdlib.html#TYPEout_channel) -> string -> int -> int -> unit
```


Same as `output` but take a string as argument instead of
 a byte sequence.



* **Since** 4.02



```
val output_byte : [out_channel](Stdlib.html#TYPEout_channel) -> int -> unit
```


Write one 8-bit integer (as the single character with that code)
 on the given output channel. The given integer is taken modulo
 256.




```
val output_binary_int : [out_channel](Stdlib.html#TYPEout_channel) -> int -> unit
```


Write one integer in binary format (4 bytes, big-endian)
 on the given output channel.
 The given integer is taken modulo 232.
 The only reliable way to read it back is through the
 [`input_binary_int`](Stdlib.html#VALinput_binary_int) function. The format is compatible across
 all machines for a given version of OCaml.




```
val output_value : [out_channel](Stdlib.html#TYPEout_channel) -> 'a -> unit
```


Write the representation of a structured value of any type
 to a channel. Circularities and sharing inside the value
 are detected and preserved. The object can be read back,
 by the function [`input_value`](Stdlib.html#VALinput_value). See the description of module
 [`Marshal`](Stdlib.Marshal.html) for more information. [`output_value`](Stdlib.html#VALoutput_value) is equivalent
 to [`Marshal.to_channel`](Marshal.html#VALto_channel) with an empty list of flags.




```
val seek_out : [out_channel](Stdlib.html#TYPEout_channel) -> int -> unit
```


`seek_out chan pos` sets the current writing position to `pos`
 for channel `chan`. This works only for regular files. On
 files of other kinds (such as terminals, pipes and sockets),
 the behavior is unspecified.




```
val pos_out : [out_channel](Stdlib.html#TYPEout_channel) -> int
```


Return the current writing position for the given channel. Does
 not work on channels opened with the `Open_append` flag (returns
 unspecified results).
 For files opened in text mode under Windows, the returned position
 is approximate (owing to end-of-line conversion); in particular,
 saving the current position with `pos_out`, then going back to
 this position using `seek_out` will not work. For this
 programming idiom to work reliably and portably, the file must be
 opened in binary mode.




```
val out_channel_length : [out_channel](Stdlib.html#TYPEout_channel) -> int
```


Return the size (number of characters) of the regular file
 on which the given channel is opened. If the channel is opened
 on a file that is not a regular file, the result is meaningless.




```
val close_out : [out_channel](Stdlib.html#TYPEout_channel) -> unit
```


Close the given channel, flushing all buffered write operations.
 Output functions raise a `Sys_error` exception when they are
 applied to a closed output channel, except `close_out` and `flush`,
 which do nothing when applied to an already closed channel.
 Note that `close_out` may raise `Sys_error` if the operating
 system signals an error when flushing or closing.




```
val close_out_noerr : [out_channel](Stdlib.html#TYPEout_channel) -> unit
```


Same as `close_out`, but ignore all errors.




```
val set_binary_mode_out : [out_channel](Stdlib.html#TYPEout_channel) -> bool -> unit
```


`set_binary_mode_out oc true` sets the channel `oc` to binary
 mode: no translations take place during output.
 `set_binary_mode_out oc false` sets the channel `oc` to text
 mode: depending on the operating system, some translations
 may take place during output. For instance, under Windows,
 end-of-lines will be translated from `\n` to `\r\n`.
 This function has no effect under operating systems that
 do not distinguish between text mode and binary mode.



### General input functions


```
val open_in : string -> [in_channel](Stdlib.html#TYPEin_channel)
```


Open the named file for reading, and return a new input channel
 on that file, positioned at the beginning of the file.




```
val open_in_bin : string -> [in_channel](Stdlib.html#TYPEin_channel)
```


Same as [`open_in`](Stdlib.html#VALopen_in), but the file is opened in binary mode,
 so that no translation takes place during reads. On operating
 systems that do not distinguish between text mode and binary
 mode, this function behaves like [`open_in`](Stdlib.html#VALopen_in).




```
val open_in_gen : [open_flag](Stdlib.html#TYPEopen_flag) list -> int -> string -> [in_channel](Stdlib.html#TYPEin_channel)
```


`open_in_gen mode perm filename` opens the named file for reading,
 as described above. The extra arguments
 `mode` and `perm` specify the opening mode and file permissions.
 [`open_in`](Stdlib.html#VALopen_in) and [`open_in_bin`](Stdlib.html#VALopen_in_bin) are special
 cases of this function.




```
val input_char : [in_channel](Stdlib.html#TYPEin_channel) -> char
```


Read one character from the given input channel.



* **Raises** `End_of_file` if there are no more characters to read.



```
val input_line : [in_channel](Stdlib.html#TYPEin_channel) -> string
```


Read characters from the given input channel, until a
 newline character is encountered. Return the string of
 all characters read, without the newline character at the end.



* **Raises** `End_of_file` if the end of the file is reached
 at the beginning of line.



```
val input : [in_channel](Stdlib.html#TYPEin_channel) -> bytes -> int -> int -> int
```


`input ic buf pos len` reads up to `len` characters from
 the given channel `ic`, storing them in byte sequence `buf`, starting at
 character number `pos`.
 It returns the actual number of characters read, between 0 and
 `len` (inclusive).
 A return value of 0 means that the end of file was reached.
 A return value between 0 and `len` exclusive means that
 not all requested `len` characters were read, either because
 no more characters were available at that time, or because
 the implementation found it convenient to do a partial read;
 `input` must be called again to read the remaining characters,
 if desired. (See also [`really_input`](Stdlib.html#VALreally_input) for reading
 exactly `len` characters.)
 Exception `Invalid_argument "input"` is raised if `pos` and `len`
 do not designate a valid range of `buf`.




```
val really_input : [in_channel](Stdlib.html#TYPEin_channel) -> bytes -> int -> int -> unit
```


`really_input ic buf pos len` reads `len` characters from channel `ic`,
 storing them in byte sequence `buf`, starting at character number `pos`.



* **Raises**
	+ `End_of_file` if the end of file is reached before `len`
	 characters have been read.
	+ `Invalid_argument` if
	 `pos` and `len` do not designate a valid range of `buf`.



```
val really_input_string : [in_channel](Stdlib.html#TYPEin_channel) -> int -> string
```


`really_input_string ic len` reads `len` characters from channel `ic`
 and returns them in a new string.



* **Since** 4.02
* **Raises** `End_of_file` if the end of file is reached before `len`
 characters have been read.



```
val input_byte : [in_channel](Stdlib.html#TYPEin_channel) -> int
```


Same as [`input_char`](Stdlib.html#VALinput_char), but return the 8-bit integer representing
 the character.



* **Raises** `End_of_file` if the end of file was reached.



```
val input_binary_int : [in_channel](Stdlib.html#TYPEin_channel) -> int
```


Read an integer encoded in binary format (4 bytes, big-endian)
 from the given input channel. See [`output_binary_int`](Stdlib.html#VALoutput_binary_int).



* **Raises** `End_of_file` if the end of file was reached while reading the
 integer.



```
val input_value : [in_channel](Stdlib.html#TYPEin_channel) -> 'a
```


Read the representation of a structured value, as produced
 by [`output_value`](Stdlib.html#VALoutput_value), and return the corresponding value.
 This function is identical to [`Marshal.from_channel`](Marshal.html#VALfrom_channel);
 see the description of module [`Marshal`](Stdlib.Marshal.html) for more information,
 in particular concerning the lack of type safety.




```
val seek_in : [in_channel](Stdlib.html#TYPEin_channel) -> int -> unit
```


`seek_in chan pos` sets the current reading position to `pos`
 for channel `chan`. This works only for regular files. On
 files of other kinds, the behavior is unspecified.




```
val pos_in : [in_channel](Stdlib.html#TYPEin_channel) -> int
```


Return the current reading position for the given channel. For
 files opened in text mode under Windows, the returned position is
 approximate (owing to end-of-line conversion); in particular,
 saving the current position with `pos_in`, then going back to this
 position using `seek_in` will not work. For this programming
 idiom to work reliably and portably, the file must be opened in
 binary mode.




```
val in_channel_length : [in_channel](Stdlib.html#TYPEin_channel) -> int
```


Return the size (number of characters) of the regular file
 on which the given channel is opened. If the channel is opened
 on a file that is not a regular file, the result is meaningless.
 The returned size does not take into account the end-of-line
 translations that can be performed when reading from a channel
 opened in text mode.




```
val close_in : [in_channel](Stdlib.html#TYPEin_channel) -> unit
```


Close the given channel. Input functions raise a `Sys_error`
 exception when they are applied to a closed input channel,
 except `close_in`, which does nothing when applied to an already
 closed channel.




```
val close_in_noerr : [in_channel](Stdlib.html#TYPEin_channel) -> unit
```


Same as `close_in`, but ignore all errors.




```
val set_binary_mode_in : [in_channel](Stdlib.html#TYPEin_channel) -> bool -> unit
```


`set_binary_mode_in ic true` sets the channel `ic` to binary
 mode: no translations take place during input.
 `set_binary_mode_out ic false` sets the channel `ic` to text
 mode: depending on the operating system, some translations
 may take place during input. For instance, under Windows,
 end-of-lines will be translated from `\r\n` to `\n`.
 This function has no effect under operating systems that
 do not distinguish between text mode and binary mode.



### Operations on large files


```
module [LargeFile](Stdlib.LargeFile.html): sig [..](Stdlib.LargeFile.html) end
```

Operations on large files.


## References


```
type `'a` ref = {
```


|  | `mutable contents : `'a`;` |
| --- | --- |

`}`

The type of references (mutable indirection cells) containing
 a value of type `'a`.




```
val ref : 'a -> 'a [ref](Stdlib.html#TYPEref)
```


Return a fresh reference containing the given value.




```
val (!) : 'a [ref](Stdlib.html#TYPEref) -> 'a
```


`!r` returns the current contents of reference `r`.
 Equivalent to `fun r -> r.contents`.
 Unary operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val (:=) : 'a [ref](Stdlib.html#TYPEref) -> 'a -> unit
```


`r := a` stores the value of `a` in reference `r`.
 Equivalent to `fun r v -> r.contents <- v`.
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.




```
val incr : int [ref](Stdlib.html#TYPEref) -> unit
```


Increment the integer contained in the given reference.
 Equivalent to `fun r -> r := succ !r`.




```
val decr : int [ref](Stdlib.html#TYPEref) -> unit
```


Decrement the integer contained in the given reference.
 Equivalent to `fun r -> r := pred !r`.



## Result type


```
type `('a, 'b)` result = 
```


| `|` | `Ok of `'a`` |
| --- | --- |
| `|` | `Error of `'b`` |


* **Since** 4.03


## Operations on format strings

Format strings are character strings with special lexical conventions
 that defines the functionality of formatted input/output functions. Format
 strings are used to read data with formatted input functions from module
 [`Scanf`](Stdlib.Scanf.html) and to print data with formatted output functions from modules
 [`Printf`](Stdlib.Printf.html) and [`Format`](Stdlib.Format.html).

Format strings are made of three kinds of entities:

* *conversions specifications*, introduced by the special character `'%'`
 followed by one or more characters specifying what kind of argument to
 read or print,
* *formatting indications*, introduced by the special character `'@'`
 followed by one or more characters specifying how to read or print the
 argument,
* *plain characters* that are regular characters with usual lexical
 conventions. Plain characters specify string literals to be read in the
 input or printed in the output.

There is an additional lexical rule to escape the special characters `'%'`
 and `'@'` in format strings: if a special character follows a `'%'`
 character, it is treated as a plain character. In other words, `"%%"` is
 considered as a plain `'%'` and `"%@"` as a plain `'@'`.

For more information about conversion specifications and formatting
 indications available, read the documentation of modules [`Scanf`](Stdlib.Scanf.html),
 [`Printf`](Stdlib.Printf.html) and [`Format`](Stdlib.Format.html).

Format strings have a general and highly polymorphic type
 `('a, 'b, 'c, 'd, 'e, 'f) format6`.
 The two simplified types, `format` and `format4` below are
 included for backward compatibility with earlier releases of
 OCaml.

The meaning of format string type parameters is as follows:

* `'a` is the type of the parameters of the format for formatted output
 functions (`printf`-style functions);
 `'a` is the type of the values read by the format for formatted input
 functions (`scanf`-style functions).
* `'b` is the type of input source for formatted input functions and the
 type of output target for formatted output functions.
 For `printf`-style functions from module [`Printf`](Stdlib.Printf.html), `'b` is typically
 `out_channel`;
 for `printf`-style functions from module [`Format`](Stdlib.Format.html), `'b` is typically
 [`Format.formatter`](Format.html#TYPEformatter);
 for `scanf`-style functions from module [`Scanf`](Stdlib.Scanf.html), `'b` is typically
 [`Scanf.Scanning.in_channel`](Scanf.Scanning.html#TYPEin_channel).

Type argument `'b` is also the type of the first argument given to
 user's defined printing functions for `%a` and `%t` conversions,
 and user's defined reading functions for `%r` conversion.

* `'c` is the type of the result of the `%a` and `%t` printing
 functions, and also the type of the argument transmitted to the
 first argument of `kprintf`-style functions or to the
 `kscanf`-style functions.
* `'d` is the type of parameters for the `scanf`-style functions.
* `'e` is the type of the receiver function for the `scanf`-style functions.
* `'f` is the final result type of a formatted input/output function
 invocation: for the `printf`-style functions, it is typically `unit`;
 for the `scanf`-style functions, it is typically the result type of the
 receiver function.


```
type `('a, 'b, 'c, 'd, 'e, 'f)` format6 = ('a, 'b, 'c, 'd, 'e, 'f) [CamlinternalFormatBasics.format6](CamlinternalFormatBasics.html#TYPEformat6) 
```

```
type `('a, 'b, 'c, 'd)` format4 = ('a, 'b, 'c, 'c, 'c, 'd) [format6](Stdlib.html#TYPEformat6) 
```

```
type `('a, 'b, 'c)` format = ('a, 'b, 'c, 'c) [format4](Stdlib.html#TYPEformat4) 
```

```
val string_of_format : ('a, 'b, 'c, 'd, 'e, 'f) [format6](Stdlib.html#TYPEformat6) -> string
```


Converts a format string into a string.




```
val format_of_string : ('a, 'b, 'c, 'd, 'e, 'f) [format6](Stdlib.html#TYPEformat6) ->  
       ('a, 'b, 'c, 'd, 'e, 'f) [format6](Stdlib.html#TYPEformat6)
```


`format_of_string s` returns a format string read from the string
 literal `s`.
 Note: `format_of_string` can not convert a string argument that is not a
 literal. If you need this functionality, use the more general
 [`Scanf.format_from_string`](Scanf.html#VALformat_from_string) function.




```
val (^^) : ('a, 'b, 'c, 'd, 'e, 'f) [format6](Stdlib.html#TYPEformat6) ->  
       ('f, 'b, 'c, 'e, 'g, 'h) [format6](Stdlib.html#TYPEformat6) ->  
       ('a, 'b, 'c, 'd, 'g, 'h) [format6](Stdlib.html#TYPEformat6)
```


`f1 ^^ f2` catenates format strings `f1` and `f2`. The result is a
 format string that behaves as the concatenation of format strings `f1` and
 `f2`: in case of formatted output, it accepts arguments from `f1`, then
 arguments from `f2`; in case of formatted input, it returns results from
 `f1`, then results from `f2`.
 Right-associative operator, see [`Ocaml_operators`](Ocaml_operators.html) for more information.



## Program termination


```
val exit : int -> 'a
```


Terminate the process, returning the given status code to the operating
 system: usually 0 to indicate no errors, and a small positive integer to
 indicate failure. All open output channels are flushed with `flush_all`.
 The callbacks registered with [`Domain.at_exit`](Domain.html#VALat_exit) are called followed by
 those registered with [`at_exit`](Stdlib.html#VALat_exit).


An implicit `exit 0` is performed each time a program terminates normally.
 An implicit `exit 2` is performed if the program terminates early because
 of an uncaught exception.




```
val at_exit : (unit -> unit) -> unit
```


Register the given function to be called at program termination
 time. The functions registered with `at_exit` will be called when
 the program does any of the following:


* executes [`exit`](Stdlib.html#VALexit)
* terminates, either normally or because of an uncaught
 exception
* executes the C function `caml_shutdown`.
 The functions are called in 'last in, first out' order: the
 function most recently added with `at_exit` is called first.



## Standard library modules


```
module [Arg](Stdlib.Arg.html): [Arg](Arg.html)
```

```
module [Array](Stdlib.Array.html): [Array](Array.html)
```

```
module [ArrayLabels](Stdlib.ArrayLabels.html): [ArrayLabels](ArrayLabels.html)
```

```
module [Atomic](Stdlib.Atomic.html): [Atomic](Atomic.html)
```

```
module [Bigarray](Stdlib.Bigarray.html): [Bigarray](Bigarray.html)
```

```
module [Bool](Stdlib.Bool.html): [Bool](Bool.html)
```

```
module [Buffer](Stdlib.Buffer.html): [Buffer](Buffer.html)
```

```
module [Bytes](Stdlib.Bytes.html): [Bytes](Bytes.html)
```

```
module [BytesLabels](Stdlib.BytesLabels.html): [BytesLabels](BytesLabels.html)
```

```
module [Callback](Stdlib.Callback.html): [Callback](Callback.html)
```

```
module [Char](Stdlib.Char.html): [Char](Char.html)
```

```
module [Complex](Stdlib.Complex.html): [Complex](Complex.html)
```

```
module [Condition](Stdlib.Condition.html): [Condition](Condition.html)
```

```
module [Digest](Stdlib.Digest.html): [Digest](Digest.html)
```

```
module [Domain](Stdlib.Domain.html): [Domain](Domain.html)
```


```
module [Effect](Stdlib.Effect.html): [Effect](Effect.html)
```


```
module [Either](Stdlib.Either.html): [Either](Either.html)
```

```
module [Ephemeron](Stdlib.Ephemeron.html): [Ephemeron](Ephemeron.html)
```

```
module [Filename](Stdlib.Filename.html): [Filename](Filename.html)
```

```
module [Float](Stdlib.Float.html): [Float](Float.html)
```

```
module [Format](Stdlib.Format.html): [Format](Format.html)
```

```
module [Fun](Stdlib.Fun.html): [Fun](Fun.html)
```

```
module [Gc](Stdlib.Gc.html): [Gc](Gc.html)
```

```
module [Hashtbl](Stdlib.Hashtbl.html): [Hashtbl](Hashtbl.html)
```

```
module [In_channel](Stdlib.In_channel.html): [In_channel](In_channel.html)
```

```
module [Int](Stdlib.Int.html): [Int](Int.html)
```

```
module [Int32](Stdlib.Int32.html): [Int32](Int32.html)
```

```
module [Int64](Stdlib.Int64.html): [Int64](Int64.html)
```

```
module [Lazy](Stdlib.Lazy.html): [Lazy](Lazy.html)
```

```
module [Lexing](Stdlib.Lexing.html): [Lexing](Lexing.html)
```

```
module [List](Stdlib.List.html): [List](List.html)
```

```
module [ListLabels](Stdlib.ListLabels.html): [ListLabels](ListLabels.html)
```

```
module [Map](Stdlib.Map.html): [Map](Map.html)
```

```
module [Marshal](Stdlib.Marshal.html): [Marshal](Marshal.html)
```

```
module [MoreLabels](Stdlib.MoreLabels.html): [MoreLabels](MoreLabels.html)
```

```
module [Mutex](Stdlib.Mutex.html): [Mutex](Mutex.html)
```

```
module [Nativeint](Stdlib.Nativeint.html): [Nativeint](Nativeint.html)
```

```
module [Obj](Stdlib.Obj.html): [Obj](Obj.html)
```

```
module [Oo](Stdlib.Oo.html): [Oo](Oo.html)
```

```
module [Option](Stdlib.Option.html): [Option](Option.html)
```

```
module [Out_channel](Stdlib.Out_channel.html): [Out_channel](Out_channel.html)
```

```
module [Parsing](Stdlib.Parsing.html): [Parsing](Parsing.html)
```

```
module [Printexc](Stdlib.Printexc.html): [Printexc](Printexc.html)
```

```
module [Printf](Stdlib.Printf.html): [Printf](Printf.html)
```

```
module [Queue](Stdlib.Queue.html): [Queue](Queue.html)
```

```
module [Random](Stdlib.Random.html): [Random](Random.html)
```

```
module [Result](Stdlib.Result.html): [Result](Result.html)
```

```
module [Scanf](Stdlib.Scanf.html): [Scanf](Scanf.html)
```

```
module [Semaphore](Stdlib.Semaphore.html): [Semaphore](Semaphore.html)
```

```
module [Seq](Stdlib.Seq.html): [Seq](Seq.html)
```

```
module [Set](Stdlib.Set.html): [Set](Set.html)
```

```
module [Stack](Stdlib.Stack.html): [Stack](Stack.html)
```

```
module [StdLabels](Stdlib.StdLabels.html): [StdLabels](StdLabels.html)
```

```
module [String](Stdlib.String.html): [String](String.html)
```

```
module [StringLabels](Stdlib.StringLabels.html): [StringLabels](StringLabels.html)
```

```
module [Sys](Stdlib.Sys.html): [Sys](Sys.html)
```

```
module [Type](Stdlib.Type.html): [Type](Type.html)
```

```
module [Uchar](Stdlib.Uchar.html): [Uchar](Uchar.html)
```

```
module [Unit](Stdlib.Unit.html): [Unit](Unit.html)
```

```
module [Weak](Stdlib.Weak.html): [Weak](Weak.html)
```
