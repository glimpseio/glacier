import redux = require("redux");
import { DataAdapter } from "./";
export interface MemoryDataSourceAdapter extends DataAdapter {
    /**
     * @param data Data to replace the cached data associated with this data source with
     */
    (data: any): void;
}
/**
 * Creates an in-memory data source which can be updated with new data over time, and adds it to the store
 */
export declare function createMemoryDataSource(store: redux.Store<{}>): MemoryDataSourceAdapter;
