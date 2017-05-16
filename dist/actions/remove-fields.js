"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an action which when dispatched informs the fields reducer to remove a set of fields
 */
function createRemoveFieldsAction(fields) {
    return { type: "REMOVE_FIELDS", payload: { fields: fields } };
}
exports.createRemoveFieldsAction = createRemoveFieldsAction;
/**
 * Creates an action which when dispatched informs the fields reducer to remove a set of fields by id
 */
function createRemoveFieldsByIdAction(fields) {
    return { type: "REMOVE_FIELDS_BY_ID", payload: { fields: fields } };
}
exports.createRemoveFieldsByIdAction = createRemoveFieldsByIdAction;
