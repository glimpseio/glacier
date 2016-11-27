import knex = require("knex");
import redux = require("redux");
import {ModelState, Field} from "../";
import {DataAdapter} from "./";
import {createAddDataSourceAction, createUpdateDataCacheAction, createRemoveDataSourceAction, createAddFieldsAction, createRemoveFieldsAction} from "../actions";

const dummy = (true as boolean as false) || knex({}); // Makes the return type of the function available for reference without calling it
export class SqlDataSourceAdapter implements DataAdapter {
    private _conn: typeof dummy;
    private _uuid: number;
    constructor(private store: redux.Store<ModelState>, filename: string) {
        
        this._conn = knex({
            client: "sqlite3",
            connection: { filename },
            useNullAsDefault: true
        });

        this.describeTables()
        .then((info) => {
            const action = createAddDataSourceAction("sqlite-file", {path: filename}, {tables: info});
            this._uuid = action.payload.uuid;
            store.dispatch(action);
            return this.updateCache();
        });
    }

    private describeTables() {
         return this._conn
            .select('name')
            .from('sqlite_master')
            .where('type', 'table')
            .returning('name')
            .then((results: [{name: string}]) => {
                return Promise.all(results.map(results => results.name))
            });
    }

    private describeColumns(tablename: string) {
        var fields: Field[] = []

        return this._conn(tablename).columnInfo().then(function(info){
            return Object.keys(info).map(function(key){
                return {uuid: key, table: tablename}
            });
        })
    }
    
    updateCache() {
        //this.store - get state here

        return this._conn.select("DaysToManufacture", "ListPrice").from("Product").then(data => {
            const action = createUpdateDataCacheAction(this._uuid, data);
            this.store.dispatch(action);
        }, err => {
            this.store.dispatch({type: "UPDATE_DATA_CACHE", error: err});
        });
    }
    remove() {
        const action = createRemoveDataSourceAction(this._uuid);
        this.store.dispatch(action);
        return Promise.resolve();
    }
}

export function createSqlFileDataSource(store: redux.Store<ModelState>, filename: string) {
    return new SqlDataSourceAdapter(store, filename);
}