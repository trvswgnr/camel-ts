# Module [CamlinternalFormatBasics](type_CamlinternalFormatBasics.html)


```
module CamlinternalFormatBasics: sig [..](CamlinternalFormatBasics.html) end
```


---


```
type padty = 
```


| `|` | `Left` |
| --- | --- |
| `|` | `Right` |
| `|` | `Zeros` |


```
type int_conv = 
```


| `|` | `Int_d` |
| --- | --- |
| `|` | `Int_pd` |
| `|` | `Int_sd` |
| `|` | `Int_i` |
| `|` | `Int_pi` |
| `|` | `Int_si` |
| `|` | `Int_x` |
| `|` | `Int_Cx` |
| `|` | `Int_X` |
| `|` | `Int_CX` |
| `|` | `Int_o` |
| `|` | `Int_Co` |
| `|` | `Int_u` |
| `|` | `Int_Cd` |
| `|` | `Int_Ci` |
| `|` | `Int_Cu` |


```
type float_flag_conv = 
```


| `|` | `Float_flag_` |
| --- | --- |
| `|` | `Float_flag_p` |
| `|` | `Float_flag_s` |


```
type float_kind_conv = 
```


| `|` | `Float_f` |
| --- | --- |
| `|` | `Float_e` |
| `|` | `Float_E` |
| `|` | `Float_g` |
| `|` | `Float_G` |
| `|` | `Float_F` |
| `|` | `Float_h` |
| `|` | `Float_H` |
| `|` | `Float_CF` |


```
type float_conv = [float_flag_conv](CamlinternalFormatBasics.html#TYPEfloat_flag_conv) *  
       [float_kind_conv](CamlinternalFormatBasics.html#TYPEfloat_kind_conv) 
```

```
type char_set = string 
```

```
type counter = 
```


| `|` | `Line_counter` |
| --- | --- |
| `|` | `Char_counter` |
| `|` | `Token_counter` |


```
type `('a, 'b)` padding = 
```


| `|` | `No_padding : `('a0, 'a0) [padding](CamlinternalFormatBasics.html#TYPEpadding)`` |
| --- | --- |
| `|` | `Lit_padding : `[padty](CamlinternalFormatBasics.html#TYPEpadty) * int` -> `('a1, 'a1) [padding](CamlinternalFormatBasics.html#TYPEpadding)`` |
| `|` | `Arg_padding : `[padty](CamlinternalFormatBasics.html#TYPEpadty)` -> `(int -> 'a2, 'a2) [padding](CamlinternalFormatBasics.html#TYPEpadding)`` |


```
type pad_option = int option 
```

```
type `('a, 'b)` precision = 
```


| `|` | `No_precision : `('a0, 'a0) [precision](CamlinternalFormatBasics.html#TYPEprecision)`` |
| --- | --- |
| `|` | `Lit_precision : `int` -> `('a1, 'a1) [precision](CamlinternalFormatBasics.html#TYPEprecision)`` |
| `|` | `Arg_precision : `(int -> 'a2, 'a2) [precision](CamlinternalFormatBasics.html#TYPEprecision)`` |


```
type prec_option = int option 
```

```
type `('a, 'b, 'c)` custom_arity = 
```


| `|` | `Custom_zero : `('a0, string, 'a0) [custom_arity](CamlinternalFormatBasics.html#TYPEcustom_arity)`` |
| --- | --- |
| `|` | `Custom_succ : `('a1, 'b0, 'c0) [custom_arity](CamlinternalFormatBasics.html#TYPEcustom_arity)` -> `('a1, 'x -> 'b0, 'x -> 'c0) [custom_arity](CamlinternalFormatBasics.html#TYPEcustom_arity)`` |


```
type block_type = 
```


| `|` | `Pp_hbox` |
| --- | --- |
| `|` | `Pp_vbox` |
| `|` | `Pp_hvbox` |
| `|` | `Pp_hovbox` |
| `|` | `Pp_box` |
| `|` | `Pp_fits` |


```
type formatting_lit = 
```


| `|` | `Close_box` |
| --- | --- |
| `|` | `Close_tag` |
| `|` | `Break of `string * int * int`` |
| `|` | `FFlush` |
| `|` | `Force_newline` |
| `|` | `Flush_newline` |
| `|` | `Magic_size of `string * int`` |
| `|` | `Escaped_at` |
| `|` | `Escaped_percent` |
| `|` | `Scan_indic of `char`` |


```
type `('a, 'b, 'c, 'd, 'e, 'f)` formatting_gen = 
```


| `|` | `Open_tag : `('a0, 'b0, 'c0, 'd0, 'e0, 'f0) [format6](CamlinternalFormatBasics.html#TYPEformat6)` -> `('a0, 'b0, 'c0, 'd0, 'e0, 'f0) [formatting_gen](CamlinternalFormatBasics.html#TYPEformatting_gen)`` |
| --- | --- |
| `|` | `Open_box : `('a1, 'b1, 'c1, 'd1, 'e1, 'f1) [format6](CamlinternalFormatBasics.html#TYPEformat6)` -> `('a1, 'b1, 'c1, 'd1, 'e1, 'f1) [formatting_gen](CamlinternalFormatBasics.html#TYPEformatting_gen)`` |


```
type `('a, 'b, 'c, 'd, 'e, 'f)` fmtty = ('a, 'b, 'c, 'd, 'e, 'f, 'a, 'b, 'c, 'd, 'e, 'f)  
       [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) 
```

```
type `('a1, 'b1, 'c1, 'd1, 'e1, 'f1, 'a2, 'b2, 'c2, 'd2, 'e2, 'f2)` fmtty_rel = 
```


| `|` | `Char_ty : `('a10, 'b10, 'c10, 'd10, 'e10, 'f10, 'a20, 'b20, 'c20, 'd20, 'e20, 'f20) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(char -> 'a10, 'b10, 'c10, 'd10, 'e10, 'f10, char -> 'a20, 'b20, 'c20, 'd20, 'e20, 'f20) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| --- | --- |
| `|` | `String_ty : `('a11, 'b11, 'c11, 'd11, 'e11, 'f11, 'a21, 'b21, 'c21, 'd21, 'e21, 'f21) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(string -> 'a11, 'b11, 'c11, 'd11, 'e11, 'f11, string -> 'a21, 'b21, 'c21, 'd21, 'e21, 'f21) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Int_ty : `('a12, 'b12, 'c12, 'd12, 'e12, 'f12, 'a22, 'b22, 'c22, 'd22, 'e22, 'f22) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(int -> 'a12, 'b12, 'c12, 'd12, 'e12, 'f12, int -> 'a22, 'b22, 'c22, 'd22, 'e22, 'f22) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Int32_ty : `('a13, 'b13, 'c13, 'd13, 'e13, 'f13, 'a23, 'b23, 'c23, 'd23, 'e23, 'f23) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(int32 -> 'a13, 'b13, 'c13, 'd13, 'e13, 'f13, int32 -> 'a23, 'b23, 'c23, 'd23, 'e23, 'f23) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Nativeint_ty : `('a14, 'b14, 'c14, 'd14, 'e14, 'f14, 'a24, 'b24, 'c24, 'd24, 'e24, 'f24) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(nativeint -> 'a14, 'b14, 'c14, 'd14, 'e14, 'f14, nativeint -> 'a24, 'b24, 'c24, 'd24, 'e24, 'f24) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Int64_ty : `('a15, 'b15, 'c15, 'd15, 'e15, 'f15, 'a25, 'b25, 'c25, 'd25, 'e25, 'f25) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(int64 -> 'a15, 'b15, 'c15, 'd15, 'e15, 'f15, int64 -> 'a25, 'b25, 'c25, 'd25, 'e25, 'f25) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Float_ty : `('a16, 'b16, 'c16, 'd16, 'e16, 'f16, 'a26, 'b26, 'c26, 'd26, 'e26, 'f26) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(float -> 'a16, 'b16, 'c16, 'd16, 'e16, 'f16, float -> 'a26, 'b26, 'c26, 'd26, 'e26, 'f26) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Bool_ty : `('a17, 'b17, 'c17, 'd17, 'e17, 'f17, 'a27, 'b27, 'c27, 'd27, 'e27, 'f27) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(bool -> 'a17, 'b17, 'c17, 'd17, 'e17, 'f17, bool -> 'a27, 'b27, 'c27, 'd27, 'e27, 'f27) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Format_arg_ty : `('g, 'h, 'i, 'j, 'k, 'l) [fmtty](CamlinternalFormatBasics.html#TYPEfmtty) * ('a18, 'b18, 'c18, 'd18, 'e18, 'f18, 'a28, 'b28, 'c28, 'd28, 'e28, 'f28) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(('g, 'h, 'i, 'j, 'k, 'l) [format6](CamlinternalFormatBasics.html#TYPEformat6) -> 'a18, 'b18, 'c18, 'd18, 'e18, 'f18, ('g, 'h, 'i, 'j, 'k, 'l) [format6](CamlinternalFormatBasics.html#TYPEformat6) -> 'a28, 'b28, 'c28, 'd28, 'e28, 'f28) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Format_subst_ty : `('g0, 'h0, 'i0, 'j0, 'k0, 'l0, 'g1, 'b19, 'c19, 'j1, 'd19, 'a19) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) * ('g0, 'h0, 'i0, 'j0, 'k0, 'l0, 'g2, 'b29, 'c29, 'j2, 'd29, 'a29) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) * ('a19, 'b19, 'c19, 'd19, 'e19, 'f19, 'a29, 'b29, 'c29, 'd29, 'e29, 'f29) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(('g0, 'h0, 'i0, 'j0, 'k0, 'l0) [format6](CamlinternalFormatBasics.html#TYPEformat6) -> 'g1, 'b19, 'c19, 'j1, 'e19, 'f19, ('g0, 'h0, 'i0, 'j0, 'k0, 'l0) [format6](CamlinternalFormatBasics.html#TYPEformat6) -> 'g2, 'b29, 'c29, 'j2, 'e29, 'f29) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Alpha_ty : `('a110, 'b110, 'c110, 'd110, 'e110, 'f110, 'a210, 'b210, 'c210, 'd210, 'e210, 'f210) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(('b110 -> 'x -> 'c110) -> 'x -> 'a110, 'b110, 'c110, 'd110, 'e110, 'f110, ('b210 -> 'x -> 'c210) -> 'x -> 'a210, 'b210, 'c210, 'd210, 'e210, 'f210) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Theta_ty : `('a111, 'b111, 'c111, 'd111, 'e111, 'f111, 'a211, 'b211, 'c211, 'd211, 'e211, 'f211) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `(('b111 -> 'c111) -> 'a111, 'b111, 'c111, 'd111, 'e111, 'f111, ('b211 -> 'c211) -> 'a211, 'b211, 'c211, 'd211, 'e211, 'f211) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Any_ty : `('a112, 'b112, 'c112, 'd112, 'e112, 'f112, 'a212, 'b212, 'c212, 'd212, 'e212, 'f212) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `('x0 -> 'a112, 'b112, 'c112, 'd112, 'e112, 'f112, 'x0 -> 'a212, 'b212, 'c212, 'd212, 'e212, 'f212) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Reader_ty : `('a113, 'b113, 'c113, 'd113, 'e113, 'f113, 'a213, 'b213, 'c213, 'd213, 'e213, 'f213) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `('x1 -> 'a113, 'b113, 'c113, ('b113 -> 'x1) -> 'd113, 'e113, 'f113, 'x1 -> 'a213, 'b213, 'c213, ('b213 -> 'x1) -> 'd213, 'e213, 'f213) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `Ignored_reader_ty : `('a114, 'b114, 'c114, 'd114, 'e114, 'f114, 'a214, 'b214, 'c214, 'd214, 'e214, 'f214) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)` -> `('a114, 'b114, 'c114, ('b114 -> 'x2) -> 'd114, 'e114, 'f114, 'a214, 'b214, 'c214, ('b214 -> 'x2) -> 'd214, 'e214, 'f214) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |
| `|` | `End_of_fmtty : `('f115, 'b115, 'c115, 'd115, 'd115, 'f115, 'f215, 'b215, 'c215, 'd215, 'd215, 'f215) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)`` |


```
type `('a, 'b, 'c, 'd, 'e, 'f)` fmt = 
```


| `|` | `Char : `('a0, 'b0, 'c0, 'd0, 'e0, 'f0) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `(char -> 'a0, 'b0, 'c0, 'd0, 'e0, 'f0) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| --- | --- |
| `|` | `Caml_char : `('a1, 'b1, 'c1, 'd1, 'e1, 'f1) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `(char -> 'a1, 'b1, 'c1, 'd1, 'e1, 'f1) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `String : `('x, string -> 'a2) [padding](CamlinternalFormatBasics.html#TYPEpadding) * ('a2, 'b2, 'c2, 'd2, 'e2, 'f2) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('x, 'b2, 'c2, 'd2, 'e2, 'f2) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Caml_string : `('x0, string -> 'a3) [padding](CamlinternalFormatBasics.html#TYPEpadding) * ('a3, 'b3, 'c3, 'd3, 'e3, 'f3) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('x0, 'b3, 'c3, 'd3, 'e3, 'f3) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Int : `[int_conv](CamlinternalFormatBasics.html#TYPEint_conv) * ('x1, 'y) [padding](CamlinternalFormatBasics.html#TYPEpadding) * ('y, int -> 'a4) [precision](CamlinternalFormatBasics.html#TYPEprecision) * ('a4, 'b4, 'c4, 'd4, 'e4, 'f4) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('x1, 'b4, 'c4, 'd4, 'e4, 'f4) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Int32 : `[int_conv](CamlinternalFormatBasics.html#TYPEint_conv) * ('x2, 'y0) [padding](CamlinternalFormatBasics.html#TYPEpadding) * ('y0, int32 -> 'a5) [precision](CamlinternalFormatBasics.html#TYPEprecision) * ('a5, 'b5, 'c5, 'd5, 'e5, 'f5) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('x2, 'b5, 'c5, 'd5, 'e5, 'f5) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Nativeint : `[int_conv](CamlinternalFormatBasics.html#TYPEint_conv) * ('x3, 'y1) [padding](CamlinternalFormatBasics.html#TYPEpadding) * ('y1, nativeint -> 'a6) [precision](CamlinternalFormatBasics.html#TYPEprecision) * ('a6, 'b6, 'c6, 'd6, 'e6, 'f6) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('x3, 'b6, 'c6, 'd6, 'e6, 'f6) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Int64 : `[int_conv](CamlinternalFormatBasics.html#TYPEint_conv) * ('x4, 'y2) [padding](CamlinternalFormatBasics.html#TYPEpadding) * ('y2, int64 -> 'a7) [precision](CamlinternalFormatBasics.html#TYPEprecision) * ('a7, 'b7, 'c7, 'd7, 'e7, 'f7) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('x4, 'b7, 'c7, 'd7, 'e7, 'f7) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Float : `[float_conv](CamlinternalFormatBasics.html#TYPEfloat_conv) * ('x5, 'y3) [padding](CamlinternalFormatBasics.html#TYPEpadding) * ('y3, float -> 'a8) [precision](CamlinternalFormatBasics.html#TYPEprecision) * ('a8, 'b8, 'c8, 'd8, 'e8, 'f8) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('x5, 'b8, 'c8, 'd8, 'e8, 'f8) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Bool : `('x6, bool -> 'a9) [padding](CamlinternalFormatBasics.html#TYPEpadding) * ('a9, 'b9, 'c9, 'd9, 'e9, 'f9) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('x6, 'b9, 'c9, 'd9, 'e9, 'f9) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Flush : `('a10, 'b10, 'c10, 'd10, 'e10, 'f10) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('a10, 'b10, 'c10, 'd10, 'e10, 'f10) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `String_literal : `string * ('a11, 'b11, 'c11, 'd11, 'e11, 'f11) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('a11, 'b11, 'c11, 'd11, 'e11, 'f11) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Char_literal : `char * ('a12, 'b12, 'c12, 'd12, 'e12, 'f12) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('a12, 'b12, 'c12, 'd12, 'e12, 'f12) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Format_arg : `[pad_option](CamlinternalFormatBasics.html#TYPEpad_option) * ('g, 'h, 'i, 'j, 'k, 'l) [fmtty](CamlinternalFormatBasics.html#TYPEfmtty) * ('a13, 'b13, 'c13, 'd13, 'e13, 'f13) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `(('g, 'h, 'i, 'j, 'k, 'l) [format6](CamlinternalFormatBasics.html#TYPEformat6) -> 'a13, 'b13, 'c13, 'd13, 'e13, 'f13) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Format_subst : `[pad_option](CamlinternalFormatBasics.html#TYPEpad_option) * ('g0, 'h0, 'i0, 'j0, 'k0, 'l0, 'g2, 'b14, 'c14, 'j2, 'd14, 'a14) [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) * ('a14, 'b14, 'c14, 'd14, 'e14, 'f14) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `(('g0, 'h0, 'i0, 'j0, 'k0, 'l0) [format6](CamlinternalFormatBasics.html#TYPEformat6) -> 'g2, 'b14, 'c14, 'j2, 'e14, 'f14) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Alpha : `('a15, 'b15, 'c15, 'd15, 'e15, 'f15) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `(('b15 -> 'x7 -> 'c15) -> 'x7 -> 'a15, 'b15, 'c15, 'd15, 'e15, 'f15) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Theta : `('a16, 'b16, 'c16, 'd16, 'e16, 'f16) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `(('b16 -> 'c16) -> 'a16, 'b16, 'c16, 'd16, 'e16, 'f16) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Formatting_lit : `[formatting_lit](CamlinternalFormatBasics.html#TYPEformatting_lit) * ('a17, 'b17, 'c17, 'd17, 'e17, 'f17) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('a17, 'b17, 'c17, 'd17, 'e17, 'f17) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Formatting_gen : `('a18, 'b18, 'c18, 'd18, 'e18, 'f18) [formatting_gen](CamlinternalFormatBasics.html#TYPEformatting_gen) * ('f18, 'b18, 'c18, 'e18, 'e20, 'f20) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('a18, 'b18, 'c18, 'd18, 'e20, 'f20) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Reader : `('a19, 'b19, 'c19, 'd19, 'e19, 'f19) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('x8 -> 'a19, 'b19, 'c19, ('b19 -> 'x8) -> 'd19, 'e19, 'f19) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Scan_char_set : `[pad_option](CamlinternalFormatBasics.html#TYPEpad_option) * [char_set](CamlinternalFormatBasics.html#TYPEchar_set) * ('a20, 'b20, 'c20, 'd20, 'e21, 'f21) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `(string -> 'a20, 'b20, 'c20, 'd20, 'e21, 'f21) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Scan_get_counter : `[counter](CamlinternalFormatBasics.html#TYPEcounter) * ('a21, 'b21, 'c21, 'd21, 'e22, 'f22) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `(int -> 'a21, 'b21, 'c21, 'd21, 'e22, 'f22) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Scan_next_char : `('a22, 'b22, 'c22, 'd22, 'e23, 'f23) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `(char -> 'a22, 'b22, 'c22, 'd22, 'e23, 'f23) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Ignored_param : `('a23, 'b23, 'c23, 'd23, 'y4, 'x9) [ignored](CamlinternalFormatBasics.html#TYPEignored) * ('x9, 'b23, 'c23, 'y4, 'e24, 'f24) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('a23, 'b23, 'c23, 'd23, 'e24, 'f24) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `Custom : `('a24, 'x10, 'y5) [custom_arity](CamlinternalFormatBasics.html#TYPEcustom_arity) * (unit -> 'x10) * ('a24, 'b24, 'c24, 'd24, 'e25, 'f25) [fmt](CamlinternalFormatBasics.html#TYPEfmt)` -> `('y5, 'b24, 'c24, 'd24, 'e25, 'f25) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |
| `|` | `End_of_format : `('f26, 'b25, 'c25, 'e26, 'e26, 'f26) [fmt](CamlinternalFormatBasics.html#TYPEfmt)`` |



List of format elements.




```
type `('a, 'b, 'c, 'd, 'e, 'f)` ignored = 
```


| `|` | `Ignored_char : `('a0, 'b0, 'c0, 'd0, 'd0, 'a0) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| --- | --- |
| `|` | `Ignored_caml_char : `('a1, 'b1, 'c1, 'd1, 'd1, 'a1) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_string : `[pad_option](CamlinternalFormatBasics.html#TYPEpad_option)` -> `('a2, 'b2, 'c2, 'd2, 'd2, 'a2) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_caml_string : `[pad_option](CamlinternalFormatBasics.html#TYPEpad_option)` -> `('a3, 'b3, 'c3, 'd3, 'd3, 'a3) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_int : `[int_conv](CamlinternalFormatBasics.html#TYPEint_conv) * [pad_option](CamlinternalFormatBasics.html#TYPEpad_option)` -> `('a4, 'b4, 'c4, 'd4, 'd4, 'a4) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_int32 : `[int_conv](CamlinternalFormatBasics.html#TYPEint_conv) * [pad_option](CamlinternalFormatBasics.html#TYPEpad_option)` -> `('a5, 'b5, 'c5, 'd5, 'd5, 'a5) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_nativeint : `[int_conv](CamlinternalFormatBasics.html#TYPEint_conv) * [pad_option](CamlinternalFormatBasics.html#TYPEpad_option)` -> `('a6, 'b6, 'c6, 'd6, 'd6, 'a6) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_int64 : `[int_conv](CamlinternalFormatBasics.html#TYPEint_conv) * [pad_option](CamlinternalFormatBasics.html#TYPEpad_option)` -> `('a7, 'b7, 'c7, 'd7, 'd7, 'a7) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_float : `[pad_option](CamlinternalFormatBasics.html#TYPEpad_option) * [prec_option](CamlinternalFormatBasics.html#TYPEprec_option)` -> `('a8, 'b8, 'c8, 'd8, 'd8, 'a8) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_bool : `[pad_option](CamlinternalFormatBasics.html#TYPEpad_option)` -> `('a9, 'b9, 'c9, 'd9, 'd9, 'a9) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_format_arg : `[pad_option](CamlinternalFormatBasics.html#TYPEpad_option) * ('g, 'h, 'i, 'j, 'k, 'l) [fmtty](CamlinternalFormatBasics.html#TYPEfmtty)` -> `('a10, 'b10, 'c10, 'd10, 'd10, 'a10) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_format_subst : `[pad_option](CamlinternalFormatBasics.html#TYPEpad_option) * ('a11, 'b11, 'c11, 'd11, 'e0, 'f0) [fmtty](CamlinternalFormatBasics.html#TYPEfmtty)` -> `('a11, 'b11, 'c11, 'd11, 'e0, 'f0) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_reader : `('a12, 'b12, 'c12, ('b12 -> 'x) -> 'd12, 'd12, 'a12) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_scan_char_set : `[pad_option](CamlinternalFormatBasics.html#TYPEpad_option) * [char_set](CamlinternalFormatBasics.html#TYPEchar_set)` -> `('a13, 'b13, 'c13, 'd13, 'd13, 'a13) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_scan_get_counter : `[counter](CamlinternalFormatBasics.html#TYPEcounter)` -> `('a14, 'b14, 'c14, 'd14, 'd14, 'a14) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |
| `|` | `Ignored_scan_next_char : `('a15, 'b15, 'c15, 'd15, 'd15, 'a15) [ignored](CamlinternalFormatBasics.html#TYPEignored)`` |


```
type `('a, 'b, 'c, 'd, 'e, 'f)` format6 = 
```


| `|` | `Format of `('a, 'b, 'c, 'd, 'e, 'f) [fmt](CamlinternalFormatBasics.html#TYPEfmt) * string`` |
| --- | --- |


```
val concat_fmtty : ('g1, 'b1, 'c1, 'j1, 'd1, 'a1, 'g2, 'b2, 'c2, 'j2, 'd2, 'a2)  
       [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) ->  
       ('a1, 'b1, 'c1, 'd1, 'e1, 'f1, 'a2, 'b2, 'c2, 'd2, 'e2, 'f2)  
       [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) ->  
       ('g1, 'b1, 'c1, 'j1, 'e1, 'f1, 'g2, 'b2, 'c2, 'j2, 'e2, 'f2)  
       [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel)
```

```
val erase_rel : ('a, 'b, 'c, 'd, 'e, 'f, 'g, 'h, 'i, 'j, 'k, 'l)  
       [fmtty_rel](CamlinternalFormatBasics.html#TYPEfmtty_rel) ->  
       ('a, 'b, 'c, 'd, 'e, 'f) [fmtty](CamlinternalFormatBasics.html#TYPEfmtty)
```

```
val concat_fmt : ('a, 'b, 'c, 'd, 'e, 'f) [fmt](CamlinternalFormatBasics.html#TYPEfmt) ->  
       ('f, 'b, 'c, 'e, 'g, 'h) [fmt](CamlinternalFormatBasics.html#TYPEfmt) ->  
       ('a, 'b, 'c, 'd, 'g, 'h) [fmt](CamlinternalFormatBasics.html#TYPEfmt)
```
