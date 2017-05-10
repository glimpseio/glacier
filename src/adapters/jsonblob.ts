import redux = require("redux");
import { DataAdapter } from "./";
import { createAddDataSourceAction } from "../actions";
import { SinglyLoadedMemoryDataSource } from "./single-memory-load-base";

export interface JSONDataSourceAdapter extends DataAdapter {}

/**
 * Given a JSON string, loads it into a memory data source and adds it to the store
 */
export function createJSONDataSource(store: redux.Store<{}>, content: string): JSONDataSourceAdapter {
    const storedData = JSON.parse(content);
    const adapter: JSONDataSourceAdapter = new SinglyLoadedMemoryDataSource(storedData, store);
    const createAction = createAddDataSourceAction("jsonblob", {}, {}, adapter);
    adapter.id = createAction.payload.id;
    store.dispatch(createAction);
    return adapter;
}