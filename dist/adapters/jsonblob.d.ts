import redux = require("redux");
import { DataAdapter } from "./";
export interface JSONDataSourceAdapter extends DataAdapter {
}
/**
 * Given a JSON string, loads it into a memory data source and adds it to the store
 */
export declare function createJSONDataSource(store: redux.Store<{}>, content: string): JSONDataSourceAdapter;
