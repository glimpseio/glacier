import { ReduxStandardAction } from "./";
export declare type UpdateDataCacheAction<C> = ReduxStandardAction<"UPDATE_DATA_CACHE", {
    id: number;
    cache: C;
}>;
/**
 * Creates an action which when dispatched informs the sources reducer to update the data cached for
 * a given data source with the given data
 */
export declare function createUpdateDataCacheAction<C>(id: number, cache: C): UpdateDataCacheAction<C>;
