"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an action which when dispatched informs the transforms reducer to remove a join from
 * the set of joins it performs prior to filtering
 */
function createRemoveJoinAction(left, right) {
    return { type: "REMOVE_JOIN", payload: { left: left, right: right } };
}
exports.createRemoveJoinAction = createRemoveJoinAction;
