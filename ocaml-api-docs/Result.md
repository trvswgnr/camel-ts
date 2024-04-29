# Module [Result](type_Result.html)


```
module Result: sig [..](Result.html) end
```


Result values.


Result values handle computation results and errors in an explicit
 and declarative manner without resorting to exceptions.



* **Since** 4.08




---

## Results


```
type `('a, 'e)` t = ('a, 'e) [result](Stdlib.html#TYPEresult) = 
```


| `|` | `Ok of `'a`` |
| --- | --- |
| `|` | `Error of `'e`` |



The type for result values. Either a value `Ok v` or an error `Error e`.




```
val ok : 'a -> ('a, 'e) [result](Stdlib.html#TYPEresult)
```


`ok v` is `Ok v`.




```
val error : 'e -> ('a, 'e) [result](Stdlib.html#TYPEresult)
```


`error e` is `Error e`.




```
val value : ('a, 'e) [result](Stdlib.html#TYPEresult) -> default:'a -> 'a
```


`value r ~default` is `v` if `r` is `Ok v` and `default` otherwise.




```
val get_ok : ('a, 'e) [result](Stdlib.html#TYPEresult) -> 'a
```


`get_ok r` is `v` if `r` is `Ok v` and raise otherwise.



* **Raises** `Invalid_argument` if `r` is `Error _`.



```
val get_error : ('a, 'e) [result](Stdlib.html#TYPEresult) -> 'e
```


`get_error r` is `e` if `r` is `Error e` and raise otherwise.



* **Raises** `Invalid_argument` if `r` is `Ok _`.



```
val bind : ('a, 'e) [result](Stdlib.html#TYPEresult) ->  
       ('a -> ('b, 'e) [result](Stdlib.html#TYPEresult)) -> ('b, 'e) [result](Stdlib.html#TYPEresult)
```


`bind r f` is `f v` if `r` is `Ok v` and `r` if `r` is `Error _`.




```
val join : (('a, 'e) [result](Stdlib.html#TYPEresult), 'e) [result](Stdlib.html#TYPEresult) -> ('a, 'e) [result](Stdlib.html#TYPEresult)
```


`join rr` is `r` if `rr` is `Ok r` and `rr` if `rr` is `Error _`.




```
val map : ('a -> 'b) -> ('a, 'e) [result](Stdlib.html#TYPEresult) -> ('b, 'e) [result](Stdlib.html#TYPEresult)
```


`map f r` is `Ok (f v)` if `r` is `Ok v` and `r` if `r` is `Error _`.




```
val map_error : ('e -> 'f) -> ('a, 'e) [result](Stdlib.html#TYPEresult) -> ('a, 'f) [result](Stdlib.html#TYPEresult)
```


`map_error f r` is `Error (f e)` if `r` is `Error e` and `r` if
 `r` is `Ok _`.




```
val fold : ok:('a -> 'c) -> error:('e -> 'c) -> ('a, 'e) [result](Stdlib.html#TYPEresult) -> 'c
```


`fold ~ok ~error r` is `ok v` if `r` is `Ok v` and `error e` if `r`
 is `Error e`.




```
val iter : ('a -> unit) -> ('a, 'e) [result](Stdlib.html#TYPEresult) -> unit
```


`iter f r` is `f v` if `r` is `Ok v` and `()` otherwise.




```
val iter_error : ('e -> unit) -> ('a, 'e) [result](Stdlib.html#TYPEresult) -> unit
```


`iter_error f r` is `f e` if `r` is `Error e` and `()` otherwise.



## Predicates and comparisons


```
val is_ok : ('a, 'e) [result](Stdlib.html#TYPEresult) -> bool
```


`is_ok r` is `true` if and only if `r` is `Ok _`.




```
val is_error : ('a, 'e) [result](Stdlib.html#TYPEresult) -> bool
```


`is_error r` is `true` if and only if `r` is `Error _`.




```
val equal : ok:('a -> 'a -> bool) ->  
       error:('e -> 'e -> bool) ->  
       ('a, 'e) [result](Stdlib.html#TYPEresult) -> ('a, 'e) [result](Stdlib.html#TYPEresult) -> bool
```


`equal ~ok ~error r0 r1` tests equality of `r0` and `r1` using `ok`
 and `error` to respectively compare values wrapped by `Ok _` and
 `Error _`.




```
val compare : ok:('a -> 'a -> int) ->  
       error:('e -> 'e -> int) ->  
       ('a, 'e) [result](Stdlib.html#TYPEresult) -> ('a, 'e) [result](Stdlib.html#TYPEresult) -> int
```


`compare ~ok ~error r0 r1` totally orders `r0` and `r1` using `ok` and
 `error` to respectively compare values wrapped by `Ok _` and `Error _`.
 `Ok _` values are smaller than `Error _` values.



## Converting


```
val to_option : ('a, 'e) [result](Stdlib.html#TYPEresult) -> 'a option
```


`to_option r` is `r` as an option, mapping `Ok v` to `Some v` and
 `Error _` to `None`.




```
val to_list : ('a, 'e) [result](Stdlib.html#TYPEresult) -> 'a list
```


`to_list r` is `[v]` if `r` is `Ok v` and `[]` otherwise.




```
val to_seq : ('a, 'e) [result](Stdlib.html#TYPEresult) -> 'a [Seq.t](Seq.html#TYPEt)
```


`to_seq r` is `r` as a sequence. `Ok v` is the singleton sequence
 containing `v` and `Error _` is the empty sequence.



