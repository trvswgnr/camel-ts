# Module [Semaphore](type_Semaphore.html)


```
module Semaphore: sig [..](Semaphore.html) end
```


Semaphores


A semaphore is a thread synchronization device that can be used to
 control access to a shared resource.


Two flavors of semaphores are provided: counting semaphores and
 binary semaphores.



* **Since** 4.12




---

### Counting semaphores

A counting semaphore is a counter that can be accessed concurrently
 by several threads. The typical use is to synchronize producers and
 consumers of a resource by counting how many units of the resource
 are available.

The two basic operations on semaphores are:

* "release" (also called "V", "post", "up", and "signal"), which
 increments the value of the counter. This corresponds to producing
 one more unit of the shared resource and making it available to others.
* "acquire" (also called "P", "wait", "down", and "pend"), which
 waits until the counter is greater than zero and decrements it.
 This corresponds to consuming one unit of the shared resource.


```
module [Counting](Semaphore.Counting.html): sig [..](Semaphore.Counting.html) end
```
### Binary semaphores

Binary semaphores are a variant of counting semaphores
 where semaphores can only take two values, 0 and 1.

A binary semaphore can be used to control access to a single
 shared resource, with value 1 meaning "resource is available" and
 value 0 meaning "resource is unavailable".

The "release" operation of a binary semaphore sets its value to 1,
 and "acquire" waits until the value is 1 and sets it to 0.

A binary semaphore can be used instead of a mutex (see module
 [`Mutex`](Mutex.html)) when the mutex discipline (of unlocking the mutex from the
 thread that locked it) is too restrictive. The "acquire" operation
 corresponds to locking the mutex, and the "release" operation to
 unlocking it, but "release" can be performed in a thread different
 than the one that performed the "acquire". Likewise, it is safe
 to release a binary semaphore that is already available.


```
module [Binary](Semaphore.Binary.html): sig [..](Semaphore.Binary.html) end
```
