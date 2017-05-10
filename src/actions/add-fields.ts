import {ReduxStandardAction} from "./";
import {Field, FieldDescriptor, FieldId} from "../model";

export type AddFieldsAction = ReduxStandardAction<"ADD_FIELDS", {fields: FieldDescriptor[]}>;

let id = 0;

/**
 * Creates an action which when dispatched informs the fields reducer to add a new field
 *  This action creator generates monotonically increasing identifiers for the fields it creates,
 *  which are accessable in the resulting action payload
 */
export function createAddFieldsAction(fields: Field[]): AddFieldsAction {
    return {type: "ADD_FIELDS", payload: {fields: fields.map(f => ({name: f.name, dataSource: f.dataSource, table: f.table, id: (id++) as FieldId}))}};
}