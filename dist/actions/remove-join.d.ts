import { ReduxStandardAction } from "./";
import { FieldId } from "../model";
export declare type RemoveJoinAction = ReduxStandardAction<"REMOVE_JOIN", {
    left: FieldId;
    right: FieldId;
}>;
/**
 * Creates an action which when dispatched informs the transforms reducer to remove a join from
 * the set of joins it performs prior to filtering
 */
export declare function createRemoveJoinAction(left: FieldId, right: FieldId): RemoveJoinAction;
