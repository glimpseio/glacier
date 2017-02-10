import {ReduxStandardAction} from "./";
import {Field} from "../model";

export type AddFieldsAction = ReduxStandardAction<"ADD_FIELDS", Field[]>;

export function createAddFieldsAction(fields: Field[]): AddFieldsAction {
    return {type: "ADD_FIELDS", payload: fields}
}