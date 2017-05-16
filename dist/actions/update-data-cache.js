"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an action which when dispatched informs the sources reducer to update the data cached for
 * a given data source with the given data
 */
function createUpdateDataCacheAction(id, cache) {
    return { type: "UPDATE_DATA_CACHE", payload: { id: id, cache: cache } };
}
exports.createUpdateDataCacheAction = createUpdateDataCacheAction;
