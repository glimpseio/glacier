import redux = require("redux");
import {ModelState} from "../";
import {DataAdapter} from "./";
import {createAddDataSourceAction, createUpdateDataCacheAction, createRemoveDataSourceAction} from "../actions";

export interface MemoryDataSourceAdapter extends DataAdapter {
    (data: any): void;
}

export function createMemoryDataSource(store: redux.Store<ModelState>): MemoryDataSourceAdapter {
    let storedData: any = {};
    const func = (((data: any) => {
        storedData = data;
    }) as MemoryDataSourceAdapter);
    const createAction = createAddDataSourceAction("memory", {}, {}, func);
    const id = createAction.payload.id;
    func.updateCache = () => {
        const action = createUpdateDataCacheAction(id, storedData);
        store.dispatch(action);
        return Promise.resolve();
    };
    func.remove = () => {
        const action = createRemoveDataSourceAction(id);
        store.dispatch(action);
        return Promise.resolve();
    };
    func.id = id;
    store.dispatch(createAction);
    return func;
}