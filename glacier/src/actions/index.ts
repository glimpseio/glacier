export type ReduxStandardAction<T extends string, P> = {type: T, payload: P, error?: Error};

export * from "./add-data-source";
export * from "./remove-data-source";
export * from "./update-data-cache";

import {AddDataSourceAction} from "./add-data-source";
import {RemoveDataSourceAction} from "./remove-data-source";
import {UpdateDataCacheAction} from "./update-data-cache";

export type AllActions = AddDataSourceAction<string, {}, {}> | RemoveDataSourceAction | UpdateDataCacheAction<{}>;