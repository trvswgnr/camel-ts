# Module [Buffer](type_Buffer.html)


```
module Buffer: sig [..](Buffer.html) end
```


Extensible buffers.


This module implements buffers that automatically expand
 as necessary. It provides accumulative concatenation of strings
 in linear time (instead of quadratic time when strings are
 concatenated pairwise). For example:



```
     let concat_strings ss =
       let b = Buffer.create 16 in
         List.iter (Buffer.add_string b) ss;
         Buffer.contents b


```

* **Alert unsynchronized\_access.** Unsynchronized accesses to buffers are a programming error.




---

**Unsynchronized accesses**

Unsynchronized accesses to a buffer may lead to an invalid buffer state.
 Thus, concurrent accesses to a buffer must be synchronized (for instance
 with a [`Mutex.t`](Mutex.html#TYPEt)).


```
type t 
```


The abstract type of buffers.




```
val create : int -> [t](Buffer.html#TYPEt)
```


`create n` returns a fresh buffer, initially empty.
 The `n` parameter is the initial size of the internal byte sequence
 that holds the buffer contents. That byte sequence is automatically
 reallocated when more than `n` characters are stored in the buffer,
 but shrinks back to `n` characters when `reset` is called.
 For best performance, `n` should be of the same order of magnitude
 as the number of characters that are expected to be stored in
 the buffer (for instance, 80 for a buffer that holds one output
 line). Nothing bad will happen if the buffer grows beyond that
 limit, however. In doubt, take `n = 16` for instance.
 If `n` is not between 1 and [`Sys.max_string_length`](Sys.html#VALmax_string_length), it will
 be clipped to that interval.




```
val contents : [t](Buffer.html#TYPEt) -> string
```


Return a copy of the current contents of the buffer.
 The buffer itself is unchanged.




```
val to_bytes : [t](Buffer.html#TYPEt) -> bytes
```


Return a copy of the current contents of the buffer.
 The buffer itself is unchanged.



* **Since** 4.02



```
val sub : [t](Buffer.html#TYPEt) -> int -> int -> string
```


`Buffer.sub b off len` returns a copy of `len` bytes from the
 current contents of the buffer `b`, starting at offset `off`.



* **Raises** `Invalid_argument` if `off` and `len` do not designate a valid
 range of `b`.



```
val blit : [t](Buffer.html#TYPEt) -> int -> bytes -> int -> int -> unit
```


`Buffer.blit src srcoff dst dstoff len` copies `len` characters from
 the current contents of the buffer `src`, starting at offset `srcoff`
 to `dst`, starting at character `dstoff`.



* **Since** 3.11.2
* **Raises** `Invalid_argument` if `srcoff` and `len` do not designate a valid
 range of `src`, or if `dstoff` and `len` do not designate a valid
 range of `dst`.



```
val nth : [t](Buffer.html#TYPEt) -> int -> char
```


Get the n-th character of the buffer.



* **Raises** `Invalid_argument` if
 index out of bounds



```
val length : [t](Buffer.html#TYPEt) -> int
```


Return the number of characters currently contained in the buffer.




```
val clear : [t](Buffer.html#TYPEt) -> unit
```


Empty the buffer.




```
val reset : [t](Buffer.html#TYPEt) -> unit
```


Empty the buffer and deallocate the internal byte sequence holding the
 buffer contents, replacing it with the initial internal byte sequence
 of length `n` that was allocated by [`Buffer.create`](Buffer.html#VALcreate) `n`.
 For long-lived buffers that may have grown a lot, `reset` allows
 faster reclamation of the space used by the buffer.




```
val output_buffer : [out_channel](Stdlib.html#TYPEout_channel) -> [t](Buffer.html#TYPEt) -> unit
```


`output_buffer oc b` writes the current contents of buffer `b`
 on the output channel `oc`.




```
val truncate : [t](Buffer.html#TYPEt) -> int -> unit
```


`truncate b len` truncates the length of `b` to `len`
 Note: the internal byte sequence is not shortened.



* **Since** 4.05
* **Raises** `Invalid_argument` if `len < 0` or `len > length b`.


## Appending

Note: all `add_*` operations can raise `Failure` if the internal byte
 sequence of the buffer would need to grow beyond [`Sys.max_string_length`](Sys.html#VALmax_string_length).


```
val add_char : [t](Buffer.html#TYPEt) -> char -> unit
```


`add_char b c` appends the character `c` at the end of buffer `b`.




```
val add_utf_8_uchar : [t](Buffer.html#TYPEt) -> [Uchar.t](Uchar.html#TYPEt) -> unit
```


`add_utf_8_uchar b u` appends the [UTF-8](https://tools.ietf.org/html/rfc3629) encoding of `u` at the end of buffer `b`.



* **Since** 4.06



```
val add_utf_16le_uchar : [t](Buffer.html#TYPEt) -> [Uchar.t](Uchar.html#TYPEt) -> unit
```


`add_utf_16le_uchar b u` appends the
 [UTF-16LE](https://tools.ietf.org/html/rfc2781) encoding of `u`
 at the end of buffer `b`.



* **Since** 4.06



```
val add_utf_16be_uchar : [t](Buffer.html#TYPEt) -> [Uchar.t](Uchar.html#TYPEt) -> unit
```


`add_utf_16be_uchar b u` appends the
 [UTF-16BE](https://tools.ietf.org/html/rfc2781) encoding of `u`
 at the end of buffer `b`.



* **Since** 4.06



```
val add_string : [t](Buffer.html#TYPEt) -> string -> unit
```


`add_string b s` appends the string `s` at the end of buffer `b`.




```
val add_bytes : [t](Buffer.html#TYPEt) -> bytes -> unit
```


`add_bytes b s` appends the byte sequence `s` at the end of buffer `b`.



* **Since** 4.02



```
val add_substring : [t](Buffer.html#TYPEt) -> string -> int -> int -> unit
```


`add_substring b s ofs len` takes `len` characters from offset
 `ofs` in string `s` and appends them at the end of buffer `b`.



* **Raises** `Invalid_argument` if `ofs` and `len` do not designate a valid
 range of `s`.



```
val add_subbytes : [t](Buffer.html#TYPEt) -> bytes -> int -> int -> unit
```


`add_subbytes b s ofs len` takes `len` characters from offset
 `ofs` in byte sequence `s` and appends them at the end of buffer `b`.



* **Since** 4.02
* **Raises** `Invalid_argument` if `ofs` and `len` do not designate a valid
 range of `s`.



```
val add_substitute : [t](Buffer.html#TYPEt) -> (string -> string) -> string -> unit
```


`add_substitute b f s` appends the string pattern `s` at the end
 of buffer `b` with substitution.
 The substitution process looks for variables into
 the pattern and substitutes each variable name by its value, as
 obtained by applying the mapping `f` to the variable name. Inside the
 string pattern, a variable name immediately follows a non-escaped
 `$` character and is one of the following:


* a non empty sequence of alphanumeric or `_` characters,
* an arbitrary sequence of characters enclosed by a pair of
 matching parentheses or curly brackets.
 An escaped `$` character is a `$` that immediately follows a backslash
 character; it then stands for a plain `$`.



* **Raises** `Not_found` if the closing character of a parenthesized variable
 cannot be found.



```
val add_buffer : [t](Buffer.html#TYPEt) -> [t](Buffer.html#TYPEt) -> unit
```


`add_buffer b1 b2` appends the current contents of buffer `b2`
 at the end of buffer `b1`. `b2` is not modified.




```
val add_channel : [t](Buffer.html#TYPEt) -> [in_channel](Stdlib.html#TYPEin_channel) -> int -> unit
```


`add_channel b ic n` reads at most `n` characters from the
 input channel `ic` and stores them at the end of buffer `b`.



* **Raises**
	+ `End_of_file` if the channel contains fewer than `n`
	 characters. In this case, the characters are still added to
	 the buffer, so as to avoid loss of data.
	+ `Invalid_argument` if `len < 0` or `len > Sys.max_string_length`.


## Buffers and Sequences


```
val to_seq : [t](Buffer.html#TYPEt) -> char [Seq.t](Seq.html#TYPEt)
```


Iterate on the buffer, in increasing order.


The behavior is not specified if the buffer is modified during iteration.



* **Since** 4.07



```
val to_seqi : [t](Buffer.html#TYPEt) -> (int * char) [Seq.t](Seq.html#TYPEt)
```


Iterate on the buffer, in increasing order, yielding indices along chars.


The behavior is not specified if the buffer is modified during iteration.



* **Since** 4.07



```
val add_seq : [t](Buffer.html#TYPEt) -> char [Seq.t](Seq.html#TYPEt) -> unit
```


Add chars to the buffer



* **Since** 4.07



```
val of_seq : char [Seq.t](Seq.html#TYPEt) -> [t](Buffer.html#TYPEt)
```


Create a buffer from the generator



* **Since** 4.07


## Binary encoding of integers

The functions in this section append binary encodings of integers
 to buffers.

Little-endian (resp. big-endian) encoding means that least
 (resp. most) significant bytes are stored first. Big-endian is
 also known as network byte order. Native-endian encoding is
 either little-endian or big-endian depending on [`Sys.big_endian`](Sys.html#VALbig_endian).

32-bit and 64-bit integers are represented by the `int32` and
 `int64` types, which can be interpreted either as signed or
 unsigned numbers.

8-bit and 16-bit integers are represented by the `int` type,
 which has more bits than the binary encoding. Functions that
 encode these values truncate their inputs to their least
 significant bytes.


```
val add_uint8 : [t](Buffer.html#TYPEt) -> int -> unit
```


`add_uint8 b i` appends a binary unsigned 8-bit integer `i` to
 `b`.



* **Since** 4.08



```
val add_int8 : [t](Buffer.html#TYPEt) -> int -> unit
```


`add_int8 b i` appends a binary signed 8-bit integer `i` to
 `b`.



* **Since** 4.08



```
val add_uint16_ne : [t](Buffer.html#TYPEt) -> int -> unit
```


`add_uint16_ne b i` appends a binary native-endian unsigned 16-bit
 integer `i` to `b`.



* **Since** 4.08



```
val add_uint16_be : [t](Buffer.html#TYPEt) -> int -> unit
```


`add_uint16_be b i` appends a binary big-endian unsigned 16-bit
 integer `i` to `b`.



* **Since** 4.08



```
val add_uint16_le : [t](Buffer.html#TYPEt) -> int -> unit
```


`add_uint16_le b i` appends a binary little-endian unsigned 16-bit
 integer `i` to `b`.



* **Since** 4.08



```
val add_int16_ne : [t](Buffer.html#TYPEt) -> int -> unit
```


`add_int16_ne b i` appends a binary native-endian signed 16-bit
 integer `i` to `b`.



* **Since** 4.08



```
val add_int16_be : [t](Buffer.html#TYPEt) -> int -> unit
```


`add_int16_be b i` appends a binary big-endian signed 16-bit
 integer `i` to `b`.



* **Since** 4.08



```
val add_int16_le : [t](Buffer.html#TYPEt) -> int -> unit
```


`add_int16_le b i` appends a binary little-endian signed 16-bit
 integer `i` to `b`.



* **Since** 4.08



```
val add_int32_ne : [t](Buffer.html#TYPEt) -> int32 -> unit
```


`add_int32_ne b i` appends a binary native-endian 32-bit integer
 `i` to `b`.



* **Since** 4.08



```
val add_int32_be : [t](Buffer.html#TYPEt) -> int32 -> unit
```


`add_int32_be b i` appends a binary big-endian 32-bit integer
 `i` to `b`.



* **Since** 4.08



```
val add_int32_le : [t](Buffer.html#TYPEt) -> int32 -> unit
```


`add_int32_le b i` appends a binary little-endian 32-bit integer
 `i` to `b`.



* **Since** 4.08



```
val add_int64_ne : [t](Buffer.html#TYPEt) -> int64 -> unit
```


`add_int64_ne b i` appends a binary native-endian 64-bit integer
 `i` to `b`.



* **Since** 4.08



```
val add_int64_be : [t](Buffer.html#TYPEt) -> int64 -> unit
```


`add_int64_be b i` appends a binary big-endian 64-bit integer
 `i` to `b`.



* **Since** 4.08



```
val add_int64_le : [t](Buffer.html#TYPEt) -> int64 -> unit
```


`add_int64_ne b i` appends a binary little-endian 64-bit integer
 `i` to `b`.



* **Since** 4.08


