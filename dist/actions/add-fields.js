"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var id = 0;
/**
 * Creates an action which when dispatched informs the fields reducer to add a new field
 *  This action creator generates monotonically increasing identifiers for the fields it creates,
 *  which are accessable in the resulting action payload
 */
function createAddFieldsAction(fields) {
    return { type: "ADD_FIELDS", payload: { fields: fields.map(function (f) { return ({ name: f.name, dataSource: f.dataSource, table: f.table, id: (id++) }); }) } };
}
exports.createAddFieldsAction = createAddFieldsAction;
