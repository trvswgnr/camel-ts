# Module [Event](type_Event.html)


```
module Event: sig [..](Event.html) end
```


First-class synchronous communication.


This module implements synchronous inter-thread communications over
 channels. As in John Reppy's Concurrent ML system, the communication
 events are first-class values: they can be built and combined
 independently before being offered for communication.





---


```
type `'a` channel 
```


The type of communication channels carrying values of type `'a`.




```
val new_channel : unit -> 'a [channel](Event.html#TYPEchannel)
```


Return a new channel.




```
type `+'a` event 
```


The type of communication events returning a result of type `'a`.




```
val send : 'a [channel](Event.html#TYPEchannel) -> 'a -> unit [event](Event.html#TYPEevent)
```


`send ch v` returns the event consisting in sending the value `v`
 over the channel `ch`. The result value of this event is `()`.




```
val receive : 'a [channel](Event.html#TYPEchannel) -> 'a [event](Event.html#TYPEevent)
```


`receive ch` returns the event consisting in receiving a value
 from the channel `ch`. The result value of this event is the
 value received.




```
val always : 'a -> 'a [event](Event.html#TYPEevent)
```


`always v` returns an event that is always ready for
 synchronization. The result value of this event is `v`.




```
val choose : 'a [event](Event.html#TYPEevent) list -> 'a [event](Event.html#TYPEevent)
```


`choose evl` returns the event that is the alternative of
 all the events in the list `evl`.




```
val wrap : 'a [event](Event.html#TYPEevent) -> ('a -> 'b) -> 'b [event](Event.html#TYPEevent)
```


`wrap ev fn` returns the event that performs the same communications
 as `ev`, then applies the post-processing function `fn`
 on the return value.




```
val wrap_abort : 'a [event](Event.html#TYPEevent) -> (unit -> unit) -> 'a [event](Event.html#TYPEevent)
```


`wrap_abort ev fn` returns the event that performs
 the same communications as `ev`, but if it is not selected
 the function `fn` is called after the synchronization.




```
val guard : (unit -> 'a [event](Event.html#TYPEevent)) -> 'a [event](Event.html#TYPEevent)
```


`guard fn` returns the event that, when synchronized, computes
 `fn()` and behaves as the resulting event. This enables
 computing events with side-effects at the time of the synchronization
 operation.




```
val sync : 'a [event](Event.html#TYPEevent) -> 'a
```


'Synchronize' on an event: offer all the communication
 possibilities specified in the event to the outside world,
 and block until one of the communications succeed. The result
 value of that communication is returned.




```
val select : 'a [event](Event.html#TYPEevent) list -> 'a
```


'Synchronize' on an alternative of events.
 `select evl` is shorthand for `sync(choose evl)`.




```
val poll : 'a [event](Event.html#TYPEevent) -> 'a option
```


Non-blocking version of [`Event.sync`](Event.html#VALsync): offer all the communication
 possibilities specified in the event to the outside world,
 and if one can take place immediately, perform it and return
 `Some r` where `r` is the result value of that communication.
 Otherwise, return `None` without blocking.



