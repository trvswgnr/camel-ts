import type { Nominal } from "../utils";
import type { int } from "./Int";

export type list<T> = Nominal<Readonly<{ [k: int]: T }>, "list">;

namespace List {
    export const length = <T>(l: list<T>): int => Object.keys(l).length as int;
    export const get = <T>(l: list<T>, i: int): T => l[i as int]!;
}

export default List;
