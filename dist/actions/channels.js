"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an action which when dispatched informs the channels reducer to add a new channel of some kind
 */
function createAddChannelAction(kind, value) {
    return { type: "ADD_CHANNEL", payload: { kind: kind, value: value } };
}
exports.createAddChannelAction = createAddChannelAction;
/**
 * Creates an action which when dispatched informs the channels reducer to remove a new channel of some kind
 */
function createRemoveChannelAction(kind) {
    return { type: "REMOVE_CHANNEL", payload: { kind: kind } };
}
exports.createRemoveChannelAction = createRemoveChannelAction;
/**
 * Creates an action which when dispatched informs the channels reducer to update a new channel of some kind
 *  This entirely replaces the old specification for the given channel, and errors if the channel does not already exist
 */
function createUpdateChannelAction(kind, value) {
    return { type: "UPDATE_CHANNEL", payload: { kind: kind, value: value } };
}
exports.createUpdateChannelAction = createUpdateChannelAction;
