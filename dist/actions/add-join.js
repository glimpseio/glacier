"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an action which when dispatched informs the transforms add a new join specification
 */
function createAddJoinAction(left, right) {
    return { type: "ADD_JOIN", payload: { left: left, right: right } };
}
exports.createAddJoinAction = createAddJoinAction;
