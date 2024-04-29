# Module [Bigarray](type_Bigarray.html)


```
module Bigarray: sig [..](Bigarray.html) end
```


Large, multi-dimensional, numerical arrays.


This module implements multi-dimensional arrays of integers and
 floating-point numbers, thereafter referred to as 'Bigarrays',
 to distinguish them from the standard OCaml arrays described in
 [`Array`](Array.html).


The implementation allows efficient sharing of large numerical
 arrays between OCaml code and C or Fortran numerical libraries.


The main differences between 'Bigarrays' and standard OCaml
 arrays are as follows:


* Bigarrays are not limited in size, unlike OCaml arrays.
 (Normal float arrays are limited to 2,097,151 elements on a 32-bit
 platform, and normal arrays of other types to 4,194,303 elements.)
* Bigarrays are multi-dimensional. Any number of dimensions
 between 0 and 16 is supported. In contrast, OCaml arrays
 are mono-dimensional and require encoding multi-dimensional
 arrays as arrays of arrays.
* Bigarrays can only contain integers and floating-point numbers,
 while OCaml arrays can contain arbitrary OCaml data types.
* Bigarrays provide more space-efficient storage of
 integer and floating-point elements than normal OCaml arrays, in
 particular because they support 'small' types such as
 single-precision floats and 8 and 16-bit integers, in addition to
 the standard OCaml types of double-precision floats and 32 and
 64-bit integers.
* The memory layout of Bigarrays is entirely compatible with that
 of arrays in C and Fortran, allowing large arrays to be passed
 back and forth between OCaml code and C / Fortran code with no
 data copying at all.
* Bigarrays support interesting high-level operations that normal
 arrays do not provide efficiently, such as extracting sub-arrays
 and 'slicing' a multi-dimensional array along certain dimensions,
 all without any copying.


Users of this module are encouraged to do `open Bigarray` in their
 source, then refer to array types and operations via short dot
 notation, e.g. `Array1.t` or `Array2.sub`.


Bigarrays support all the OCaml ad-hoc polymorphic operations:


* comparisons (`=`, `<>`, `<=`, etc, as well as [`compare`](Stdlib.html#VALcompare));
* hashing (module `Hash`);
* and structured input-output (the functions from the
 [`Marshal`](Marshal.html) module, as well as [`output_value`](Stdlib.html#VALoutput_value)
 and [`input_value`](Stdlib.html#VALinput_value)).





---

## Element kinds

Bigarrays can contain elements of the following kinds:

* IEEE single precision (32 bits) floating-point numbers
 ([`Bigarray.float32_elt`](Bigarray.html#TYPEfloat32_elt)),
* IEEE double precision (64 bits) floating-point numbers
 ([`Bigarray.float64_elt`](Bigarray.html#TYPEfloat64_elt)),
* IEEE single precision (2 \* 32 bits) floating-point complex numbers
 ([`Bigarray.complex32_elt`](Bigarray.html#TYPEcomplex32_elt)),
* IEEE double precision (2 \* 64 bits) floating-point complex numbers
 ([`Bigarray.complex64_elt`](Bigarray.html#TYPEcomplex64_elt)),
* 8-bit integers (signed or unsigned)
 ([`Bigarray.int8_signed_elt`](Bigarray.html#TYPEint8_signed_elt) or [`Bigarray.int8_unsigned_elt`](Bigarray.html#TYPEint8_unsigned_elt)),
* 16-bit integers (signed or unsigned)
 ([`Bigarray.int16_signed_elt`](Bigarray.html#TYPEint16_signed_elt) or [`Bigarray.int16_unsigned_elt`](Bigarray.html#TYPEint16_unsigned_elt)),
* OCaml integers (signed, 31 bits on 32-bit architectures,
 63 bits on 64-bit architectures) ([`Bigarray.int_elt`](Bigarray.html#TYPEint_elt)),
* 32-bit signed integers ([`Bigarray.int32_elt`](Bigarray.html#TYPEint32_elt)),
* 64-bit signed integers ([`Bigarray.int64_elt`](Bigarray.html#TYPEint64_elt)),
* platform-native signed integers (32 bits on 32-bit architectures,
 64 bits on 64-bit architectures) ([`Bigarray.nativeint_elt`](Bigarray.html#TYPEnativeint_elt)).

Each element kind is represented at the type level by one of the
 `*_elt` types defined below (defined with a single constructor instead
 of abstract types for technical injectivity reasons).


```
type float32_elt = 
```


| `|` | `Float32_elt` |
| --- | --- |


```
type float64_elt = 
```


| `|` | `Float64_elt` |
| --- | --- |


```
type int8_signed_elt = 
```


| `|` | `Int8_signed_elt` |
| --- | --- |


```
type int8_unsigned_elt = 
```


| `|` | `Int8_unsigned_elt` |
| --- | --- |


```
type int16_signed_elt = 
```


| `|` | `Int16_signed_elt` |
| --- | --- |


```
type int16_unsigned_elt = 
```


| `|` | `Int16_unsigned_elt` |
| --- | --- |


```
type int32_elt = 
```


| `|` | `Int32_elt` |
| --- | --- |


```
type int64_elt = 
```


| `|` | `Int64_elt` |
| --- | --- |


```
type int_elt = 
```


| `|` | `Int_elt` |
| --- | --- |


```
type nativeint_elt = 
```


| `|` | `Nativeint_elt` |
| --- | --- |


```
type complex32_elt = 
```


| `|` | `Complex32_elt` |
| --- | --- |


```
type complex64_elt = 
```


| `|` | `Complex64_elt` |
| --- | --- |


```
type `('a, 'b)` kind = 
```


| `|` | `Float32 : `(float, [float32_elt](Bigarray.html#TYPEfloat32_elt)) [kind](Bigarray.html#TYPEkind)`` |
| --- | --- |
| `|` | `Float64 : `(float, [float64_elt](Bigarray.html#TYPEfloat64_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Int8_signed : `(int, [int8_signed_elt](Bigarray.html#TYPEint8_signed_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Int8_unsigned : `(int, [int8_unsigned_elt](Bigarray.html#TYPEint8_unsigned_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Int16_signed : `(int, [int16_signed_elt](Bigarray.html#TYPEint16_signed_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Int16_unsigned : `(int, [int16_unsigned_elt](Bigarray.html#TYPEint16_unsigned_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Int32 : `(int32, [int32_elt](Bigarray.html#TYPEint32_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Int64 : `(int64, [int64_elt](Bigarray.html#TYPEint64_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Int : `(int, [int_elt](Bigarray.html#TYPEint_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Nativeint : `(nativeint, [nativeint_elt](Bigarray.html#TYPEnativeint_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Complex32 : `([Complex.t](Complex.html#TYPEt), [complex32_elt](Bigarray.html#TYPEcomplex32_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Complex64 : `([Complex.t](Complex.html#TYPEt), [complex64_elt](Bigarray.html#TYPEcomplex64_elt)) [kind](Bigarray.html#TYPEkind)`` |
| `|` | `Char : `(char, [int8_unsigned_elt](Bigarray.html#TYPEint8_unsigned_elt)) [kind](Bigarray.html#TYPEkind)`` |



To each element kind is associated an OCaml type, which is
 the type of OCaml values that can be stored in the Bigarray
 or read back from it. This type is not necessarily the same
 as the type of the array elements proper: for instance,
 a Bigarray whose elements are of kind `float32_elt` contains
 32-bit single precision floats, but reading or writing one of
 its elements from OCaml uses the OCaml type `float`, which is
 64-bit double precision floats.


The GADT type `('a, 'b) kind` captures this association
 of an OCaml type `'a` for values read or written in the Bigarray,
 and of an element kind `'b` which represents the actual contents
 of the Bigarray. Its constructors list all possible associations
 of OCaml types with element kinds, and are re-exported below for
 backward-compatibility reasons.


Using a generalized algebraic datatype (GADT) here allows writing
 well-typed polymorphic functions whose return type depend on the
 argument type, such as:



```
  let zero : type a b. (a, b) kind -> a = function
    | Float32 -> 0.0 | Complex32 -> Complex.zero
    | Float64 -> 0.0 | Complex64 -> Complex.zero
    | Int8_signed -> 0 | Int8_unsigned -> 0
    | Int16_signed -> 0 | Int16_unsigned -> 0
    | Int32 -> 0l | Int64 -> 0L
    | Int -> 0 | Nativeint -> 0n
    | Char -> '\000'

```


```
val float32 : (float, [float32_elt](Bigarray.html#TYPEfloat32_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val float64 : (float, [float64_elt](Bigarray.html#TYPEfloat64_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val complex32 : ([Complex.t](Complex.html#TYPEt), [complex32_elt](Bigarray.html#TYPEcomplex32_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val complex64 : ([Complex.t](Complex.html#TYPEt), [complex64_elt](Bigarray.html#TYPEcomplex64_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val int8_signed : (int, [int8_signed_elt](Bigarray.html#TYPEint8_signed_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val int8_unsigned : (int, [int8_unsigned_elt](Bigarray.html#TYPEint8_unsigned_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val int16_signed : (int, [int16_signed_elt](Bigarray.html#TYPEint16_signed_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val int16_unsigned : (int, [int16_unsigned_elt](Bigarray.html#TYPEint16_unsigned_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val int : (int, [int_elt](Bigarray.html#TYPEint_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val int32 : (int32, [int32_elt](Bigarray.html#TYPEint32_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val int64 : (int64, [int64_elt](Bigarray.html#TYPEint64_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val nativeint : (nativeint, [nativeint_elt](Bigarray.html#TYPEnativeint_elt)) [kind](Bigarray.html#TYPEkind)
```


See [`Bigarray.char`](Bigarray.html#VALchar).




```
val char : (char, [int8_unsigned_elt](Bigarray.html#TYPEint8_unsigned_elt)) [kind](Bigarray.html#TYPEkind)
```


As shown by the types of the values above,
 Bigarrays of kind `float32_elt` and `float64_elt` are
 accessed using the OCaml type `float`. Bigarrays of complex kinds
 `complex32_elt`, `complex64_elt` are accessed with the OCaml type
 [`Complex.t`](Complex.html#TYPEt). Bigarrays of
 integer kinds are accessed using the smallest OCaml integer
 type large enough to represent the array elements:
 `int` for 8- and 16-bit integer Bigarrays, as well as OCaml-integer
 Bigarrays; `int32` for 32-bit integer Bigarrays; `int64`
 for 64-bit integer Bigarrays; and `nativeint` for
 platform-native integer Bigarrays. Finally, Bigarrays of
 kind `int8_unsigned_elt` can also be accessed as arrays of
 characters instead of arrays of small integers, by using
 the kind value `char` instead of `int8_unsigned`.




```
val kind_size_in_bytes : ('a, 'b) [kind](Bigarray.html#TYPEkind) -> int
```


`kind_size_in_bytes k` is the number of bytes used to store
 an element of type `k`.



* **Since** 4.03


## Array layouts


```
type c_layout = 
```


| `|` | `C_layout_typ` |
| --- | --- |



See [`Bigarray.fortran_layout`](Bigarray.html#TYPEfortran_layout).




```
type fortran_layout = 
```


| `|` | `Fortran_layout_typ` |
| --- | --- |



To facilitate interoperability with existing C and Fortran code,
 this library supports two different memory layouts for Bigarrays,
 one compatible with the C conventions,
 the other compatible with the Fortran conventions.


In the C-style layout, array indices start at 0, and
 multi-dimensional arrays are laid out in row-major format.
 That is, for a two-dimensional array, all elements of
 row 0 are contiguous in memory, followed by all elements of
 row 1, etc. In other terms, the array elements at `(x,y)`
 and `(x, y+1)` are adjacent in memory.


In the Fortran-style layout, array indices start at 1, and
 multi-dimensional arrays are laid out in column-major format.
 That is, for a two-dimensional array, all elements of
 column 0 are contiguous in memory, followed by all elements of
 column 1, etc. In other terms, the array elements at `(x,y)`
 and `(x+1, y)` are adjacent in memory.


Each layout style is identified at the type level by the
 phantom types [`Bigarray.c_layout`](Bigarray.html#TYPEc_layout) and [`Bigarray.fortran_layout`](Bigarray.html#TYPEfortran_layout)
 respectively.



### Supported layouts

The GADT type `'a layout` represents one of the two supported
 memory layouts: C-style or Fortran-style. Its constructors are
 re-exported as values below for backward-compatibility reasons.


```
type `'a` layout = 
```


| `|` | `C_layout : `[c_layout](Bigarray.html#TYPEc_layout) [layout](Bigarray.html#TYPElayout)`` |
| --- | --- |
| `|` | `Fortran_layout : `[fortran_layout](Bigarray.html#TYPEfortran_layout) [layout](Bigarray.html#TYPElayout)`` |


```
val c_layout : [c_layout](Bigarray.html#TYPEc_layout) [layout](Bigarray.html#TYPElayout)
```

```
val fortran_layout : [fortran_layout](Bigarray.html#TYPEfortran_layout) [layout](Bigarray.html#TYPElayout)
```
## Generic arrays (of arbitrarily many dimensions)


```
module [Genarray](Bigarray.Genarray.html): sig [..](Bigarray.Genarray.html) end
```
## Zero-dimensional arrays


```
module [Array0](Bigarray.Array0.html): sig [..](Bigarray.Array0.html) end
```

Zero-dimensional arrays.


## One-dimensional arrays


```
module [Array1](Bigarray.Array1.html): sig [..](Bigarray.Array1.html) end
```

One-dimensional arrays.


## Two-dimensional arrays


```
module [Array2](Bigarray.Array2.html): sig [..](Bigarray.Array2.html) end
```

Two-dimensional arrays.


## Three-dimensional arrays


```
module [Array3](Bigarray.Array3.html): sig [..](Bigarray.Array3.html) end
```

Three-dimensional arrays.


## Coercions between generic Bigarrays and fixed-dimension Bigarrays


```
val genarray_of_array0 : ('a, 'b, 'c) [Array0.t](Bigarray.Array0.html#TYPEt) -> ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt)
```


Return the generic Bigarray corresponding to the given zero-dimensional
 Bigarray.



* **Since** 4.05



```
val genarray_of_array1 : ('a, 'b, 'c) [Array1.t](Bigarray.Array1.html#TYPEt) -> ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt)
```


Return the generic Bigarray corresponding to the given one-dimensional
 Bigarray.




```
val genarray_of_array2 : ('a, 'b, 'c) [Array2.t](Bigarray.Array2.html#TYPEt) -> ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt)
```


Return the generic Bigarray corresponding to the given two-dimensional
 Bigarray.




```
val genarray_of_array3 : ('a, 'b, 'c) [Array3.t](Bigarray.Array3.html#TYPEt) -> ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt)
```


Return the generic Bigarray corresponding to the given three-dimensional
 Bigarray.




```
val array0_of_genarray : ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt) -> ('a, 'b, 'c) [Array0.t](Bigarray.Array0.html#TYPEt)
```


Return the zero-dimensional Bigarray corresponding to the given
 generic Bigarray.



* **Since** 4.05
* **Raises** `Invalid_argument` if the generic Bigarray
 does not have exactly zero dimension.



```
val array1_of_genarray : ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt) -> ('a, 'b, 'c) [Array1.t](Bigarray.Array1.html#TYPEt)
```


Return the one-dimensional Bigarray corresponding to the given
 generic Bigarray.



* **Raises** `Invalid_argument` if the generic Bigarray
 does not have exactly one dimension.



```
val array2_of_genarray : ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt) -> ('a, 'b, 'c) [Array2.t](Bigarray.Array2.html#TYPEt)
```


Return the two-dimensional Bigarray corresponding to the given
 generic Bigarray.



* **Raises** `Invalid_argument` if the generic Bigarray
 does not have exactly two dimensions.



```
val array3_of_genarray : ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt) -> ('a, 'b, 'c) [Array3.t](Bigarray.Array3.html#TYPEt)
```


Return the three-dimensional Bigarray corresponding to the given
 generic Bigarray.



* **Raises** `Invalid_argument` if the generic Bigarray
 does not have exactly three dimensions.


## Re-shaping Bigarrays


```
val reshape : ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt) ->  
       int array -> ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt)
```


`reshape b [|d1;...;dN|]` converts the Bigarray `b` to a
 `N`-dimensional array of dimensions `d1`...`dN`. The returned
 array and the original array `b` share their data
 and have the same layout. For instance, assuming that `b`
 is a one-dimensional array of dimension 12, `reshape b [|3;4|]`
 returns a two-dimensional array `b'` of dimensions 3 and 4.
 If `b` has C layout, the element `(x,y)` of `b'` corresponds
 to the element `x * 3 + y` of `b`. If `b` has Fortran layout,
 the element `(x,y)` of `b'` corresponds to the element
 `x + (y - 1) * 4` of `b`.
 The returned Bigarray must have exactly the same number of
 elements as the original Bigarray `b`. That is, the product
 of the dimensions of `b` must be equal to `i1 * ... * iN`.
 Otherwise, `Invalid_argument` is raised.




```
val reshape_0 : ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt) -> ('a, 'b, 'c) [Array0.t](Bigarray.Array0.html#TYPEt)
```


Specialized version of [`Bigarray.reshape`](Bigarray.html#VALreshape) for reshaping to
 zero-dimensional arrays.



* **Since** 4.05



```
val reshape_1 : ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt) -> int -> ('a, 'b, 'c) [Array1.t](Bigarray.Array1.html#TYPEt)
```


Specialized version of [`Bigarray.reshape`](Bigarray.html#VALreshape) for reshaping to
 one-dimensional arrays.




```
val reshape_2 : ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt) ->  
       int -> int -> ('a, 'b, 'c) [Array2.t](Bigarray.Array2.html#TYPEt)
```


Specialized version of [`Bigarray.reshape`](Bigarray.html#VALreshape) for reshaping to
 two-dimensional arrays.




```
val reshape_3 : ('a, 'b, 'c) [Genarray.t](Bigarray.Genarray.html#TYPEt) ->  
       int -> int -> int -> ('a, 'b, 'c) [Array3.t](Bigarray.Array3.html#TYPEt)
```


Specialized version of [`Bigarray.reshape`](Bigarray.html#VALreshape) for reshaping to
 three-dimensional arrays.



## Bigarrays and concurrency safety

Care must be taken when concurrently accessing bigarrays from multiple
 domains: accessing a bigarray will never crash a program, but unsynchronized
 accesses might yield surprising (non-sequentially-consistent) results.

### Atomicity

Every bigarray operation that accesses more than one array element is not
 atomic. This includes slicing, bliting, and filling bigarrays.

For example, consider the following program:


```
open Bigarray
let size = 100_000_000
let a = Array1.init Int C_layout size (fun _ -> 1)
let update f a () =
  for i = 0 to size - 1 do a.{i} <- f a.{i} done
let d1 = Domain.spawn (update (fun x -> x + 1) a)
let d2 = Domain.spawn (update (fun x -> 2 * x + 1) a)
let () = Domain.join d1; Domain.join d2

```
After executing this code, each field of the bigarray `a` is either `2`,
 `3`, `4` or `5`. If atomicity is required, then the user must implement
 their own synchronization (for example, using [`Mutex.t`](Mutex.html#TYPEt)).

### Data races

If two domains only access disjoint parts of the bigarray, then the
 observed behaviour is the equivalent to some sequential interleaving of the
 operations from the two domains.

A data race is said to occur when two domains access the same bigarray
 element without synchronization and at least one of the accesses is a
 write. In the absence of data races, the observed behaviour is equivalent
 to some sequential interleaving of the operations from different domains.

Whenever possible, data races should be avoided by using synchronization to
 mediate the accesses to the bigarray elements.

Indeed, in the presence of data races, programs will not crash but the
 observed behaviour may not be equivalent to any sequential interleaving of
 operations from different domains.

### Tearing

Bigarrays have a distinct caveat in the presence of data races:
 concurrent bigarray operations might produce surprising values due to
 tearing. More precisely, the interleaving of partial writes and reads might
 create values that would not exist with a sequential execution.
 For instance, at the end of


```
let res = Array1.init Complex64 c_layout size (fun _ -> Complex.zero)
let d1 = Domain.spawn (fun () -> Array1.fill res Complex.one)
let d2 = Domain.spawn (fun () -> Array1.fill res Complex.i)
let () = Domain.join d1; Domain.join d2

```
the `res` bigarray might contain values that are neither `Complex.i`
 nor `Complex.one` (for instance `1 + i`).

