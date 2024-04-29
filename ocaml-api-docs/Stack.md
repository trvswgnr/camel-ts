# Module [Stack](type_Stack.html)


```
module Stack: sig [..](Stack.html) end
```


Last-in first-out stacks.


This module implements stacks (LIFOs), with in-place modification.



* **Alert unsynchronized\_access.** Unsynchronized accesses to stacks are a programming error.




---

**Unsynchronized accesses**

Unsynchronized accesses to a stack may lead to an invalid queue state.
 Thus, concurrent accesses to stacks must be synchronized (for instance
 with a [`Mutex.t`](Mutex.html#TYPEt)).


```
type `!'a` t 
```


The type of stacks containing elements of type `'a`.




```
exception Empty
```


Raised when [`Stack.pop`](Stack.html#VALpop) or [`Stack.top`](Stack.html#VALtop) is applied to an empty stack.




```
val create : unit -> 'a [t](Stack.html#TYPEt)
```


Return a new stack, initially empty.




```
val push : 'a -> 'a [t](Stack.html#TYPEt) -> unit
```


`push x s` adds the element `x` at the top of stack `s`.




```
val pop : 'a [t](Stack.html#TYPEt) -> 'a
```


`pop s` removes and returns the topmost element in stack `s`,
 or raises [`Stack.Empty`](Stack.html#EXCEPTIONEmpty) if the stack is empty.




```
val pop_opt : 'a [t](Stack.html#TYPEt) -> 'a option
```


`pop_opt s` removes and returns the topmost element in stack `s`,
 or returns `None` if the stack is empty.



* **Since** 4.08



```
val drop : 'a [t](Stack.html#TYPEt) -> unit
```


`drop s` removes the topmost element in stack `s`,
 or raises [`Stack.Empty`](Stack.html#EXCEPTIONEmpty) if the stack is empty.



* **Since** 5.1



```
val top : 'a [t](Stack.html#TYPEt) -> 'a
```


`top s` returns the topmost element in stack `s`,
 or raises [`Stack.Empty`](Stack.html#EXCEPTIONEmpty) if the stack is empty.




```
val top_opt : 'a [t](Stack.html#TYPEt) -> 'a option
```


`top_opt s` returns the topmost element in stack `s`,
 or `None` if the stack is empty.



* **Since** 4.08



```
val clear : 'a [t](Stack.html#TYPEt) -> unit
```


Discard all elements from a stack.




```
val copy : 'a [t](Stack.html#TYPEt) -> 'a [t](Stack.html#TYPEt)
```


Return a copy of the given stack.




```
val is_empty : 'a [t](Stack.html#TYPEt) -> bool
```


Return `true` if the given stack is empty, `false` otherwise.




```
val length : 'a [t](Stack.html#TYPEt) -> int
```


Return the number of elements in a stack. Time complexity O(1)




```
val iter : ('a -> unit) -> 'a [t](Stack.html#TYPEt) -> unit
```


`iter f s` applies `f` in turn to all elements of `s`,
 from the element at the top of the stack to the element at the
 bottom of the stack. The stack itself is unchanged.




```
val fold : ('acc -> 'a -> 'acc) -> 'acc -> 'a [t](Stack.html#TYPEt) -> 'acc
```


`fold f accu s` is `(f (... (f (f accu x1) x2) ...) xn)`
 where `x1` is the top of the stack, `x2` the second element,
 and `xn` the bottom element. The stack is unchanged.



* **Since** 4.03


## Stacks and Sequences


```
val to_seq : 'a [t](Stack.html#TYPEt) -> 'a [Seq.t](Seq.html#TYPEt)
```


Iterate on the stack, top to bottom.
 It is safe to modify the stack during iteration.



* **Since** 4.07



```
val add_seq : 'a [t](Stack.html#TYPEt) -> 'a [Seq.t](Seq.html#TYPEt) -> unit
```


Add the elements from the sequence on the top of the stack.



* **Since** 4.07



```
val of_seq : 'a [Seq.t](Seq.html#TYPEt) -> 'a [t](Stack.html#TYPEt)
```


Create a stack from the sequence.



* **Since** 4.07


