"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./model"));
__export(require("./actions"));
__export(require("./mapper"));
var redux_1 = require("redux");
var allReducers = require("./reducers");
/**
 * Internal reference to the combined reducer, so the public signature can be well-documented
 */
var reducer_internal = redux_1.combineReducers(allReducers);
/**
 * The combined reducer for all state managed by glacier
 * @param state The current state of glacier
 * @param action The action to act on
 * @returns A state representing the input state with the given action applied
 */
function reducer(state, action) {
    return reducer_internal(state, action);
}
exports.reducer = reducer;
/**
 * Calls Redux.createStore on the glacier reducer and returns the result
 */
function createModel() {
    return redux_1.createStore(reducer);
}
exports.createModel = createModel;
__export(require("./adapters"));
__export(require("./exporters"));
