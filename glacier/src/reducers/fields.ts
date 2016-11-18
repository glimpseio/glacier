import {AnyDataSource, FieldState} from "../model";
import {AllActions} from "../actions";

export function fields(state: FieldState | undefined, action: AllActions) {
     if (!state) return {};
     if (action.error) {
         throw action.error;
     }

     //Just stubbing this out for now to unblock Wes
     switch(action.type) {
         case "ADD_FIELDS": {
            return {};
         }
         case "REMOVE_FIELDS": {
             return {};
         }
  
     }

}