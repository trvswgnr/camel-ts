# Module [CamlinternalLazy](type_CamlinternalLazy.html)


```
module CamlinternalLazy: sig [..](CamlinternalLazy.html) end
```


Run-time support for lazy values.
 All functions in this module are for system use only, not for the
 casual user.





---


```
type `'a` t = 'a lazy_t 
```

```
exception Undefined
```

```
val force_lazy_block : 'a lazy_t -> 'a
```

```
val force_gen : only_val:bool -> 'a lazy_t -> 'a
```
