# Module [Unit](type_Unit.html)


```
module Unit: sig [..](Unit.html) end
```


Unit values.



* **Since** 4.08




---

## The unit type


```
type t = unit = 
```


| `|` | `()` |
| --- | --- |



The unit type.


The constructor `()` is included here so that it has a path,
 but it is not intended to be used in user-defined data types.




```
val equal : [t](Unit.html#TYPEt) -> [t](Unit.html#TYPEt) -> bool
```


`equal u1 u2` is `true`.




```
val compare : [t](Unit.html#TYPEt) -> [t](Unit.html#TYPEt) -> int
```


`compare u1 u2` is `0`.




```
val to_string : [t](Unit.html#TYPEt) -> string
```


`to_string b` is `"()"`.



