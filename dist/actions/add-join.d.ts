import { ReduxStandardAction } from "./";
import { FieldId } from "../model";
export declare type AddJoinAction = ReduxStandardAction<"ADD_JOIN", {
    left: FieldId;
    right: FieldId;
}>;
/**
 * Creates an action which when dispatched informs the transforms add a new join specification
 */
export declare function createAddJoinAction(left: FieldId, right: FieldId): AddJoinAction;
