# Camel TS

> [!WARNING]  
> This project is just something I'm doing for fun. It is not—and may not ever be—meant for use in any serious capacity.

A direct translation (or as close as possible) of OCaml's `Result` and `Option` modules in TypeScript, providing robust handling for optional and error-handling patterns. It allows for expressive and safe code by encapsulating the presence or absence of values and errors, mirroring the functionality and API of OCaml.

## Features

-   **Result Type**: Represents a value (`Ok`) or an error (`Err`), directly modeled after OCaml's `Result` module.
-   **Option Type**: Represents a value (`Some`) or no value (`None`), mirroring OCaml's `Option` module.

## Installation

For now, you'll have to clone the repository and copy what you need.

## Documentation

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
import { Result, Option } from "./path_to_library";

let v = Result.ok(5);
let e = Result.err(new Error("Something went wrong"));

let s = Option.some(5);
let n = Option.none();
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to discuss potential changes or improvements.

This project uses [Bun](https://bun.sh).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
