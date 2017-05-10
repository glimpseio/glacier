import {ReduxStandardAction} from "./";

export type UpdateMarkAction<K extends string, V> = ReduxStandardAction<"UPDATE_MARK", {settingName: K, settingValue: V}>;
export type UpdateSizeAction = UpdateMarkAction<"size", {width: number, height: number}>;
export type UpdateMarkTypeAction = UpdateMarkAction<"markType", string>;
export type UpdateDescriptionAction = UpdateMarkAction<"desc", string>;


/**
 * Creates an action which when dispatched informs the marks reducer to update an arbitrary part of the global mark state
 */
export function createMarkConfiguration<K extends string, V>(settingName: K, settingValue: V): UpdateMarkAction<K, V> {
    return { type: "UPDATE_MARK", payload: {settingName: settingName, settingValue: settingValue}};
}

/**
 * Creates an action which when dispatched informs the marks reducer to update the mark type
 */
export function createUpdateMarkTypeAction(typeValue: string): UpdateMarkTypeAction {
    return {type: "UPDATE_MARK", payload: {settingName: "markType", settingValue: typeValue}};
}

/**
 * Creates an action which when dispatched informs the marks reducer to update the visualization size
 */
export function createUpdateSizeAction(height: number, width: number): UpdateSizeAction {
    return {type: "UPDATE_MARK", payload: {settingName: "size", settingValue: {width: width, height: height}}};
}

/**
 * Creates an action which when dispatched informs the marks reducer to update the visualization description
 */
export function createUpdateDescriptionAction(desc: string): UpdateDescriptionAction {
    return {type: "UPDATE_MARK", payload: {settingName: "desc", settingValue: desc}};
}