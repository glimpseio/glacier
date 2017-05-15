import { ReduxStandardAction } from "./";
export declare type UpdateMarkAction<K extends string, V> = ReduxStandardAction<"UPDATE_MARK", {
    settingName: K;
    settingValue: V;
}>;
export declare type UpdateSizeAction = UpdateMarkAction<"size", {
    width: number;
    height: number;
}>;
export declare type UpdateMarkTypeAction = UpdateMarkAction<"markType", string>;
export declare type UpdateDescriptionAction = UpdateMarkAction<"desc", string>;
/**
 * Creates an action which when dispatched informs the marks reducer to update an arbitrary part of the global mark state
 */
export declare function createMarkConfiguration<K extends string, V>(settingName: K, settingValue: V): UpdateMarkAction<K, V>;
/**
 * Creates an action which when dispatched informs the marks reducer to update the mark type
 */
export declare function createUpdateMarkTypeAction(typeValue: string): UpdateMarkTypeAction;
/**
 * Creates an action which when dispatched informs the marks reducer to update the visualization size
 */
export declare function createUpdateSizeAction(height: number, width: number): UpdateSizeAction;
/**
 * Creates an action which when dispatched informs the marks reducer to update the visualization description
 */
export declare function createUpdateDescriptionAction(desc: string): UpdateDescriptionAction;
