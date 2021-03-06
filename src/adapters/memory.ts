import redux = require("redux");
import { DataSourceId } from "../";
import { DataAdapter } from "./";
import { createAddDataSourceAction } from "../actions";
import { SinglyLoadedMemoryDataSource } from "./single-memory-load-base";

export interface MemoryDataSourceAdapter extends DataAdapter {
    /**
     * @param data Data to replace the cached data associated with this data source with
     */
    (data: any): void;
}

/**
 * Unlike SinglyLoadedMemoryDataSource, this class allows the internal data to be updated
 */
class InternalMemoryDataSource extends SinglyLoadedMemoryDataSource {
    setData(data: any[]) {
        this.storedData = data;
    }
}

/**
 * Creates an in-memory data source which can be updated with new data over time, and adds it to the store
 */
export function createMemoryDataSource(store: redux.Store<{}>): MemoryDataSourceAdapter {
    const base = new InternalMemoryDataSource([], store);
    const func = (((data: any[]) => {
        base.setData(data);
    }) as MemoryDataSourceAdapter);
    const createAction = createAddDataSourceAction("memory", {}, {}, func);
    base.id = createAction.payload.id;
    // You can probably replace the below with `func.id = base.id` unless some sort of
    //   data source id swapping is going on to get ES3 compatibility
    Object.defineProperties(func, {
        id: {
            configurable: true,
            enumerable: true,
            get() {
                return base.id;
            },
            set(x: DataSourceId) {
                return base.id = x;
            }
        }
    });
    func.defaultFieldSelection = (x?: number) => base.defaultFieldSelection(x);
    func.updateCache = () => base.updateCache();
    func.remove = () => base.remove();
    store.dispatch(createAction);
    return func;
}