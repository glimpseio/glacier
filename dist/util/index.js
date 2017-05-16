"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the first element of an array which satisfies a given predicate, or undefined
 * @param arr The array to operate on
 * @param predicate The function to call on each element
 */
function satisfies(arr, predicate) {
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        if (predicate(item))
            return item;
    }
    return undefined;
}
exports.satisfies = satisfies;
/**
 * Given a list of strings, returns an object where each of those string is a key, whose value is also that string
 * @param x List of string literals or string literal typed strings
 * @returns An object strongly typed as a mapping of key-value pairs of those strings
 */
function Enum() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    var o = {};
    for (var k in x) {
        o[x[k]] = x[k];
    }
    return o;
}
exports.Enum = Enum;
/**
 * Returns a function which throws an error with the specified reason. Used to make
 * calls to a given method throw after a specific operation, usually invalidation.
 * @param reason The reason the function was poisoned
 */
function poisonPill(reason) {
    return function () {
        throw new Error("Function has been poisoned. Reason: " + reason);
    };
}
exports.poisonPill = poisonPill;
