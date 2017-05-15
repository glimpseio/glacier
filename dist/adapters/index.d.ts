import { DataSourceId } from "../model";
/**
 * Declares the minimum required shape of a data adapter
 */
export interface DataAdapter {
    /**
     * Fetches new data for the data source, then resolves when those changes have been dispatched to the store
     */
    updateCache(): Promise<any>;
    /**
     * Removes the associated data source from the store
     */
    remove(): Promise<any>;
    /**
     * Adds a selection of default fields to the store
     */
    defaultFieldSelection(selectNumber?: number): Promise<any>;
    id: DataSourceId;
}
export * from "./memory";
export * from "./sql";
export * from "./rawcsv";
export * from "./jsonblob";
