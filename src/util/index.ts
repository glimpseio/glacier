/**
 * Returns the first element of an array which satisfies a given predicate, or undefined
 * @param arr The array to operate on
 * @param predicate The function to call on each element
 */
export function satisfies<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
    for (const item of arr) {
        if (predicate(item)) return item;
    }
    return undefined;
}

/**
 * Given a list of strings, returns an object where each of those string is a key, whose value is also that string
 * @param x List of string literals or string literal typed strings
 * @returns An object strongly typed as a mapping of key-value pairs of those strings
 */
export function Enum<X extends string>(...x: X[]): {[K in X]: K } {
    const o: any = {};
    for (const k in x) {
        o[x[k]] = x[k];
    }
    return o;
}

/**
 * Returns a function which throws an error with the specified reason. Used to make
 * calls to a given method throw after a specific operation, usually invalidation.
 * @param reason The reason the function was poisoned
 */
export function poisonPill(reason: string) {
    return function() {
        throw new Error(`Function has been poisoned. Reason: ${reason}`);
    };
}