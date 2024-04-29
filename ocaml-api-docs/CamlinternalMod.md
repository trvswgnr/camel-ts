# Module [CamlinternalMod](type_CamlinternalMod.html)


```
module CamlinternalMod: sig [..](CamlinternalMod.html) end
```


Run-time support for recursive modules.
 All functions in this module are for system use only, not for the
 casual user.





---


```
type shape = 
```


| `|` | `Function` |
| --- | --- |
| `|` | `Lazy` |
| `|` | `Class` |
| `|` | `Module of `[shape](CamlinternalMod.html#TYPEshape) array`` |
| `|` | `Value of `[Obj.t](Obj.html#TYPEt)`` |


```
val init_mod : string * int * int -> [shape](CamlinternalMod.html#TYPEshape) -> [Obj.t](Obj.html#TYPEt)
```

```
val update_mod : [shape](CamlinternalMod.html#TYPEshape) -> [Obj.t](Obj.html#TYPEt) -> [Obj.t](Obj.html#TYPEt) -> unit
```
