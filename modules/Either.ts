import type { Nominal } from "../utils";

export type either<a, b> = Nominal<Left<a> | Right<b>, "either">;

const Left = Symbol("Either.Left");
const Right = Symbol("Either.Right");

type Left<a> = {
    t: typeof Left;
    value: a;
};

type Right<b> = {
    t: typeof Right;
    value: b;
};

namespace Either {
    export type t<a, b> = either<a, b>;

    export const left = <a, b>(value: a): t<a, b> =>
        ({ t: Left, value } as either<a, b>);
    export const right = <a, b>(value: b): t<a, b> =>
        ({ t: Right, value } as t<a, b>);
}

export default Either;
