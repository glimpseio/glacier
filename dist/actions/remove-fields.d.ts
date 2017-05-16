import { ReduxStandardAction } from "./";
import { Field, FieldId } from "../model";
export declare type RemoveFieldsAction = ReduxStandardAction<"REMOVE_FIELDS", {
    fields: Field[];
}>;
export declare type RemoveFieldsByIdAction = ReduxStandardAction<"REMOVE_FIELDS_BY_ID", {
    fields: FieldId[];
}>;
/**
 * Creates an action which when dispatched informs the fields reducer to remove a set of fields
 */
export declare function createRemoveFieldsAction(fields: Field[]): RemoveFieldsAction;
/**
 * Creates an action which when dispatched informs the fields reducer to remove a set of fields by id
 */
export declare function createRemoveFieldsByIdAction(fields: FieldId[]): RemoveFieldsByIdAction;
