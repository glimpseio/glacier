"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an action which when dispatched informs the marks reducer to update an arbitrary part of the global mark state
 */
function createMarkConfiguration(settingName, settingValue) {
    return { type: "UPDATE_MARK", payload: { settingName: settingName, settingValue: settingValue } };
}
exports.createMarkConfiguration = createMarkConfiguration;
/**
 * Creates an action which when dispatched informs the marks reducer to update the mark type
 */
function createUpdateMarkTypeAction(typeValue) {
    return { type: "UPDATE_MARK", payload: { settingName: "markType", settingValue: typeValue } };
}
exports.createUpdateMarkTypeAction = createUpdateMarkTypeAction;
/**
 * Creates an action which when dispatched informs the marks reducer to update the visualization size
 */
function createUpdateSizeAction(height, width) {
    return { type: "UPDATE_MARK", payload: { settingName: "size", settingValue: { width: width, height: height } } };
}
exports.createUpdateSizeAction = createUpdateSizeAction;
/**
 * Creates an action which when dispatched informs the marks reducer to update the visualization description
 */
function createUpdateDescriptionAction(desc) {
    return { type: "UPDATE_MARK", payload: { settingName: "desc", settingValue: desc } };
}
exports.createUpdateDescriptionAction = createUpdateDescriptionAction;
