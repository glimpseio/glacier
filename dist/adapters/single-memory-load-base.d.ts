import redux = require("redux");
import { DataSourceId } from "../";
import { DataAdapter } from "./";
/**
 * A generic base for declaring adapters for data stored in-memory in-process
 */
export declare class SinglyLoadedMemoryDataSource implements DataAdapter {
    protected storedData: any[];
    protected store: redux.Store<{}>;
    constructor(storedData: any[], store: redux.Store<{}>);
    defaultFieldSelection(selectNumber?: number): Promise<void>;
    updateCache(): Promise<void>;
    remove(): Promise<void>;
    id: DataSourceId;
}
