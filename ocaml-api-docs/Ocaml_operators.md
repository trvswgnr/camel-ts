# Ocaml\_operators


# Precedence level and associativity of operators


The following table lists the precedence level of all operator classes
from the highest to the lowest precedence. A few other syntactic constructions
are also listed as references.




| Operator class | Associativity |
| --- | --- |
| `!… ~…` | – |
| `.…() .…[] .…{}` | – |
| `#…` | left |
| `function application` | left |
| `- -.` | – |
| `**… lsl lsr asr` | right |
| `*… /… %… mod land lor lxor` | left |
| `+… -…` | left |
| `::` | right |
| `@… ^…` | right |
| `=… <… >… |… &… $… !=` | left |
| `& &&` | right |
| `or ||` | right |
| `,` | – |
| `<- :=` | right |
| `if` | – |
| `;` | right |


