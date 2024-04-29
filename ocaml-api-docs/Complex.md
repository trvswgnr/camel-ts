# Module [Complex](type_Complex.html)


```
module Complex: sig [..](Complex.html) end
```


Complex numbers.


This module provides arithmetic operations on complex numbers.
 Complex numbers are represented by their real and imaginary parts
 (cartesian representation). Each part is represented by a
 double-precision floating-point number (type `float`).





---


```
type t = {
```


|  | `re : `float`;` |
| --- | --- |
|  | `im : `float`;` |

`}`

The type of complex numbers. `re` is the real part and `im` the
 imaginary part.




```
val zero : [t](Complex.html#TYPEt)
```


The complex number `0`.




```
val one : [t](Complex.html#TYPEt)
```


The complex number `1`.




```
val i : [t](Complex.html#TYPEt)
```


The complex number `i`.




```
val neg : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Unary negation.




```
val conj : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Conjugate: given the complex `x + i.y`, returns `x - i.y`.




```
val add : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Addition




```
val sub : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Subtraction




```
val mul : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Multiplication




```
val inv : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Multiplicative inverse (`1/z`).




```
val div : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Division




```
val sqrt : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Square root. The result `x + i.y` is such that `x > 0` or
 `x = 0` and `y >= 0`.
 This function has a discontinuity along the negative real axis.




```
val norm2 : [t](Complex.html#TYPEt) -> float
```


Norm squared: given `x + i.y`, returns `x^2 + y^2`.




```
val norm : [t](Complex.html#TYPEt) -> float
```


Norm: given `x + i.y`, returns `sqrt(x^2 + y^2)`.




```
val arg : [t](Complex.html#TYPEt) -> float
```


Argument. The argument of a complex number is the angle
 in the complex plane between the positive real axis and a line
 passing through zero and the number. This angle ranges from
 `-pi` to `pi`. This function has a discontinuity along the
 negative real axis.




```
val polar : float -> float -> [t](Complex.html#TYPEt)
```


`polar norm arg` returns the complex having norm `norm`
 and argument `arg`.




```
val exp : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Exponentiation. `exp z` returns `e` to the `z` power.




```
val log : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Natural logarithm (in base `e`).




```
val pow : [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt) -> [t](Complex.html#TYPEt)
```


Power function. `pow z1 z2` returns `z1` to the `z2` power.



