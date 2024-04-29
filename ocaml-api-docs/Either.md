# Module [Either](type_Either.html)


```
module Either: sig [..](Either.html) end
```


Either type.


Either is the simplest and most generic sum/variant type:
 a value of `('a, 'b) Either.t` is either a `Left (v : 'a)`
 or a `Right (v : 'b)`.


It is a natural choice in the API of generic functions where values
 could fall in two different cases, possibly at different types,
 without assigning a specific meaning to what each case should be.


For example:



```
List.partition_map:
    ('a -> ('b, 'c) Either.t) -> 'a list -> 'b list * 'c list
```

If you are looking for a parametrized type where
 one alternative means success and the other means failure,
 you should use the more specific type [`Result.t`](Result.html#TYPEt).



* **Since** 4.12




---


```
type `('a, 'b)` t = 
```


| `|` | `Left of `'a`` |
| --- | --- |
| `|` | `Right of `'b`` |



A value of `('a, 'b) Either.t` contains
 either a value of `'a` or a value of `'b`




```
val left : 'a -> ('a, 'b) [t](Either.html#TYPEt)
```


`left v` is `Left v`.




```
val right : 'b -> ('a, 'b) [t](Either.html#TYPEt)
```


`right v` is `Right v`.




```
val is_left : ('a, 'b) [t](Either.html#TYPEt) -> bool
```


`is_left (Left v)` is `true`, `is_left (Right v)` is `false`.




```
val is_right : ('a, 'b) [t](Either.html#TYPEt) -> bool
```


`is_right (Left v)` is `false`, `is_right (Right v)` is `true`.




```
val find_left : ('a, 'b) [t](Either.html#TYPEt) -> 'a option
```


`find_left (Left v)` is `Some v`, `find_left (Right _)` is `None`




```
val find_right : ('a, 'b) [t](Either.html#TYPEt) -> 'b option
```


`find_right (Right v)` is `Some v`, `find_right (Left _)` is `None`




```
val map_left : ('a1 -> 'a2) -> ('a1, 'b) [t](Either.html#TYPEt) -> ('a2, 'b) [t](Either.html#TYPEt)
```


`map_left f e` is `Left (f v)` if `e` is `Left v`
 and `e` if `e` is `Right _`.




```
val map_right : ('b1 -> 'b2) -> ('a, 'b1) [t](Either.html#TYPEt) -> ('a, 'b2) [t](Either.html#TYPEt)
```


`map_right f e` is `Right (f v)` if `e` is `Right v`
 and `e` if `e` is `Left _`.




```
val map : left:('a1 -> 'a2) ->  
       right:('b1 -> 'b2) -> ('a1, 'b1) [t](Either.html#TYPEt) -> ('a2, 'b2) [t](Either.html#TYPEt)
```


`map ~left ~right (Left v)` is `Left (left v)`,
 `map ~left ~right (Right v)` is `Right (right v)`.




```
val fold : left:('a -> 'c) -> right:('b -> 'c) -> ('a, 'b) [t](Either.html#TYPEt) -> 'c
```


`fold ~left ~right (Left v)` is `left v`, and
 `fold ~left ~right (Right v)` is `right v`.




```
val iter : left:('a -> unit) -> right:('b -> unit) -> ('a, 'b) [t](Either.html#TYPEt) -> unit
```


`iter ~left ~right (Left v)` is `left v`, and
 `iter ~left ~right (Right v)` is `right v`.




```
val for_all : left:('a -> bool) -> right:('b -> bool) -> ('a, 'b) [t](Either.html#TYPEt) -> bool
```


`for_all ~left ~right (Left v)` is `left v`, and
 `for_all ~left ~right (Right v)` is `right v`.




```
val equal : left:('a -> 'a -> bool) ->  
       right:('b -> 'b -> bool) -> ('a, 'b) [t](Either.html#TYPEt) -> ('a, 'b) [t](Either.html#TYPEt) -> bool
```


`equal ~left ~right e0 e1` tests equality of `e0` and `e1` using `left`
 and `right` to respectively compare values wrapped by `Left _` and
 `Right _`.




```
val compare : left:('a -> 'a -> int) ->  
       right:('b -> 'b -> int) -> ('a, 'b) [t](Either.html#TYPEt) -> ('a, 'b) [t](Either.html#TYPEt) -> int
```


`compare ~left ~right e0 e1` totally orders `e0` and `e1` using `left` and
 `right` to respectively compare values wrapped by `Left _` and `Right _`.
 `Left _` values are smaller than `Right _` values.



