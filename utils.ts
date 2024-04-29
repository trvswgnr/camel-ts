export const g = globalThis;

const type = Symbol("type");
export type Nominal<T, Type> = T & { [type]: Type };
export function Nominal<T, Type>(v: T, t: Type): Nominal<T, typeof t> {
    return v as Nominal<T, typeof t>;
}
