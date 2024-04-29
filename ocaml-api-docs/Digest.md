# Module [Digest](type_Digest.html)


```
module Digest: sig [..](Digest.html) end
```


MD5 message digest.


This module provides functions to compute 128-bit 'digests' of
 arbitrary-length strings or files. The algorithm used is MD5.


The MD5 hash function is not cryptographically secure.
 Hence, this module should not be used for security-sensitive
 applications. More recent, stronger cryptographic primitives
 should be used instead.





---


```
type t = string 
```


The type of digests: 16-character strings.




```
val compare : [t](Digest.html#TYPEt) -> [t](Digest.html#TYPEt) -> int
```


The comparison function for 16-character digest, with the same
 specification as [`compare`](Stdlib.html#VALcompare) and the implementation
 shared with [`String.compare`](String.html#VALcompare). Along with the type `t`, this
 function `compare` allows the module `Digest` to be passed as
 argument to the functors [`Set.Make`](Set.Make.html) and [`Map.Make`](Map.Make.html).



* **Since** 4.00



```
val equal : [t](Digest.html#TYPEt) -> [t](Digest.html#TYPEt) -> bool
```


The equal function for 16-character digest.



* **Since** 4.03



```
val string : string -> [t](Digest.html#TYPEt)
```


Return the digest of the given string.




```
val bytes : bytes -> [t](Digest.html#TYPEt)
```


Return the digest of the given byte sequence.



* **Since** 4.02



```
val substring : string -> int -> int -> [t](Digest.html#TYPEt)
```


`Digest.substring s ofs len` returns the digest of the substring
 of `s` starting at index `ofs` and containing `len` characters.




```
val subbytes : bytes -> int -> int -> [t](Digest.html#TYPEt)
```


`Digest.subbytes s ofs len` returns the digest of the subsequence
 of `s` starting at index `ofs` and containing `len` bytes.



* **Since** 4.02



```
val channel : [in_channel](Stdlib.html#TYPEin_channel) -> int -> [t](Digest.html#TYPEt)
```


If `len` is nonnegative, `Digest.channel ic len` reads `len`
 characters from channel `ic` and returns their digest, or raises
 `End_of_file` if end-of-file is reached before `len` characters
 are read. If `len` is negative, `Digest.channel ic len` reads
 all characters from `ic` until end-of-file is reached and return
 their digest.




```
val file : string -> [t](Digest.html#TYPEt)
```


Return the digest of the file whose name is given.




```
val output : [out_channel](Stdlib.html#TYPEout_channel) -> [t](Digest.html#TYPEt) -> unit
```


Write a digest on the given output channel.




```
val input : [in_channel](Stdlib.html#TYPEin_channel) -> [t](Digest.html#TYPEt)
```


Read a digest from the given input channel.




```
val to_hex : [t](Digest.html#TYPEt) -> string
```


Return the printable hexadecimal representation of the given digest.



* **Raises** `Invalid_argument` if the argument is not exactly 16 bytes.



```
val from_hex : string -> [t](Digest.html#TYPEt)
```


Convert a hexadecimal representation back into the corresponding digest.



* **Since** 4.00
* **Raises** `Invalid_argument` if the argument is not exactly 32 hexadecimal
 characters.


