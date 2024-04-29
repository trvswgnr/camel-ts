# Module [Runtime\_events](type_Runtime_events.html)


```
module Runtime_events: sig [..](Runtime_events.html) end
```


Runtime events - ring buffer-based runtime tracing


This module enables users to enable and subscribe to tracing events
 from the Garbage Collector and other parts of the OCaml runtime. This can
 be useful for diagnostic or performance monitoring purposes. This module
 can be used to subscribe to events for the current process or external
 processes asynchronously.


When enabled (either via setting the OCAML\_RUNTIME\_EVENTS\_START environment
 variable or calling Runtime\_events.start) a file with the pid of the process
 and extension .events will be created. By default this is in the
 current directory but can be over-ridden by the OCAML\_RUNTIME\_EVENTS\_DIR
 environment variable. Each domain maintains its own ring buffer in a section
 of the larger file into which it emits events.


There is additionally a set of C APIs in runtime\_events.h that can enable
 zero-impact monitoring of the current process or bindings for other
 languages.


The runtime events system's behaviour can be controlled by the following
 environment variables:


* OCAML\_RUNTIME\_EVENTS\_START if set will cause the runtime events system
 to be started as part of the OCaml runtime initialization.


* OCAML\_RUNTIME\_EVENTS\_DIR sets the directory where the runtime events
 ring buffers will be located. If not present the program's working directory
 will be used.


* OCAML\_RUNTIME\_EVENTS\_PRESERVE if set will prevent the OCaml runtime from
 removing its ring buffers when it terminates. This can help if monitoring
 very short running programs.





---


```
type runtime_counter = 
```


| `|` | `EV_C_FORCE_MINOR_ALLOC_SMALL` |
| --- | --- |
| `|` | `EV_C_FORCE_MINOR_MAKE_VECT` |
| `|` | `EV_C_FORCE_MINOR_SET_MINOR_HEAP_SIZE` |
| `|` | `EV_C_FORCE_MINOR_MEMPROF` |
| `|` | `EV_C_MINOR_PROMOTED` |
| `|` | `EV_C_MINOR_ALLOCATED` |
| `|` | `EV_C_REQUEST_MAJOR_ALLOC_SHR` |
| `|` | `EV_C_REQUEST_MAJOR_ADJUST_GC_SPEED` |
| `|` | `EV_C_REQUEST_MINOR_REALLOC_REF_TABLE` |
| `|` | `EV_C_REQUEST_MINOR_REALLOC_EPHE_REF_TABLE` |
| `|` | `EV_C_REQUEST_MINOR_REALLOC_CUSTOM_TABLE` |
| `|` | `EV_C_MAJOR_HEAP_POOL_WORDS` | `(*` | Total words in a Domain's major heap pools. This is the sum of unallocated and live words in each pool.  * **Since** 5.1 | `*)` |
| `|` | `EV_C_MAJOR_HEAP_POOL_LIVE_WORDS` | `(*` | Current live words in a Domain's major heap pools.  * **Since** 5.1 | `*)` |
| `|` | `EV_C_MAJOR_HEAP_LARGE_WORDS` | `(*` | Total words of a Domain's major heap large allocations. A large allocation is an allocation larger than the largest sized pool.  * **Since** 5.1 | `*)` |
| `|` | `EV_C_MAJOR_HEAP_POOL_FRAG_WORDS` | `(*` | Words in a Domain's major heap pools lost to fragmentation. This is due to there not being a pool with the exact size of an allocation and a larger sized pool needing to be used.  * **Since** 5.1 | `*)` |
| `|` | `EV_C_MAJOR_HEAP_POOL_LIVE_BLOCKS` | `(*` | Live blocks of a Domain's major heap pools.  * **Since** 5.1 | `*)` |
| `|` | `EV_C_MAJOR_HEAP_LARGE_BLOCKS` | `(*` | Live blocks of a Domain's major heap large allocations.  * **Since** 5.1 | `*)` |



The type for counter events emitted by the runtime




```
type runtime_phase = 
```


| `|` | `EV_EXPLICIT_GC_SET` |
| --- | --- |
| `|` | `EV_EXPLICIT_GC_STAT` |
| `|` | `EV_EXPLICIT_GC_MINOR` |
| `|` | `EV_EXPLICIT_GC_MAJOR` |
| `|` | `EV_EXPLICIT_GC_FULL_MAJOR` |
| `|` | `EV_EXPLICIT_GC_COMPACT` |
| `|` | `EV_MAJOR` |
| `|` | `EV_MAJOR_SWEEP` |
| `|` | `EV_MAJOR_MARK_ROOTS` |
| `|` | `EV_MAJOR_MARK` |
| `|` | `EV_MINOR` |
| `|` | `EV_MINOR_LOCAL_ROOTS` |
| `|` | `EV_MINOR_FINALIZED` |
| `|` | `EV_EXPLICIT_GC_MAJOR_SLICE` |
| `|` | `EV_FINALISE_UPDATE_FIRST` |
| `|` | `EV_FINALISE_UPDATE_LAST` |
| `|` | `EV_INTERRUPT_REMOTE` |
| `|` | `EV_MAJOR_EPHE_MARK` |
| `|` | `EV_MAJOR_EPHE_SWEEP` |
| `|` | `EV_MAJOR_FINISH_MARKING` |
| `|` | `EV_MAJOR_GC_CYCLE_DOMAINS` |
| `|` | `EV_MAJOR_GC_PHASE_CHANGE` |
| `|` | `EV_MAJOR_GC_STW` |
| `|` | `EV_MAJOR_MARK_OPPORTUNISTIC` |
| `|` | `EV_MAJOR_SLICE` |
| `|` | `EV_MAJOR_FINISH_CYCLE` |
| `|` | `EV_MINOR_CLEAR` |
| `|` | `EV_MINOR_FINALIZERS_OLDIFY` |
| `|` | `EV_MINOR_GLOBAL_ROOTS` |
| `|` | `EV_MINOR_LEAVE_BARRIER` |
| `|` | `EV_STW_API_BARRIER` |
| `|` | `EV_STW_HANDLER` |
| `|` | `EV_STW_LEADER` |
| `|` | `EV_MAJOR_FINISH_SWEEPING` |
| `|` | `EV_MINOR_FINALIZERS_ADMIN` |
| `|` | `EV_MINOR_REMEMBERED_SET` |
| `|` | `EV_MINOR_REMEMBERED_SET_PROMOTE` |
| `|` | `EV_MINOR_LOCAL_ROOTS_PROMOTE` |
| `|` | `EV_DOMAIN_CONDITION_WAIT` |
| `|` | `EV_DOMAIN_RESIZE_HEAP_RESERVATION` |



The type for span events emitted by the runtime




```
type lifecycle = 
```


| `|` | `EV_RING_START` |
| --- | --- |
| `|` | `EV_RING_STOP` |
| `|` | `EV_RING_PAUSE` |
| `|` | `EV_RING_RESUME` |
| `|` | `EV_FORK_PARENT` |
| `|` | `EV_FORK_CHILD` |
| `|` | `EV_DOMAIN_SPAWN` |
| `|` | `EV_DOMAIN_TERMINATE` |



Lifecycle events for the ring itself




```
val lifecycle_name : [lifecycle](Runtime_events.html#TYPElifecycle) -> string
```


Return a string representation of a given lifecycle event type




```
val runtime_phase_name : [runtime_phase](Runtime_events.html#TYPEruntime_phase) -> string
```


Return a string representation of a given runtime phase event type




```
val runtime_counter_name : [runtime_counter](Runtime_events.html#TYPEruntime_counter) -> string
```


Return a string representation of a given runtime counter type




```
type cursor 
```


Type of the cursor used when consuming




```
module [Timestamp](Runtime_events.Timestamp.html): sig [..](Runtime_events.Timestamp.html) end
```

```
module [Type](Runtime_events.Type.html): sig [..](Runtime_events.Type.html) end
```

```
module [User](Runtime_events.User.html): sig [..](Runtime_events.User.html) end
```

```
module [Callbacks](Runtime_events.Callbacks.html): sig [..](Runtime_events.Callbacks.html) end
```

```
val start : unit -> unit
```


`start ()` will start the collection of events in the runtime if not already
 started.


Events can be consumed by creating a cursor with `create_cursor` and providing
 a set of callbacks to be called for each type of event.




```
val pause : unit -> unit
```


`pause ()` will pause the collection of events in the runtime.
 Traces are collected if the program has called `Runtime_events.start ()` or
 the OCAML\_RUNTIME\_EVENTS\_START environment variable has been set.




```
val resume : unit -> unit
```


`resume ()` will resume the collection of events in the runtime.
 Traces are collected if the program has called `Runtime_events.start ()` or
 the OCAML\_RUNTIME\_EVENTS\_START environment variable has been set.




```
val create_cursor : (string * int) option -> [cursor](Runtime_events.html#TYPEcursor)
```


`create_cursor path_pid` creates a cursor to read from an runtime\_events.
 Cursors can be created for runtime\_events in and out of process. A
 runtime\_events ring-buffer may have multiple cursors reading from it at any
 point in time and a program may have multiple cursors open concurrently
 (for example if multiple consumers want different sets of events). If
 `path_pid` is None then a cursor is created for the current process.
 Otherwise the pair contains a string `path` to the directory that contains
 the `pid`.events file and int `pid` for the runtime\_events of an
 external process to monitor.




```
val free_cursor : [cursor](Runtime_events.html#TYPEcursor) -> unit
```


Free a previously created runtime\_events cursor




```
val read_poll : [cursor](Runtime_events.html#TYPEcursor) -> [Callbacks.t](Runtime_events.Callbacks.html#TYPEt) -> int option -> int
```


`read_poll cursor callbacks max_option` calls the corresponding functions
 on `callbacks` for up to `max_option` events read off `cursor`'s
 runtime\_events and returns the number of events read.



