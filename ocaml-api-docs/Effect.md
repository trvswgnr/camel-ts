# Module [Effect](type_Effect.html)


```
module Effect: sig [..](Effect.html) end
```

* **Alert unstable.** The Effect interface may change in incompatible ways in the future.




---

Effects.

See 'Language extensions/Effect handlers' section in the manual.


```
type `_` t = ..
```


The type of effects.




```
exception Unhandled : 'a [t](Effect.html#TYPEt) -> exn
```


`Unhandled e` is raised when effect `e` is performed and there is no
 handler for it.




```
exception Continuation_already_resumed
```


Exception raised when a continuation is continued or discontinued more
 than once.




```
val perform : 'a [t](Effect.html#TYPEt) -> 'a
```


`perform e` performs an effect `e`.



* **Raises** `Unhandled` if there is no handler for `e`.



```
module [Deep](Effect.Deep.html): sig [..](Effect.Deep.html) end
```

```
module [Shallow](Effect.Shallow.html): sig [..](Effect.Shallow.html) end
```
