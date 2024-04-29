import { InvalidArgument } from "./Exceptions";

const g = globalThis;

/**
 * Array operations with a similar structure to Result.ts
 */
namespace Array {
    /**
     * Returns the length of the given array.
     */
    export function length<T>(a: T[]): number {
        return a.length;
    }
}
