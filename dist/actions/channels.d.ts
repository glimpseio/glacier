import { ReduxStandardAction } from "./";
import { Channel, ChannelArguments } from "../model";
export declare type AddChannelAction<T extends Channel> = ReduxStandardAction<"ADD_CHANNEL", {
    kind: T;
    value: ChannelArguments<T>;
}>;
export declare type RemoveChannelAction<T extends Channel> = ReduxStandardAction<"REMOVE_CHANNEL", {
    kind: T;
}>;
export declare type UpdateChannelAction<T extends Channel> = ReduxStandardAction<"UPDATE_CHANNEL", {
    kind: T;
    value: ChannelArguments<T>;
}>;
/**
 * Creates an action which when dispatched informs the channels reducer to add a new channel of some kind
 */
export declare function createAddChannelAction<T extends Channel>(kind: T, value: ChannelArguments<T>): AddChannelAction<T>;
/**
 * Creates an action which when dispatched informs the channels reducer to remove a new channel of some kind
 */
export declare function createRemoveChannelAction<T extends Channel>(kind: T): RemoveChannelAction<T>;
/**
 * Creates an action which when dispatched informs the channels reducer to update a new channel of some kind
 *  This entirely replaces the old specification for the given channel, and errors if the channel does not already exist
 */
export declare function createUpdateChannelAction<T extends Channel>(kind: T, value: ChannelArguments<T>): UpdateChannelAction<T>;
