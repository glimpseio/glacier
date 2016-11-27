import {ReduxStandardAction} from "./";
import {Field} from "../model";

export type RemoveFieldsAction = ReduxStandardAction<"REMOVE_FIELDS", {[name: string]: Field}>;

export function createRemoveFieldsAction(fields: {[name: string]: Field}): RemoveFieldsAction {
    return {type: "REMOVE_FIELDS", payload: fields}
}