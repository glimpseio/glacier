"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an action which when dispatched informs the sources reducer to remove a data source
 */
function createRemoveDataSourceAction(id) {
    return { type: "REMOVE_DATA_SOURCE", payload: { id: id } };
}
exports.createRemoveDataSourceAction = createRemoveDataSourceAction;
