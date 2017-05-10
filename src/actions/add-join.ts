import {ReduxStandardAction} from "./";
import {FieldId} from "../model";

export type AddJoinAction = ReduxStandardAction<"ADD_JOIN", {left: FieldId, right: FieldId}>;

/**
 * Creates an action which when dispatched informs the transforms add a new join specification
 */
export function createAddJoinAction(left: FieldId, right: FieldId): AddJoinAction {
    return {type: "ADD_JOIN", payload: {left, right}};
}