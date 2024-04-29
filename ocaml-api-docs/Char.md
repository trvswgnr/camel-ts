# Module [Char](type_Char.html)


```
module Char: sig [..](Char.html) end
```


Character operations.





---


```
val code : char -> int
```


Return the ASCII code of the argument.




```
val chr : int -> char
```


Return the character with the given ASCII code.



* **Raises** `Invalid_argument` if the argument is
 outside the range 0--255.



```
val escaped : char -> string
```


Return a string representing the given character,
 with special characters escaped following the lexical conventions
 of OCaml.
 All characters outside the ASCII printable range (32..126) are
 escaped, as well as backslash, double-quote, and single-quote.




```
val lowercase_ascii : char -> char
```


Convert the given character to its equivalent lowercase character,
 using the US-ASCII character set.



* **Since** 4.03



```
val uppercase_ascii : char -> char
```


Convert the given character to its equivalent uppercase character,
 using the US-ASCII character set.



* **Since** 4.03



```
type t = char 
```


An alias for the type of characters.




```
val compare : [t](Char.html#TYPEt) -> [t](Char.html#TYPEt) -> int
```


The comparison function for characters, with the same specification as
 [`compare`](Stdlib.html#VALcompare). Along with the type `t`, this function `compare`
 allows the module `Char` to be passed as argument to the functors
 [`Set.Make`](Set.Make.html) and [`Map.Make`](Map.Make.html).




```
val equal : [t](Char.html#TYPEt) -> [t](Char.html#TYPEt) -> bool
```


The equal function for chars.



* **Since** 4.03



```
val seeded_hash : int -> [t](Char.html#TYPEt) -> int
```


A seeded hash function for characters, with the same output value as
 [`Hashtbl.seeded_hash`](Hashtbl.html#VALseeded_hash). This function allows this module to be passed as
 argument to the functor [`Hashtbl.MakeSeeded`](Hashtbl.MakeSeeded.html).



* **Since** 5.1



```
val hash : [t](Char.html#TYPEt) -> int
```


An unseeded hash function for characters, with the same output value as
 [`Hashtbl.hash`](Hashtbl.html#VALhash). This function allows this module to be passed as argument
 to the functor [`Hashtbl.Make`](Hashtbl.Make.html).



* **Since** 5.1


