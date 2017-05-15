import { ModelState, ChannelState } from "../";
/**
 * Maps an internal state into a vega-lite specification
 */
export declare function compileState({sources, marks, fields: fieldTable, transforms, channels}: ModelState): {
    mark: string;
    size?: {
        readonly width: number;
        readonly height: number;
    } | undefined;
    description?: string | undefined;
    data: {
        values: any;
    };
    encoding: ChannelState;
};
