import redux = require("redux");
import { DataAdapter } from "./";
export interface CSVDataSourceAdapter extends DataAdapter {
}
/**
 * Loads a CSV string into an in-memory data source and adds it to the store
 */
export declare function createCSVDataSource(store: redux.Store<{}>, content: string): CSVDataSourceAdapter;
