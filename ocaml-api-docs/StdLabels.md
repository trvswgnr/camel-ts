# Module [StdLabels](type_StdLabels.html)


```
module StdLabels: sig [..](StdLabels.html) end
```


Standard labeled libraries.


This meta-module provides versions of the [`StdLabels.Array`](StdLabels.Array.html), [`StdLabels.Bytes`](StdLabels.Bytes.html),
 [`StdLabels.List`](StdLabels.List.html) and [`StdLabels.String`](StdLabels.String.html) modules where function arguments are
 systematically labeled. It is intended to be opened at the top of
 source files, as shown below.



```
     open StdLabels

     let to_upper = String.map ~f:Char.uppercase_ascii
     let seq len = List.init ~f:(fun i -> i) ~len
     let everything = Array.create_matrix ~dimx:42 ~dimy:42 42
   
```



---


```
module [Array](StdLabels.Array.html): [ArrayLabels](Stdlib.ArrayLabels.html)
```

```
module [Bytes](StdLabels.Bytes.html): [BytesLabels](Stdlib.BytesLabels.html)
```

```
module [List](StdLabels.List.html): [ListLabels](Stdlib.ListLabels.html)
```

```
module [String](StdLabels.String.html): [StringLabels](Stdlib.StringLabels.html)
```
