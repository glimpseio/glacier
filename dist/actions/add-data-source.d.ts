import { ReduxStandardAction } from "./";
import { DataSourceId } from "../model";
import { DataAdapter, SqlDataSourceAdapter, MemoryDataSourceAdapter } from "../adapters";
export declare type AddDataSourceAction<S extends string, T, C> = ReduxStandardAction<"ADD_DATA_SOURCE", {
    type: S;
    metadata: T;
    cache: C;
    id: DataSourceId;
    adapter: DataAdapter;
}>;
export declare type AddSqliteFileDataSourceAction<S> = AddDataSourceAction<"sqlite-file", {
    path: string;
}, S>;
export declare type AddMemoryDataSourceAction<S> = AddDataSourceAction<"memory", {}, S>;
/**
 * Creates an action which when dispatched informs the sources reducer to add a new data source
 *  This action creator generates monotonically increasing identifiers for the data sources it creates,
 *  which are accessable in the resulting action payload
 * @param type The string identifying the kind of data source being created
 * @param metadata The object containing information the data source wants to keep around to serialize and deserialize
 * @param cache An initial set of data to cache for the data source
 * @param adapter The adapter associated with the new data source
 */
export declare function createAddDataSourceAction<C, S>(type: "sqlite-file", metadata: {
    path: string;
}, cache: C, adapter: SqlDataSourceAdapter<S>): AddSqliteFileDataSourceAction<C>;
/**
 * Creates an action which when dispatched informs the sources reducer to add a new data source
 *  This action creator generates monotonically increasing identifiers for the data sources it creates,
 *  which are accessable in the resulting action payload
 * @param type The string identifying the kind of data source being created
 * @param metadata The object containing information the data source wants to keep around to serialize and deserialize
 * @param cache An initial set of data to cache for the data source
 * @param adapter The adapter associated with the new data source
 */
export declare function createAddDataSourceAction<C>(type: "memory", metadata: {}, cache: C, adapter: MemoryDataSourceAdapter): AddMemoryDataSourceAction<C>;
/**
 * Creates an action which when dispatched informs the sources reducer to add a new data source
 *  This action creator generates monotonically increasing identifiers for the data sources it creates,
 *  which are accessable in the resulting action payload
 * @param type The string identifying the kind of data source being created
 * @param metadata The object containing information the data source wants to keep around to serialize and deserialize
 * @param cache An initial set of data to cache for the data source
 * @param adapter The adapter associated with the new data source
 */
export declare function createAddDataSourceAction<S extends string, M, C>(type: S, metadata: M, cache: C, adapter: DataAdapter): AddDataSourceAction<S, M, C>;
