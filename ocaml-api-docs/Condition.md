# Module [Condition](type_Condition.html)


```
module Condition: sig [..](Condition.html) end
```


Condition variables.


Condition variables are useful when several threads wish to access a
 shared data structure that is protected by a mutex (a mutual exclusion
 lock).


A condition variable is a *communication channel*. On the receiver
 side, one or more threads can indicate that they wish to *wait*
 for a certain property to become true. On the sender side, a thread
 can *signal* that this property has become true, causing one (or
 more) waiting threads to be woken up.


For instance, in the implementation of a queue data structure, if a
 thread that wishes to extract an element finds that the queue is
 currently empty, then this thread waits for the queue to become
 nonempty. A thread that inserts an element into the queue signals
 that the queue has become nonempty. A condition variable is used for this
 purpose. This communication channel conveys the information that
 the property "the queue is nonempty" is true, or more accurately,
 may be true. (We explain below why the receiver of a signal cannot
 be certain that the property holds.)


To continue the example of the queue, assuming that the queue has a fixed
 maximum capacity, then a thread that wishes to insert an element
 may find that the queue is full. Then, this thread must wait for
 the queue to become not full, and a thread that extracts an element
 of the queue signals that the queue has become not full. Another
 condition variable is used for this purpose.


In short, a condition variable `c` is used to convey the information
 that a certain property *P* about a shared data structure *D*,
 protected by a mutex `m`, may be true.


Condition variables provide an efficient alternative to busy-waiting.
 When one wishes to wait for the property *P* to be true,
 instead of writing a busy-waiting loop:



```
     Mutex.lock m;
     while not P do
       Mutex.unlock m; Mutex.lock m
     done;
     <update the data structure>;
     Mutex.unlock m
   
```
one uses [`Condition.wait`](Condition.html#VALwait) in the body of the loop, as follows:



```
     Mutex.lock m;
     while not P do
       Condition.wait c m
     done;
     <update the data structure>;
     Mutex.unlock m
   
```
The busy-waiting loop is inefficient because the waiting thread
 consumes processing time and creates contention of the mutex `m`.
 Calling [`Condition.wait`](Condition.html#VALwait) allows the waiting thread to be suspended, so it
 does not consume any computing resources while waiting.


With a condition variable `c`, exactly one mutex `m` is associated.
 This association is implicit: the mutex `m` is not explicitly passed
 as an argument to [`Condition.create`](Condition.html#VALcreate). It is up to the programmer to know, for
 each condition variable `c`, which is the associated mutex `m`.


With a mutex `m`, several condition variables can be associated.
 In the example of the bounded queue, one condition variable is
 used to indicate that the queue is nonempty, and another condition
 variable is used to indicate that the queue is not full.


With a condition variable `c`, exactly one logical property *P*
 should be associated. Examples of such properties
 include "the queue is nonempty" and "the queue is not full".
 It is up to the programmer to keep track, for each condition
 variable, of the corresponding property *P*.
 A signal is sent on the condition variable `c`
 as an indication that the property *P* is true, or may be true.
 On the receiving end, however, a thread that is woken up
 cannot assume that *P* is true;
 after a call to [`Condition.wait`](Condition.html#VALwait) terminates,
 one must explicitly test whether *P* is true.
 There are several reasons why this is so.
 One reason is that,
 between the moment when the signal is sent
 and the moment when a waiting thread receives the signal
 and is scheduled,
 the property *P* may be falsified by some other thread
 that is able to acquire the mutex `m` and alter the data structure *D*.
 Another reason is that *spurious wakeups* may occur:
 a waiting thread can be woken up even if no signal was sent.


Here is a complete example, where a mutex protects a sequential
 unbounded queue, and where a condition variable is used to signal
 that the queue is nonempty.



```
     type 'a safe_queue =
       { queue : 'a Queue.t; mutex : Mutex.t; nonempty : Condition.t }

     let create () =
       { queue = Queue.create(); mutex = Mutex.create();
         nonempty = Condition.create() }

     let add v q =
       Mutex.lock q.mutex;
       let was_empty = Queue.is_empty q.queue in
       Queue.add v q.queue;
       if was_empty then Condition.broadcast q.nonempty;
       Mutex.unlock q.mutex

     let take q =
       Mutex.lock q.mutex;
       while Queue.is_empty q.queue do Condition.wait q.nonempty q.mutex done;
       let v = Queue.take q.queue in (* cannot fail since queue is nonempty *)
       Mutex.unlock q.mutex;
       v
   
```
Because the call to [`Condition.broadcast`](Condition.html#VALbroadcast) takes place inside the critical
 section, the following property holds whenever the mutex is unlocked:
 *if the queue is nonempty, then no thread is waiting*,
 or, in other words,
 *if some thread is waiting, then the queue must be empty*.
 This is a desirable property: if a thread
 that attempts to execute a `take` operation
 could remain suspended
 even though the queue is nonempty,
 that would be a problematic situation,
 known as a *deadlock*.





---


```
type t 
```


The type of condition variables.




```
val create : unit -> [t](Condition.html#TYPEt)
```


`create()` creates and returns a new condition variable.
 This condition variable should be associated (in the programmer's mind)
 with a certain mutex `m` and with a certain property *P* of the data
 structure that is protected by the mutex `m`.




```
val wait : [t](Condition.html#TYPEt) -> [Mutex.t](Mutex.html#TYPEt) -> unit
```


The call `wait c m` is permitted only if `m` is the mutex associated
 with the condition variable `c`, and only if `m` is currently locked.
 This call atomically unlocks the mutex `m` and suspends the
 current thread on the condition variable `c`. This thread can
 later be woken up after the condition variable `c` has been signaled
 via [`Condition.signal`](Condition.html#VALsignal) or [`Condition.broadcast`](Condition.html#VALbroadcast); however, it can also be woken up for
 no reason. The mutex `m` is locked again before `wait` returns. One
 cannot assume that the property *P* associated with the condition
 variable `c` holds when `wait` returns; one must explicitly test
 whether *P* holds after calling `wait`.




```
val signal : [t](Condition.html#TYPEt) -> unit
```


`signal c` wakes up one of the threads waiting on the condition
 variable `c`, if there is one. If there is none, this call has
 no effect.


It is recommended to call `signal c` inside a critical section,
 that is, while the mutex `m` associated with `c` is locked.




```
val broadcast : [t](Condition.html#TYPEt) -> unit
```


`broadcast c` wakes up all threads waiting on the condition
 variable `c`. If there are none, this call has no effect.


It is recommended to call `broadcast c` inside a critical section,
 that is, while the mutex `m` associated with `c` is locked.



