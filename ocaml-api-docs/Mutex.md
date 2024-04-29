# Module [Mutex](type_Mutex.html)


```
module Mutex: sig [..](Mutex.html) end
```


Locks for mutual exclusion.


Mutexes (mutual-exclusion locks) are used to implement critical sections
 and protect shared mutable data structures against concurrent accesses.
 The typical use is (if `m` is the mutex associated with the data structure
 `D`):



```
     Mutex.lock m;
     (* Critical section that operates over D *);
     Mutex.unlock m
   
```



---


```
type t 
```


The type of mutexes.




```
val create : unit -> [t](Mutex.html#TYPEt)
```


Return a new mutex.




```
val lock : [t](Mutex.html#TYPEt) -> unit
```


Lock the given mutex. Only one thread can have the mutex locked
 at any time. A thread that attempts to lock a mutex already locked
 by another thread will suspend until the other thread unlocks
 the mutex.



* **Before 4.12**  `Sys_error` was not raised for recursive locking
 (platform-dependent behaviour)
* **Raises** `Sys_error` if the mutex is already locked by the thread calling
 [`Mutex.lock`](Mutex.html#VALlock).



```
val try_lock : [t](Mutex.html#TYPEt) -> bool
```


Same as [`Mutex.lock`](Mutex.html#VALlock), but does not suspend the calling thread if
 the mutex is already locked: just return `false` immediately
 in that case. If the mutex is unlocked, lock it and
 return `true`.




```
val unlock : [t](Mutex.html#TYPEt) -> unit
```


Unlock the given mutex. Other threads suspended trying to lock
 the mutex will restart. The mutex must have been previously locked
 by the thread that calls [`Mutex.unlock`](Mutex.html#VALunlock).



* **Before 4.12**  `Sys_error` was not raised when unlocking an unlocked mutex
 or when unlocking a mutex from a different thread.
* **Raises** `Sys_error` if the mutex is unlocked or was locked by another thread.



```
val protect : [t](Mutex.html#TYPEt) -> (unit -> 'a) -> 'a
```


`protect mutex f` runs `f()` in a critical section where `mutex`
 is locked (using [`Mutex.lock`](Mutex.html#VALlock)); it then takes care of releasing `mutex`,
 whether `f()` returned a value or raised an exception.


The unlocking operation is guaranteed to always takes place,
 even in the event an asynchronous exception (e.g. [`Sys.Break`](Sys.html#EXCEPTIONBreak)) is raised
 in some signal handler.



* **Since** 5.1


