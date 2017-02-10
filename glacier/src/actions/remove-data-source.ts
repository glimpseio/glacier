import {ReduxStandardAction} from "./";

export type RemoveDataSourceAction = ReduxStandardAction<"REMOVE_DATA_SOURCE", {name: string, table: string}>;

export function createRemoveDataSourceAction(name: string, table: string): RemoveDataSourceAction {
    return {type: "REMOVE_DATA_SOURCE", payload: {name, table}};
}