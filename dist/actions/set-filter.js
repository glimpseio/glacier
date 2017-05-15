"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an action which when dispatched informs the transforms reducer to update the filter
 * which should be used once data is collected to create a visualization
 */
function createSetFilterAction(filter) {
    return {
        type: "SET_FILTER",
        payload: filter ? walk(filter) : undefined
    };
    function walk(filter) {
        if (typeof filter === "number") {
            return {
                type: "constant",
                kind: "number",
                value: filter
            };
        }
        if (typeof filter === "string") {
            return {
                type: "constant",
                kind: "string",
                value: filter
            };
        }
        if (filter.type) {
            var f = filter;
            var d = {
                type: f.type,
                left: walk(f.left),
                right: walk(f.right)
            };
            return d;
        }
        return {
            type: "fieldref",
            field: filter.id
        };
    }
}
exports.createSetFilterAction = createSetFilterAction;
