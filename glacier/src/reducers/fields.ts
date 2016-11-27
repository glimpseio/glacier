import {AnyDataSource, FieldState} from "../model";
import {AllActions} from "../actions";

function filter(state: FieldState, toRemove: string[]) {
    
}

export function fields(state: FieldState | undefined, action: AllActions) {
     if (!state) return {};
     if (action.error) {
         throw action.error;
     }
     console.log("state", state);
     switch(action.type) {
         
         case "ADD_FIELDS": {
             return { ...state, ...action.payload };
         }
         case "REMOVE_FIELDS": {
             //TODO
             filter(state, action.payload.uuids);
             return {};
         }
         default: return state;
     }
}