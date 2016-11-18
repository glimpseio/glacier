import {ReduxStandardAction} from "./";

export type AddFieldsAction = ReduxStandardAction<"ADD_FIELDS", {uuids: string[]}>;

export function createAddFieldsAction(...uuids: string[]): AddFieldsAction {
    return {type: "ADD_FIELDS", payload: {uuids}}
}