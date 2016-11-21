import {AnyDataSource, FieldState} from "../model";
import {AllActions} from "../actions";

// function filter(state: FieldState, toRemove: string[]) {
//     Object.keys(state).map(k => k).filter(function(v) {
//         console.log(k)
//     });
// }

export function fields(state: FieldState | undefined, action: AllActions) {
     if (!state) return {};
     if (action.error) {
         throw action.error;
     }

     switch(action.type) {
         case "ADD_FIELDS": {
             return { ...state, uuids: [...action.payload.uuids] };
         }
         case "REMOVE_FIELDS": {
             //TODO
             //filter(state, action.payload.uuids);
             return {};
         }
         default: return {};
     }
}