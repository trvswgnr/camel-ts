# Module [MoreLabels](type_MoreLabels.html)


```
module MoreLabels: sig [..](MoreLabels.html) end
```


Extra labeled libraries.


This meta-module provides labelized versions of the [`MoreLabels.Hashtbl`](MoreLabels.Hashtbl.html), [`MoreLabels.Map`](MoreLabels.Map.html) and
 [`MoreLabels.Set`](MoreLabels.Set.html) modules.


This module is intended to be used through `open MoreLabels` which replaces
 [`MoreLabels.Hashtbl`](MoreLabels.Hashtbl.html), [`MoreLabels.Map`](MoreLabels.Map.html), and [`MoreLabels.Set`](MoreLabels.Set.html) with their labeled counterparts.


For example:



```
     open MoreLabels

     Hashtbl.iter ~f:(fun ~key ~data -> g key data) table
   
```



---


```
module [Hashtbl](MoreLabels.Hashtbl.html): sig [..](MoreLabels.Hashtbl.html) end
```

```
module [Map](MoreLabels.Map.html): sig [..](MoreLabels.Map.html) end
```

```
module [Set](MoreLabels.Set.html): sig [..](MoreLabels.Set.html) end
```
