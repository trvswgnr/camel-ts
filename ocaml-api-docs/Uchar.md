# Module [Uchar](type_Uchar.html)


```
module Uchar: sig [..](Uchar.html) end
```


Unicode characters.



* **Since** 4.03




---


```
type t 
```


The type for Unicode characters.


A value of this type represents a Unicode
 [scalar
 value](http://unicode.org/glossary/#unicode_scalar_value) which is an integer in the ranges `0x0000`...`0xD7FF` or
 `0xE000`...`0x10FFFF`.




```
val min : [t](Uchar.html#TYPEt)
```


`min` is U+0000.




```
val max : [t](Uchar.html#TYPEt)
```


`max` is U+10FFFF.




```
val bom : [t](Uchar.html#TYPEt)
```


`bom` is U+FEFF, the
 [byte order mark](http://unicode.org/glossary/#byte_order_mark) (BOM)
 character.



* **Since** 4.06



```
val rep : [t](Uchar.html#TYPEt)
```


`rep` is U+FFFD, the
 [replacement](http://unicode.org/glossary/#replacement_character)
 character.



* **Since** 4.06



```
val succ : [t](Uchar.html#TYPEt) -> [t](Uchar.html#TYPEt)
```


`succ u` is the scalar value after `u` in the set of Unicode scalar
 values.



* **Raises** `Invalid_argument` if `u` is [`Uchar.max`](Uchar.html#VALmax).



```
val pred : [t](Uchar.html#TYPEt) -> [t](Uchar.html#TYPEt)
```


`pred u` is the scalar value before `u` in the set of Unicode scalar
 values.



* **Raises** `Invalid_argument` if `u` is [`Uchar.min`](Uchar.html#VALmin).



```
val is_valid : int -> bool
```


`is_valid n` is `true` if and only if `n` is a Unicode scalar value
 (i.e. in the ranges `0x0000`...`0xD7FF` or `0xE000`...`0x10FFFF`).




```
val of_int : int -> [t](Uchar.html#TYPEt)
```


`of_int i` is `i` as a Unicode character.



* **Raises** `Invalid_argument` if `i` does not satisfy [`Uchar.is_valid`](Uchar.html#VALis_valid).



```
val to_int : [t](Uchar.html#TYPEt) -> int
```


`to_int u` is `u` as an integer.




```
val is_char : [t](Uchar.html#TYPEt) -> bool
```


`is_char u` is `true` if and only if `u` is a latin1 OCaml character.




```
val of_char : char -> [t](Uchar.html#TYPEt)
```


`of_char c` is `c` as a Unicode character.




```
val to_char : [t](Uchar.html#TYPEt) -> char
```


`to_char u` is `u` as an OCaml latin1 character.



* **Raises** `Invalid_argument` if `u` does not satisfy [`Uchar.is_char`](Uchar.html#VALis_char).



```
val equal : [t](Uchar.html#TYPEt) -> [t](Uchar.html#TYPEt) -> bool
```


`equal u u'` is `u = u'`.




```
val compare : [t](Uchar.html#TYPEt) -> [t](Uchar.html#TYPEt) -> int
```


`compare u u'` is `Stdlib.compare u u'`.




```
val hash : [t](Uchar.html#TYPEt) -> int
```


`hash u` associates a non-negative integer to `u`.



## UTF codecs tools


```
type utf_decode 
```


The type for UTF decode results. Values of this type represent
 the result of a Unicode Transformation Format decoding attempt.




```
val utf_decode_is_valid : [utf_decode](Uchar.html#TYPEutf_decode) -> bool
```


`utf_decode_is_valid d` is `true` if and only if `d` holds a valid
 decode.




```
val utf_decode_uchar : [utf_decode](Uchar.html#TYPEutf_decode) -> [t](Uchar.html#TYPEt)
```


`utf_decode_uchar d` is the Unicode character decoded by `d` if
 `utf_decode_is_valid d` is `true` and [`Uchar.rep`](Uchar.html#VALrep) otherwise.




```
val utf_decode_length : [utf_decode](Uchar.html#TYPEutf_decode) -> int
```


`utf_decode_length d` is the number of elements from the source
 that were consumed by the decode `d`. This is always strictly
 positive and smaller or equal to `4`. The kind of source elements
 depends on the actual decoder; for the decoders of the standard
 library this function always returns a length in bytes.




```
val utf_decode : int -> [t](Uchar.html#TYPEt) -> [utf_decode](Uchar.html#TYPEutf_decode)
```


`utf_decode n u` is a valid UTF decode for `u` that consumed `n`
 elements from the source for decoding. `n` must be positive and
 smaller or equal to `4` (this is not checked by the module).




```
val utf_decode_invalid : int -> [utf_decode](Uchar.html#TYPEutf_decode)
```


`utf_decode_invalid n` is an invalid UTF decode that consumed `n`
 elements from the source to error. `n` must be positive and
 smaller or equal to `4` (this is not checked by the module). The
 resulting decode has [`Uchar.rep`](Uchar.html#VALrep) as the decoded Unicode character.




```
val utf_8_byte_length : [t](Uchar.html#TYPEt) -> int
```


`utf_8_byte_length u` is the number of bytes needed to encode
 `u` in UTF-8.




```
val utf_16_byte_length : [t](Uchar.html#TYPEt) -> int
```


`utf_16_byte_length u` is the number of bytes needed to encode
 `u` in UTF-16.



