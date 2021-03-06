import {ReduxStandardAction} from "./";
import {
    FilterDescriptor,
    NestedDescriptor,
    FilterDescriptorArg,
    NestedDescriptorArg,
    FieldDescriptor,
} from "../model";

export type SetFilterAction = ReduxStandardAction<"SET_FILTER", FilterDescriptor | undefined>;


/**
 * Creates an action which when dispatched informs the transforms reducer to update the filter
 * which should be used once data is collected to create a visualization
 */
export function createSetFilterAction(filter: FilterDescriptorArg | undefined): SetFilterAction {
    return {
        type: "SET_FILTER",
        payload: filter ? walk(filter) as FilterDescriptor : undefined
    };

    function walk(filter: NestedDescriptorArg): NestedDescriptor {
        if (typeof filter === "number") {
            return {
                type: "constant",
                kind: "number",
                value: filter
            };
        }
        if (typeof filter === "string") {
            return {
                type: "constant",
                kind: "string",
                value: filter
            };
        }
        if ((filter as FilterDescriptorArg).type) {
            const f = filter as FilterDescriptorArg;
            const d: FilterDescriptor = {
                type: f.type as any, // Working around TS compiler bug
                left: walk(f.left),
                right: walk(f.right)
            };
            return d;
        }
        return {
            type: "fieldref",
            field: (filter as FieldDescriptor).id
        };
    }
}