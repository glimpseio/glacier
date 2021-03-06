export type ReduxStandardAction<T extends string, P> = {type: T, payload: P, error?: Error};

export * from "./add-data-source";
export * from "./remove-data-source";
export * from "./update-data-cache";
export * from "./configure-mark";
export * from "./add-fields";
export * from "./remove-fields";
export * from "./add-join";
export * from "./remove-join";
export * from "./channels";
export * from "./set-filter";

import {AddDataSourceAction} from "./add-data-source";
import {RemoveDataSourceAction} from "./remove-data-source";
import {UpdateDataCacheAction} from "./update-data-cache";
import {AddFieldsAction} from "./add-fields";
import {RemoveFieldsAction, RemoveFieldsByIdAction} from "./remove-fields";
import {UpdateDescriptionAction, UpdateMarkTypeAction, UpdateSizeAction} from "./configure-mark";
import {AddJoinAction} from "./add-join";
import {RemoveJoinAction} from "./remove-join";
import {AddChannelAction, RemoveChannelAction, UpdateChannelAction} from "./channels";
import {SetFilterAction} from "./set-filter";
import {Channel} from "../model";

/**
 * Union of all the internally-defined actions
 */
export type AllActions = AddDataSourceAction<string, {}, {}>
    | RemoveDataSourceAction
    | UpdateDataCacheAction<{}>
    | UpdateDescriptionAction
    | UpdateMarkTypeAction
    | UpdateSizeAction
    | AddFieldsAction
    | RemoveFieldsAction
    | RemoveFieldsByIdAction
    | AddJoinAction
    | RemoveJoinAction
    | AddChannelAction<Channel>
    | RemoveChannelAction<Channel>
    | UpdateChannelAction<Channel>
    | SetFilterAction;