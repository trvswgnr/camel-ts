# Module [Set](type_Set.html)


```
module Set: sig [..](Set.html) end
```


Sets over ordered types.


This module implements the set data structure, given a total ordering
 function over the set elements. All operations over sets
 are purely applicative (no side-effects).
 The implementation uses balanced binary trees, and is therefore
 reasonably efficient: insertion and membership take time
 logarithmic in the size of the set, for instance.


The [`Set.Make`](Set.Make.html) functor constructs implementations for any type, given a
 `compare` function.
 For instance:



```
     module IntPairs =
       struct
         type t = int * int
         let compare (x0,y0) (x1,y1) =
           match Stdlib.compare x0 x1 with
               0 -> Stdlib.compare y0 y1
             | c -> c
       end

     module PairsSet = Set.Make(IntPairs)

     let m = PairsSet.(empty |> add (2,3) |> add (5,7) |> add (11,13))
   
```

This creates a new module `PairsSet`, with a new type `PairsSet.t`
 of sets of `int * int`.





---


```
module type [OrderedType](Set.OrderedType.html) = sig [..](Set.OrderedType.html) end
```

Input signature of the functor [`Set.Make`](Set.Make.html).



```
module type [S](Set.S.html) = sig [..](Set.S.html) end
```

Output signature of the functor [`Set.Make`](Set.Make.html).



```
module [Make](Set.Make.html): `functor (``Ord``:``[OrderedType](Set.OrderedType.html)``) ->``[S](Set.S.html)` `with type elt = Ord.t`
```

Functor building an implementation of the set structure
 given a totally ordered type.


