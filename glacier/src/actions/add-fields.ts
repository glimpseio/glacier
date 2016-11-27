import {ReduxStandardAction} from "./";
import {Field} from "../model";

export type AddFieldsAction = ReduxStandardAction<"ADD_FIELDS", {[name: string]: Field}>;

export function createAddFieldsAction(fields: {[name: string]: Field}): AddFieldsAction {
    return {type: "ADD_FIELDS", payload: fields}
}