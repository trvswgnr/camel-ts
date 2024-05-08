import type { Nominal } from "../utils";

export type bool = boolean;
export const bool = (b: unknown): bool => Boolean(b);
