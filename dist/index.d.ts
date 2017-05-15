export * from "./model";
export * from "./actions";
export * from "./mapper";
import { Store } from "redux";
import { ModelState } from "./model";
import { AllActions } from "./actions";
/**
 * The combined reducer for all state managed by glacier
 * @param state The current state of glacier
 * @param action The action to act on
 * @returns A state representing the input state with the given action applied
 */
export declare function reducer(state: ModelState, action: AllActions): ModelState;
/**
 * Calls Redux.createStore on the glacier reducer and returns the result
 */
export declare function createModel(): Store<ModelState>;
export * from "./adapters";
export * from "./exporters";
