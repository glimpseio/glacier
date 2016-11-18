import {ReduxStandardAction} from "./";

export type RemoveFieldsAction = ReduxStandardAction<"REMOVE_FIELDS", {uuids: string[]}>;

export function createRemoveFieldsAction(...uuids: string[]): RemoveFieldsAction {
    return {type: "REMOVE_FIELDS", payload: {uuids}}
}