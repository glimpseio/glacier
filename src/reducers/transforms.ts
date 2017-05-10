import { TransformsState } from "../model";
import { AllActions } from "../actions";


/**
 * transforms member reducer - handles actions and state related to data transformation management
 */
export function transforms(state: TransformsState | undefined, action: AllActions): TransformsState {
    if (!state) {
        return { joins: [], post_filter: undefined };
    }
    if (action.error) {
        throw action.error;
    }
    switch (action.type) {
        case "ADD_JOIN": {
            return {...state, joins: state.joins.concat([action.payload])};
        }
        case "REMOVE_JOIN": {
            const joins = state.joins.filter(j => !(j.left === action.payload.left && j.right === action.payload.right));
            if (joins.length === state.joins.length) {
                throw new Error("Attempted to remove a join which does not exist in the state.");
            }
            return {...state, joins};
        }
        case "SET_FILTER": {
            return {...state, post_filter: action.payload};
        }
        default: return state;
    }
}