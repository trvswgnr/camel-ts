# Camel TS

> [!WARNING]  
> This project is just something I'm doing for fun. It is not—and may not ever be—meant for use in any serious capacity.

A direct translation (or as close as possible) of select parts of OCaml's standard library in TypeScript.

## Features

-   **Result**: Represents a value (`Ok`) or an error (`Error`), directly modeled
    after OCaml's `Result` module and `result` type.
-   **Option**: Represents a value (`Some`) or no value (`None`), mirroring
    OCaml's `Option` module and `option` type.
-   **Float**: A direct translation of OCaml's `float` type and `Float` module.
-   **Int**: A direct translation of OCaml's `int` type and `Int` module.
-   **Char**: A direct translation of OCaml's `char` type and `Char` module.
-   **Array**: A custom implementation of OCaml's `array` type and `Array` module.
-   **Exceptions**: Some OCaml exceptions are translated to TypeScript errors.

## Installation

For now, you'll have to clone the repository and copy what you need.

## Documentation

Both `Result` and `Option` contain all of the same functionality as their OCaml counterparts, with a couple additional utility functions. You can reference the OCaml docs for [`Result`](https://v2.ocaml.org/api/Result.html) and [`Option`](https://v2.ocaml.org/api/Option.html) for more information.

### Result Type

-   **Creation**: Create `Ok` or `Err` types using `Result.ok` and `Result.err`, akin to OCaml's constructors.
-   **Transformation**: Transform results with `map`, `map_err`, `bind`, following the OCaml approach.
-   **Error Handling**: Extract values or errors with `get_ok`, `get_err`, similar to OCaml's handling methods.

### Option Type

-   **Creation**: Create `Some` or `None` types using `Option.some` and `Option.none`, directly inspired by OCaml.
-   **Transformation**: Transform options with `map`, `bind`, as per OCaml's functionality.
-   **Utility**: Check for values with `is_some`, `is_none`, replicating OCaml's utility functions.

## Example

```typescript
import { Result, Option } from "./camel-ts";

let v = Result.ok(5);
let e = Result.err(new Error("Something went wrong"));

let s = Option.some(5);
let n = Option.none();

function divide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return Result.err("Division by zero");
    }
    return Result.ok(a / b);
}
```

It also provides two utilities for each that are not found in OCaml: `Result.of`, `Result.match`, `Option.of`, and `Option.match`. They can be used to create and match against results and options, respectively.

```ts
const resultOfSomethingDangerous = Result.of(() => {
    return JSON.parse("{invalid json}");
}); // will be Err<Error>

const value = Result.match(resultOfSomethingDangerous, {
    Ok: (v) => v,
    Err: (e) => "Default value",
});

const map = new Map<string, number>();

const maybeA = Option.of(map.get("a")); // will be None, because map.get("a") returns undefined

const value = Option.match(maybeA, {
    Some: (v) => v,
    None: () => "Default value",
});
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to discuss potential changes or improvements.

This project uses [Bun](https://bun.sh).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
