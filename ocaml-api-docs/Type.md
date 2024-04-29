# Module [Type](type_Type.html)


```
module Type: sig [..](Type.html) end
```


Type introspection.



* **Since** 5.1




---

## Type equality witness


```
type `(_, _)` eq = 
```


| `|` | `Equal : `('a, 'a) [eq](Type.html#TYPEeq)`` |
| --- | --- |



The purpose of `eq` is to represent type equalities that may not otherwise
 be known by the type checker (e.g. because they may depend on dynamic data).


A value of type `(a, b) eq` represents the fact that types `a` and `b` are
 equal.


If one has a value `eq : (a, b) eq` that proves types `a` and `b` are equal,
 one can use it to convert a value of type `a` to a value of type `b` by
 pattern matching on `Equal`:



```
      let cast (type a) (type b) (Equal : (a, b) Type.eq) (a : a) : b = a
    
```

At runtime, this function simply returns its second argument unchanged.



## Type identifiers


```
module [Id](Type.Id.html): sig [..](Type.Id.html) end
```

Type identifiers.


