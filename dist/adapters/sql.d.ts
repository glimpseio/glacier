import redux = require("redux");
import { ModelState, DataSourceId } from "../";
import { DataAdapter } from "./";
/**
 * Data source defining how to connect to an manipulate data from a sqlite file
 */
export declare class SqlDataSourceAdapter<T> implements DataAdapter {
    private store;
    private _selector;
    private _conn;
    id: DataSourceId;
    /**
     * Instantiates a connection obejct, and adds a new data source to the store
     * @param store The store to dispatch events to
     * @param filename The database file to read
     */
    constructor(store: redux.Store<ModelState>, filename: string);
    /**
     * Instantiates a connection obejct, and adds a new data source to the store
     * @param store The store to dispatch events to
     * @param filename The database file to read
     * @param _selector A selector function defining how to find the ModelState fragment of state T
     */
    constructor(store: redux.Store<T>, filename: string, _selector: (s: T) => ModelState);
    /**
     * Asynchronously fetches some number of fields and sets them as active inside the model
     * Resolves when the action adding all the default fields has been dispatched
     */
    defaultFieldSelection(selectNumber?: number): Promise<void>;
    /**
     * Asserts that the connection is present
     */
    assertConnection(): void;
    /**
     * Returns a promise to a list of the tables in the sql db
     */
    describeTables(): Promise<string[]>;
    /**
     * Returns a promise to a list of the columns in a given table in a sql db
     */
    describeColumns(table: string): Promise<string[]>;
    /**
     * Given the fields selected in the store, updates the cached data in the store fore those fields
     * Resolves when the action updating the data in the store has been dispatched
     */
    updateCache(): Promise<void[]>;
    /**
     * Removes the data source associated with this adapter from the store and destroys the connection
     */
    remove(): Promise<void>;
}
/**
 * Creates an instance of a sql data source - just a wrapper around the class constructor
 */
export declare function createSqlFileDataSource(store: redux.Store<ModelState>, filename: string): SqlDataSourceAdapter<{}>;
