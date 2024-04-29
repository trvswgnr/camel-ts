# Module [CamlinternalOO](type_CamlinternalOO.html)


```
module CamlinternalOO: sig [..](CamlinternalOO.html) end
```


Run-time support for objects and classes.
 All functions in this module are for system use only, not for the
 casual user.





---

## Classes


```
type tag 
```

```
type label 
```

```
type table 
```

```
type meth 
```

```
type t 
```

```
type obj 
```

```
type closure 
```

```
val public_method_label : string -> [tag](CamlinternalOO.html#TYPEtag)
```

```
val new_method : [table](CamlinternalOO.html#TYPEtable) -> [label](CamlinternalOO.html#TYPElabel)
```

```
val new_variable : [table](CamlinternalOO.html#TYPEtable) -> string -> int
```

```
val new_methods_variables : [table](CamlinternalOO.html#TYPEtable) ->  
       string array -> string array -> [label](CamlinternalOO.html#TYPElabel) array
```

```
val get_variable : [table](CamlinternalOO.html#TYPEtable) -> string -> int
```

```
val get_variables : [table](CamlinternalOO.html#TYPEtable) -> string array -> int array
```

```
val get_method_label : [table](CamlinternalOO.html#TYPEtable) -> string -> [label](CamlinternalOO.html#TYPElabel)
```

```
val get_method_labels : [table](CamlinternalOO.html#TYPEtable) -> string array -> [label](CamlinternalOO.html#TYPElabel) array
```

```
val get_method : [table](CamlinternalOO.html#TYPEtable) -> [label](CamlinternalOO.html#TYPElabel) -> [meth](CamlinternalOO.html#TYPEmeth)
```

```
val set_method : [table](CamlinternalOO.html#TYPEtable) -> [label](CamlinternalOO.html#TYPElabel) -> [meth](CamlinternalOO.html#TYPEmeth) -> unit
```

```
val set_methods : [table](CamlinternalOO.html#TYPEtable) -> [label](CamlinternalOO.html#TYPElabel) array -> unit
```

```
val narrow : [table](CamlinternalOO.html#TYPEtable) -> string array -> string array -> string array -> unit
```

```
val widen : [table](CamlinternalOO.html#TYPEtable) -> unit
```

```
val add_initializer : [table](CamlinternalOO.html#TYPEtable) -> ([obj](CamlinternalOO.html#TYPEobj) -> unit) -> unit
```

```
val dummy_table : [table](CamlinternalOO.html#TYPEtable)
```

```
val create_table : string array -> [table](CamlinternalOO.html#TYPEtable)
```

```
val init_class : [table](CamlinternalOO.html#TYPEtable) -> unit
```

```
val inherits : [table](CamlinternalOO.html#TYPEtable) ->  
       string array ->  
       string array ->  
       string array ->  
       [t](CamlinternalOO.html#TYPEt) *  
       ([table](CamlinternalOO.html#TYPEtable) -> [obj](CamlinternalOO.html#TYPEobj) -> [Obj.t](Obj.html#TYPEt)) *  
       [t](CamlinternalOO.html#TYPEt) * [obj](CamlinternalOO.html#TYPEobj) -> bool -> [Obj.t](Obj.html#TYPEt) array
```

```
val make_class : string array ->  
       ([table](CamlinternalOO.html#TYPEtable) -> [Obj.t](Obj.html#TYPEt) -> [t](CamlinternalOO.html#TYPEt)) ->  
       [t](CamlinternalOO.html#TYPEt) *  
       ([table](CamlinternalOO.html#TYPEtable) -> [Obj.t](Obj.html#TYPEt) -> [t](CamlinternalOO.html#TYPEt)) *  
       ([Obj.t](Obj.html#TYPEt) -> [t](CamlinternalOO.html#TYPEt)) * [Obj.t](Obj.html#TYPEt)
```

```
type init_table 
```

```
val make_class_store : string array ->  
       ([table](CamlinternalOO.html#TYPEtable) -> [t](CamlinternalOO.html#TYPEt)) ->  
       [init_table](CamlinternalOO.html#TYPEinit_table) -> unit
```

```
val dummy_class : string * int * int ->  
       [t](CamlinternalOO.html#TYPEt) *  
       ([table](CamlinternalOO.html#TYPEtable) -> [Obj.t](Obj.html#TYPEt) -> [t](CamlinternalOO.html#TYPEt)) *  
       ([Obj.t](Obj.html#TYPEt) -> [t](CamlinternalOO.html#TYPEt)) * [Obj.t](Obj.html#TYPEt)
```
## Objects


```
val copy : (< .. > as 'a) -> 'a
```

```
val create_object : [table](CamlinternalOO.html#TYPEtable) -> [obj](CamlinternalOO.html#TYPEobj)
```

```
val create_object_opt : [obj](CamlinternalOO.html#TYPEobj) -> [table](CamlinternalOO.html#TYPEtable) -> [obj](CamlinternalOO.html#TYPEobj)
```

```
val run_initializers : [obj](CamlinternalOO.html#TYPEobj) -> [table](CamlinternalOO.html#TYPEtable) -> unit
```

```
val run_initializers_opt : [obj](CamlinternalOO.html#TYPEobj) ->  
       [obj](CamlinternalOO.html#TYPEobj) -> [table](CamlinternalOO.html#TYPEtable) -> [obj](CamlinternalOO.html#TYPEobj)
```

```
val create_object_and_run_initializers : [obj](CamlinternalOO.html#TYPEobj) -> [table](CamlinternalOO.html#TYPEtable) -> [obj](CamlinternalOO.html#TYPEobj)
```

```
val send : [obj](CamlinternalOO.html#TYPEobj) -> [tag](CamlinternalOO.html#TYPEtag) -> [t](CamlinternalOO.html#TYPEt)
```

```
val sendcache : [obj](CamlinternalOO.html#TYPEobj) ->  
       [tag](CamlinternalOO.html#TYPEtag) -> [t](CamlinternalOO.html#TYPEt) -> int -> [t](CamlinternalOO.html#TYPEt)
```

```
val sendself : [obj](CamlinternalOO.html#TYPEobj) -> [label](CamlinternalOO.html#TYPElabel) -> [t](CamlinternalOO.html#TYPEt)
```

```
val get_public_method : [obj](CamlinternalOO.html#TYPEobj) -> [tag](CamlinternalOO.html#TYPEtag) -> [closure](CamlinternalOO.html#TYPEclosure)
```
## Table cache


```
type tables 
```

```
val lookup_tables : [tables](CamlinternalOO.html#TYPEtables) ->  
       [closure](CamlinternalOO.html#TYPEclosure) array -> [tables](CamlinternalOO.html#TYPEtables)
```
## Builtins to reduce code size


```
type impl = 
```


| `|` | `GetConst` |
| --- | --- |
| `|` | `GetVar` |
| `|` | `GetEnv` |
| `|` | `GetMeth` |
| `|` | `SetVar` |
| `|` | `AppConst` |
| `|` | `AppVar` |
| `|` | `AppEnv` |
| `|` | `AppMeth` |
| `|` | `AppConstConst` |
| `|` | `AppConstVar` |
| `|` | `AppConstEnv` |
| `|` | `AppConstMeth` |
| `|` | `AppVarConst` |
| `|` | `AppEnvConst` |
| `|` | `AppMethConst` |
| `|` | `MethAppConst` |
| `|` | `MethAppVar` |
| `|` | `MethAppEnv` |
| `|` | `MethAppMeth` |
| `|` | `SendConst` |
| `|` | `SendVar` |
| `|` | `SendEnv` |
| `|` | `SendMeth` |
| `|` | `Closure of `[closure](CamlinternalOO.html#TYPEclosure)`` |

## Parameters


```
type params = {
```


|  | `mutable compact_table : `bool`;` |
| --- | --- |
|  | `mutable copy_parent : `bool`;` |
|  | `mutable clean_when_copying : `bool`;` |
|  | `mutable retry_count : `int`;` |
|  | `mutable bucket_small_size : `int`;` |

`}`
```
val params : [params](CamlinternalOO.html#TYPEparams)
```
## Statistics


```
type stats = {
```


|  | `classes : `int`;` |
| --- | --- |
|  | `methods : `int`;` |
|  | `inst_vars : `int`;` |

`}`
```
val stats : unit -> [stats](CamlinternalOO.html#TYPEstats)
```
