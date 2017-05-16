import { ReduxStandardAction } from "./";
import { Field, FieldDescriptor } from "../model";
export declare type AddFieldsAction = ReduxStandardAction<"ADD_FIELDS", {
    fields: FieldDescriptor[];
}>;
/**
 * Creates an action which when dispatched informs the fields reducer to add a new field
 *  This action creator generates monotonically increasing identifiers for the fields it creates,
 *  which are accessable in the resulting action payload
 */
export declare function createAddFieldsAction(fields: Field[]): AddFieldsAction;
