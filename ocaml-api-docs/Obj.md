# Module [Obj](type_Obj.html)


```
module Obj: sig [..](Obj.html) end
```


Operations on internal representations of values.


Not for the casual user.





---


```
type t 
```

```
type raw_data = nativeint 
```

```
val repr : 'a -> [t](Obj.html#TYPEt)
```

```
val obj : [t](Obj.html#TYPEt) -> 'a
```

```
val magic : 'a -> 'b
```

```
val is_block : [t](Obj.html#TYPEt) -> bool
```

```
val is_int : [t](Obj.html#TYPEt) -> bool
```

```
val tag : [t](Obj.html#TYPEt) -> int
```

```
val size : [t](Obj.html#TYPEt) -> int
```

```
val reachable_words : [t](Obj.html#TYPEt) -> int
```


Computes the total size (in words, including the headers) of all
 heap blocks accessible from the argument. Statically
 allocated blocks are included.



* **Since** 4.04



```
val field : [t](Obj.html#TYPEt) -> int -> [t](Obj.html#TYPEt)
```

```
val set_field : [t](Obj.html#TYPEt) -> int -> [t](Obj.html#TYPEt) -> unit
```


When using flambda:


`set_field` MUST NOT be called on immutable blocks. (Blocks allocated
 in C stubs, or with `new_block` below, are always considered mutable.)


The same goes for `set_double_field`.


For experts only:
 `set_field` et al can be made safe by first wrapping the block in
 [`Sys.opaque_identity`](Sys.html#VALopaque_identity), so any information about its contents will not
 be propagated.




```
val double_field : [t](Obj.html#TYPEt) -> int -> float
```

```
val set_double_field : [t](Obj.html#TYPEt) -> int -> float -> unit
```

```
val raw_field : [t](Obj.html#TYPEt) -> int -> [raw_data](Obj.html#TYPEraw_data)
```

```
val set_raw_field : [t](Obj.html#TYPEt) -> int -> [raw_data](Obj.html#TYPEraw_data) -> unit
```

```
val new_block : int -> int -> [t](Obj.html#TYPEt)
```

```
val dup : [t](Obj.html#TYPEt) -> [t](Obj.html#TYPEt)
```

```
val add_offset : [t](Obj.html#TYPEt) -> [Int32.t](Int32.html#TYPEt) -> [t](Obj.html#TYPEt)
```

```
val with_tag : int -> [t](Obj.html#TYPEt) -> [t](Obj.html#TYPEt)
```

```
val first_non_constant_constructor_tag : int
```

```
val last_non_constant_constructor_tag : int
```

```
val forcing_tag : int
```

```
val cont_tag : int
```

```
val lazy_tag : int
```

```
val closure_tag : int
```

```
val object_tag : int
```

```
val infix_tag : int
```

```
val forward_tag : int
```

```
val no_scan_tag : int
```

```
val abstract_tag : int
```

```
val string_tag : int
```

```
val double_tag : int
```

```
val double_array_tag : int
```

```
val custom_tag : int
```

```
val int_tag : int
```

```
val out_of_heap_tag : int
```

```
val unaligned_tag : int
```

```
module [Closure](Obj.Closure.html): sig [..](Obj.Closure.html) end
```

```
module [Extension_constructor](Obj.Extension_constructor.html): sig [..](Obj.Extension_constructor.html) end
```

```
module [Ephemeron](Obj.Ephemeron.html): sig [..](Obj.Ephemeron.html) end
```
