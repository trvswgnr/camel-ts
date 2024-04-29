# Module [CamlinternalFormat](type_CamlinternalFormat.html)


```
module CamlinternalFormat: sig [..](CamlinternalFormat.html) end
```


---


```
val is_in_char_set : [CamlinternalFormatBasics.char_set](CamlinternalFormatBasics.html#TYPEchar_set) -> char -> bool
```

```
val rev_char_set : [CamlinternalFormatBasics.char_set](CamlinternalFormatBasics.html#TYPEchar_set) -> [CamlinternalFormatBasics.char_set](CamlinternalFormatBasics.html#TYPEchar_set)
```

```
type mutable_char_set = bytes 
```

```
val create_char_set : unit -> [mutable_char_set](CamlinternalFormat.html#TYPEmutable_char_set)
```

```
val add_in_char_set : [mutable_char_set](CamlinternalFormat.html#TYPEmutable_char_set) -> char -> unit
```

```
val freeze_char_set : [mutable_char_set](CamlinternalFormat.html#TYPEmutable_char_set) -> [CamlinternalFormatBasics.char_set](CamlinternalFormatBasics.html#TYPEchar_set)
```

```
type `('a, 'b, 'c, 'd, 'e, 'f)` param_format_ebb = 
```


| `|` | `Param_format_EBB : `('x -> 'a0, 'b0, 'c0, 'd0, 'e0, 'f0) [CamlinternalFormatBasics.fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('a0, 'b0, 'c0, 'd0, 'e0, 'f0) [param_format_ebb](CamlinternalFormat.html#TYPEparam_format_ebb)`` |
| --- | --- |


```
val param_format_of_ignored_format : ('a, 'b, 'c, 'd, 'y, 'x) [CamlinternalFormatBasics.ignored](CamlinternalFormatBasics.html#TYPEignored) ->  
       ('x, 'b, 'c, 'y, 'e, 'f) [CamlinternalFormatBasics.fmt](CamlinternalFormatBasics.html#TYPEfmt) ->  
       ('a, 'b, 'c, 'd, 'e, 'f) [param_format_ebb](CamlinternalFormat.html#TYPEparam_format_ebb)
```

```
type `('b, 'c)` acc_formatting_gen = 
```


| `|` | `Acc_open_tag of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc)`` |
| --- | --- |
| `|` | `Acc_open_box of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc)`` |


```
type `('b, 'c)` acc = 
```


| `|` | `Acc_formatting_lit of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc) * [CamlinternalFormatBasics.formatting_lit](CamlinternalFormatBasics.html#TYPEformatting_lit)`` |
| --- | --- |
| `|` | `Acc_formatting_gen of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc) * ('b, 'c) [acc_formatting_gen](CamlinternalFormat.html#TYPEacc_formatting_gen)`` |
| `|` | `Acc_string_literal of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc) * string`` |
| `|` | `Acc_char_literal of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc) * char`` |
| `|` | `Acc_data_string of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc) * string`` |
| `|` | `Acc_data_char of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc) * char`` |
| `|` | `Acc_delay of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc) * ('b -> 'c)`` |
| `|` | `Acc_flush of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc)`` |
| `|` | `Acc_invalid_arg of `('b, 'c) [acc](CamlinternalFormat.html#TYPEacc) * string`` |
| `|` | `End_of_acc` |


```
type `('a, 'b)` heter_list = 
```


| `|` | `Cons : `'c * ('a0, 'b0) [heter_list](CamlinternalFormat.html#TYPEheter_list)` -> `('c -> 'a0, 'b0) [heter_list](CamlinternalFormat.html#TYPEheter_list)`` |
| --- | --- |
| `|` | `Nil : `('b1, 'b1) [heter_list](CamlinternalFormat.html#TYPEheter_list)`` |


```
type `('b, 'c, 'e, 'f)` fmt_ebb = 
```


| `|` | `Fmt_EBB : `('a, 'b0, 'c0, 'd, 'e0, 'f0) [CamlinternalFormatBasics.fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('b0, 'c0, 'e0, 'f0) [fmt_ebb](CamlinternalFormat.html#TYPEfmt_ebb)`` |
| --- | --- |


```
val make_printf : (('b, 'c) [acc](CamlinternalFormat.html#TYPEacc) -> 'd) ->  
       ('b, 'c) [acc](CamlinternalFormat.html#TYPEacc) ->  
       ('a, 'b, 'c, 'c, 'c, 'd) [CamlinternalFormatBasics.fmt](CamlinternalFormatBasics.html#TYPEfmt) -> 'a
```

```
val make_iprintf : ('s -> 'f) ->  
       's -> ('a, 'b, 'c, 'd, 'e, 'f) [CamlinternalFormatBasics.fmt](CamlinternalFormatBasics.html#TYPEfmt) -> 'a
```

```
val output_acc : [out_channel](Stdlib.html#TYPEout_channel) ->  
       ([out_channel](Stdlib.html#TYPEout_channel), unit) [acc](CamlinternalFormat.html#TYPEacc) -> unit
```

```
val bufput_acc : [Buffer.t](Buffer.html#TYPEt) -> ([Buffer.t](Buffer.html#TYPEt), unit) [acc](CamlinternalFormat.html#TYPEacc) -> unit
```

```
val strput_acc : [Buffer.t](Buffer.html#TYPEt) -> (unit, string) [acc](CamlinternalFormat.html#TYPEacc) -> unit
```

```
val type_format : ('x, 'b, 'c, 't, 'u, 'v) [CamlinternalFormatBasics.fmt](CamlinternalFormatBasics.html#TYPEfmt) ->  
       ('a, 'b, 'c, 'd, 'e, 'f) [CamlinternalFormatBasics.fmtty](CamlinternalFormatBasics.html#TYPEfmtty) ->  
       ('a, 'b, 'c, 'd, 'e, 'f) [CamlinternalFormatBasics.fmt](CamlinternalFormatBasics.html#TYPEfmt)
```

```
val fmt_ebb_of_string : ?legacy_behavior:bool ->  
       string -> ('b, 'c, 'e, 'f) [fmt_ebb](CamlinternalFormat.html#TYPEfmt_ebb)
```

```
val format_of_string_fmtty : string ->  
       ('a, 'b, 'c, 'd, 'e, 'f) [CamlinternalFormatBasics.fmtty](CamlinternalFormatBasics.html#TYPEfmtty) ->  
       ('a, 'b, 'c, 'd, 'e, 'f) [CamlinternalFormatBasics.format6](CamlinternalFormatBasics.html#TYPEformat6)
```

```
val format_of_string_format : string ->  
       ('a, 'b, 'c, 'd, 'e, 'f) [CamlinternalFormatBasics.format6](CamlinternalFormatBasics.html#TYPEformat6) ->  
       ('a, 'b, 'c, 'd, 'e, 'f) [CamlinternalFormatBasics.format6](CamlinternalFormatBasics.html#TYPEformat6)
```

```
val char_of_iconv : [CamlinternalFormatBasics.int_conv](CamlinternalFormatBasics.html#TYPEint_conv) -> char
```

```
val string_of_formatting_lit : [CamlinternalFormatBasics.formatting_lit](CamlinternalFormatBasics.html#TYPEformatting_lit) -> string
```

```
val string_of_fmtty : ('a, 'b, 'c, 'd, 'e, 'f) [CamlinternalFormatBasics.fmtty](CamlinternalFormatBasics.html#TYPEfmtty) -> string
```

```
val string_of_fmt : ('a, 'b, 'c, 'd, 'e, 'f) [CamlinternalFormatBasics.fmt](CamlinternalFormatBasics.html#TYPEfmt) -> string
```

```
val open_box_of_string : string -> int * [CamlinternalFormatBasics.block_type](CamlinternalFormatBasics.html#TYPEblock_type)
```

```
val symm : ('a1, 'b1, 'c1, 'd1, 'e1, 'f1, 'a2, 'b2, 'c2, 'd2, 'e2, 'f2)  
       [CamlinternalFormatBasics.fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) ->  
       ('a2, 'b2, 'c2, 'd2, 'e2, 'f2, 'a1, 'b1, 'c1, 'd1, 'e1, 'f1)  
       [CamlinternalFormatBasics.fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)
```

```
val trans : ('a1, 'b1, 'c1, 'd1, 'e1, 'f1, 'a2, 'b2, 'c2, 'd2, 'e2, 'f2)  
       [CamlinternalFormatBasics.fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) ->  
       ('a2, 'b2, 'c2, 'd2, 'e2, 'f2, 'a3, 'b3, 'c3, 'd3, 'e3, 'f3)  
       [CamlinternalFormatBasics.fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) ->  
       ('a1, 'b1, 'c1, 'd1, 'e1, 'f1, 'a3, 'b3, 'c3, 'd3, 'e3, 'f3)  
       [CamlinternalFormatBasics.fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)
```

```
val recast : ('a1, 'b1, 'c1, 'd1, 'e1, 'f1) [CamlinternalFormatBasics.fmt](CamlinternalFormatBasics.html#TYPEfmt) ->  
       ('a1, 'b1, 'c1, 'd1, 'e1, 'f1, 'a2, 'b2, 'c2, 'd2, 'e2, 'f2)  
       [CamlinternalFormatBasics.fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) ->  
       ('a2, 'b2, 'c2, 'd2, 'e2, 'f2) [CamlinternalFormatBasics.fmt](CamlinternalFormatBasics.html#TYPEfmt)
```
