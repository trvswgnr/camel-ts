# Module [In\_channel](type_In_channel.html)


```
module In_channel: sig [..](In_channel.html) end
```


Input channels.


This module provides functions for working with input channels.


See  [the example section](In_channel.html#examples) below.



* **Since** 4.14




---

## Channels


```
type t = [in_channel](Stdlib.html#TYPEin_channel) 
```


The type of input channel.




```
type open_flag = [open_flag](Stdlib.html#TYPEopen_flag) = 
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



Opening modes for [`In_channel.open_gen`](In_channel.html#VALopen_gen).




```
val stdin : [t](In_channel.html#TYPEt)
```


The standard input for the process.




```
val open_bin : string -> [t](In_channel.html#TYPEt)
```


Open the named file for reading, and return a new input channel on that
 file, positioned at the beginning of the file.




```
val open_text : string -> [t](In_channel.html#TYPEt)
```


Same as [`In_channel.open_bin`](In_channel.html#VALopen_bin), but the file is opened in text mode, so that newline
 translation takes place during reads. On operating systems that do not
 distinguish between text mode and binary mode, this function behaves like
 [`In_channel.open_bin`](In_channel.html#VALopen_bin).




```
val open_gen : [open_flag](In_channel.html#TYPEopen_flag) list -> int -> string -> [t](In_channel.html#TYPEt)
```


`open_gen mode perm filename` opens the named file for reading, as described
 above. The extra arguments `mode` and `perm` specify the opening mode and
 file permissions. [`In_channel.open_text`](In_channel.html#VALopen_text) and [`In_channel.open_bin`](In_channel.html#VALopen_bin) are special cases of this
 function.




```
val with_open_bin : string -> ([t](In_channel.html#TYPEt) -> 'a) -> 'a
```


`with_open_bin fn f` opens a channel `ic` on file `fn` and returns `f  

    ic`. After `f` returns, either with a value or by raising an exception, `ic`
 is guaranteed to be closed.




```
val with_open_text : string -> ([t](In_channel.html#TYPEt) -> 'a) -> 'a
```


Like [`In_channel.with_open_bin`](In_channel.html#VALwith_open_bin), but the channel is opened in text mode (see
 [`In_channel.open_text`](In_channel.html#VALopen_text)).




```
val with_open_gen : [open_flag](In_channel.html#TYPEopen_flag) list -> int -> string -> ([t](In_channel.html#TYPEt) -> 'a) -> 'a
```


Like [`In_channel.with_open_bin`](In_channel.html#VALwith_open_bin), but can specify the opening mode and file permission,
 in case the file must be created (see [`In_channel.open_gen`](In_channel.html#VALopen_gen)).




```
val close : [t](In_channel.html#TYPEt) -> unit
```


Close the given channel. Input functions raise a `Sys_error` exception when
 they are applied to a closed input channel, except [`In_channel.close`](In_channel.html#VALclose), which does
 nothing when applied to an already closed channel.




```
val close_noerr : [t](In_channel.html#TYPEt) -> unit
```


Same as [`In_channel.close`](In_channel.html#VALclose), but ignore all errors.



## Input


```
val input_char : [t](In_channel.html#TYPEt) -> char option
```


Read one character from the given input channel. Returns `None` if there
 are no more characters to read.




```
val input_byte : [t](In_channel.html#TYPEt) -> int option
```


Same as [`In_channel.input_char`](In_channel.html#VALinput_char), but return the 8-bit integer representing the
 character. Returns `None` if the end of file was reached.




```
val input_line : [t](In_channel.html#TYPEt) -> string option
```


`input_line ic` reads characters from `ic` until a newline or the end of
 file is reached. Returns the string of all characters read, without the
 newline (if any). Returns `None` if the end of the file has been reached.
 In particular, this will be the case if the last line of input is empty.


A newline is the character `\n` unless the file is open in text mode and
 [`Sys.win32`](Sys.html#VALwin32) is `true` in which case it is the sequence of characters
 `\r\n`.




```
val really_input_string : [t](In_channel.html#TYPEt) -> int -> string option
```


`really_input_string ic len` reads `len` characters from channel `ic` and
 returns them in a new string. Returns `None` if the end of file is reached
 before `len` characters have been read.


If the same channel is read concurrently by multiple threads, the returned
 string is not guaranteed to contain contiguous characters from the input.




```
val input_all : [t](In_channel.html#TYPEt) -> string
```


`input_all ic` reads all remaining data from `ic`.


If the same channel is read concurrently by multiple threads, the returned
 string is not guaranteed to contain contiguous characters from the input.




```
val input_lines : [t](In_channel.html#TYPEt) -> string list
```


`input_lines ic` reads lines using [`In_channel.input_line`](In_channel.html#VALinput_line)
 until the end of file is reached. It returns the list of all
 lines read, in the order they were read. The newline characters
 that terminate lines are not included in the returned strings.
 Empty lines produce empty strings.



* **Since** 5.1


## Advanced input


```
val input : [t](In_channel.html#TYPEt) -> bytes -> int -> int -> int
```


`input ic buf pos len` reads up to `len` characters from the given channel
 `ic`, storing them in byte sequence `buf`, starting at character number
 `pos`. It returns the actual number of characters read, between 0 and `len`
 (inclusive). A return value of 0 means that the end of file was reached.


Use [`In_channel.really_input`](In_channel.html#VALreally_input) to read exactly `len` characters.



* **Raises** `Invalid_argument` if `pos` and `len` do not designate a valid range of
 `buf`.



```
val really_input : [t](In_channel.html#TYPEt) -> bytes -> int -> int -> unit option
```


`really_input ic buf pos len` reads `len` characters from channel `ic`,
 storing them in byte sequence `buf`, starting at character number `pos`.


Returns `None` if the end of file is reached before `len` characters have
 been read.


If the same channel is read concurrently by multiple threads, the bytes
 read by `really_input` are not guaranteed to be contiguous.



* **Raises** `Invalid_argument` if `pos` and `len` do not designate a valid range of
 `buf`.



```
val fold_lines : ('acc -> string -> 'acc) -> 'acc -> [t](In_channel.html#TYPEt) -> 'acc
```


`fold_lines f init ic` reads lines from `ic` using [`In_channel.input_line`](In_channel.html#VALinput_line)
 until the end of file is reached, and successively passes each line
 to function `f` in the style of a fold.
 More precisely, if lines `l1, ..., lN` are read,
 `fold_lines f init ic` computes `f (... (f (f init l1) l2) ...) lN`.
 If `f` has no side effects, this is equivalent to
 `List.fold_left f init (In_channel.input_lines ic)`,
 but is more efficient since it does not construct the list of all
 lines read.



* **Since** 5.1


## Seeking


```
val seek : [t](In_channel.html#TYPEt) -> int64 -> unit
```


`seek chan pos` sets the current reading position to `pos` for channel
 `chan`. This works only for regular files. On files of other kinds, the
 behavior is unspecified.




```
val pos : [t](In_channel.html#TYPEt) -> int64
```


Return the current reading position for the given channel. For files opened
 in text mode under Windows, the returned position is approximate (owing to
 end-of-line conversion); in particular, saving the current position with
 [`In_channel.pos`](In_channel.html#VALpos), then going back to this position using [`In_channel.seek`](In_channel.html#VALseek) will not work. For
 this programming idiom to work reliably and portably, the file must be
 opened in binary mode.



## Attributes


```
val length : [t](In_channel.html#TYPEt) -> int64
```


Return the size (number of characters) of the regular file on which the
 given channel is opened. If the channel is opened on a file that is not a
 regular file, the result is meaningless. The returned size does not take
 into account the end-of-line translations that can be performed when reading
 from a channel opened in text mode.




```
val set_binary_mode : [t](In_channel.html#TYPEt) -> bool -> unit
```


`set_binary_mode ic true` sets the channel `ic` to binary mode: no
 translations take place during input.


`set_binary_mode ic false` sets the channel `ic` to text mode: depending
 on the operating system, some translations may take place during input. For
 instance, under Windows, end-of-lines will be translated from `\r\n` to
 `\n`.


This function has no effect under operating systems that do not distinguish
 between text mode and binary mode.




```
val isatty : [t](In_channel.html#TYPEt) -> bool
```


`isatty ic` is `true` if `ic` refers to a terminal or console window,
 `false` otherwise.



* **Since** 5.1


## Examples

Reading the contents of a file:


```
      let read_file file = In_channel.with_open_bin file In_channel.input_all
    
```
Reading a line from stdin:


```
      let user_input () = In_channel.input_line In_channel.stdin
    
```
