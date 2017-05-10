import {ReduxStandardAction} from "./";
import {DataSourceId} from "../model";

export type RemoveDataSourceAction = ReduxStandardAction<"REMOVE_DATA_SOURCE", {id: DataSourceId}>;


/**
 * Creates an action which when dispatched informs the sources reducer to remove a data source
 */
export function createRemoveDataSourceAction(id: DataSourceId): RemoveDataSourceAction {
    return {type: "REMOVE_DATA_SOURCE", payload: {id}};
}