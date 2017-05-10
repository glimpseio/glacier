export * from "./model";
export * from "./actions";
export * from "./mapper";

import {createStore, combineReducers, Store} from "redux";
import * as allReducers from "./reducers";
import {ModelState} from "./model";
import {AllActions} from "./actions";

/**
 * Internal reference to the combined reducer, so the public signature can be well-documented
 */
const reducer_internal: (state: ModelState, action: AllActions) => ModelState = combineReducers<ModelState>(allReducers as any as {[index: string]: () => any});

/**
 * The combined reducer for all state managed by glacier
 * @param state The current state of glacier
 * @param action The action to act on
 * @returns A state representing the input state with the given action applied
 */
export function reducer(state: ModelState, action: AllActions): ModelState {
    return reducer_internal(state, action);
}

/**
 * Calls Redux.createStore on the glacier reducer and returns the result
 */
export function createModel(): Store<ModelState> {
    return createStore(reducer);
}

export * from "./adapters";
export * from "./exporters";