import {AnyDataSource, FieldState} from "../model";
import {AllActions} from "../actions";

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
             return {};
         }
         default: return {};
     }
}