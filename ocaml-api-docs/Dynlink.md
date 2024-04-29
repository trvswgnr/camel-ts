# Module [Dynlink](type_Dynlink.html)


```
module Dynlink: sig [..](Dynlink.html) end
```


Dynamic loading of .cmo, .cma and .cmxs files.





---


```
val is_native : bool
```


`true` if the program is native,
 `false` if the program is bytecode.



## Dynamic loading of compiled files


```
val loadfile : string -> unit
```


In bytecode: load the given bytecode object file (`.cmo` file) or
 bytecode library file (`.cma` file), and link it with the running
 program. In native code: load the given OCaml plugin file (usually
 `.cmxs`), and link it with the running program.


All toplevel expressions in the loaded compilation units
 are evaluated. No facilities are provided to
 access value names defined by the unit. Therefore, the unit
 must itself register its entry points with the main program (or a
 previously-loaded library) e.g. by modifying tables of functions.


An exception will be raised if the given library defines toplevel
 modules whose names clash with modules existing either in the main
 program or a shared library previously loaded with `loadfile`.
 Modules from shared libraries previously loaded with
 `loadfile_private` are not included in this restriction.


The compilation units loaded by this function are added to the
 "allowed units" list (see [`Dynlink.set_allowed_units`](Dynlink.html#VALset_allowed_units)).




```
val loadfile_private : string -> unit
```


Same as `loadfile`, except that the compilation units just loaded
 are hidden (cannot be referenced) from other modules dynamically
 loaded afterwards.


An exception will be raised if the given library defines toplevel
 modules whose names clash with modules existing in either the main
 program or a shared library previously loaded with `loadfile`.
 Modules from shared libraries previously loaded with
 `loadfile_private` are not included in this restriction.


An exception will also be raised if the given library defines
 toplevel modules whose name matches that of an interface depended
 on by a module existing in either the main program or a shared
 library previously loaded with `loadfile`. This applies even if
 such dependency is only a "module alias" dependency (i.e. just on
 the name rather than the contents of the interface).


The compilation units loaded by this function are not added to the
 "allowed units" list (see [`Dynlink.set_allowed_units`](Dynlink.html#VALset_allowed_units)) since they cannot
 be referenced from other compilation units.




```
val adapt_filename : string -> string
```


In bytecode, the identity function. In native code, replace the last
 extension with `.cmxs`.



## Access control


```
val set_allowed_units : string list -> unit
```


Set the list of compilation units that may be referenced from units that
 are dynamically loaded in the future to be exactly the given value.


Initially all compilation units composing the program currently running
 are available for reference from dynamically-linked units.
 `set_allowed_units` can be used to restrict access to a subset of these
 units, e.g. to the units that compose the API for
 dynamically-linked code, and prevent access to all other units,
 e.g. private, internal modules of the running program.


Note that [`Dynlink.loadfile`](Dynlink.html#VALloadfile) changes the allowed-units list.




```
val allow_only : string list -> unit
```


`allow_only units` sets the list of allowed units to be the intersection
 of the existing allowed units and the given list of units. As such it
 can never increase the set of allowed units.




```
val prohibit : string list -> unit
```


`prohibit units` prohibits dynamically-linked units from referencing
 the units named in list `units` by removing such units from the allowed
 units list. This can be used to prevent access to selected units,
 e.g. private, internal modules of the running program.




```
val main_program_units : unit -> string list
```


Return the list of compilation units that form the main program (i.e.
 are not dynamically linked).




```
val public_dynamically_loaded_units : unit -> string list
```


Return the list of compilation units that have been dynamically loaded via
 `loadfile` (and not via `loadfile_private`). Note that compilation units
 loaded dynamically cannot be unloaded.




```
val all_units : unit -> string list
```


Return the list of compilation units that form the main program together
 with those that have been dynamically loaded via `loadfile` (and not via
 `loadfile_private`).




```
val allow_unsafe_modules : bool -> unit
```


Govern whether unsafe object files are allowed to be
 dynamically linked. A compilation unit is 'unsafe' if it contains
 declarations of external functions, which can break type safety.
 By default, dynamic linking of unsafe object files is
 not allowed. In native code, this function does nothing; object files
 with external functions are always allowed to be dynamically linked.



## Error reporting


```
type linking_error = private 
```


| `|` | `Undefined_global of `string`` |
| --- | --- |
| `|` | `Unavailable_primitive of `string`` |
| `|` | `Uninitialized_global of `string`` |


```
type error = private 
```


| `|` | `Not_a_bytecode_file of `string`` |
| --- | --- |
| `|` | `Inconsistent_import of `string`` |
| `|` | `Unavailable_unit of `string`` |
| `|` | `Unsafe_file` |
| `|` | `Linking_error of `string * [linking_error](Dynlink.html#TYPElinking_error)`` |
| `|` | `Corrupted_interface of `string`` |
| `|` | `Cannot_open_dynamic_library of `exn`` |
| `|` | `Library's_module_initializers_failed of `exn`` |
| `|` | `Inconsistent_implementation of `string`` |
| `|` | `Module_already_loaded of `string`` |
| `|` | `Private_library_cannot_implement_interface of `string`` |


```
exception Error of [error](Dynlink.html#TYPEerror)
```


Errors in dynamic linking are reported by raising the `Error`
 exception with a description of the error.
 A common case is the dynamic library not being found on the system: this
 is reported via `Cannot_open_dynamic_library` (the enclosed exception may
 be platform-specific).




```
val error_message : [error](Dynlink.html#TYPEerror) -> string
```


Convert an error description to a printable message.



