import { ReduxStandardAction } from "./";
import { FilterDescriptor, FilterDescriptorArg } from "../model";
export declare type SetFilterAction = ReduxStandardAction<"SET_FILTER", FilterDescriptor | undefined>;
/**
 * Creates an action which when dispatched informs the transforms reducer to update the filter
 * which should be used once data is collected to create a visualization
 */
export declare function createSetFilterAction(filter: FilterDescriptorArg | undefined): SetFilterAction;
