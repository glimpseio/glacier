import {ReduxStandardAction} from "./";
import {Field, FieldId} from "../model";

export type RemoveFieldsAction = ReduxStandardAction<"REMOVE_FIELDS", {fields: Field[]}>;
export type RemoveFieldsByIdAction = ReduxStandardAction<"REMOVE_FIELDS_BY_ID", {fields: FieldId[]}>;

/**
 * Creates an action which when dispatched informs the fields reducer to remove a set of fields
 */
export function createRemoveFieldsAction(fields: Field[]): RemoveFieldsAction {
    return {type: "REMOVE_FIELDS", payload: {fields}};
}


/**
 * Creates an action which when dispatched informs the fields reducer to remove a set of fields by id
 */
export function createRemoveFieldsByIdAction(fields: FieldId[]): RemoveFieldsByIdAction {
    return {type: "REMOVE_FIELDS_BY_ID", payload: {fields}};
}