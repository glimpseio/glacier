import {DataAdapter} from "../adapters";
import {Enum} from "../util";

/**
 * The top-level read-only state object glacier maintains
 */
export interface ModelState {
    /**
     * The sources reducer state
     */
    readonly sources: SourcesModelState;
    /**
     * The marks reducer state
     */
    readonly marks: MarkState;
    /**
     * The fields reducer state
     */
    readonly fields: FieldState;
    /**
     * The transforms reducer state
     */
    readonly transforms: TransformsState;
    /**
     * The channels reducer state
     */
    readonly channels: ChannelState;
}

/**
 * The readonly map of data source ids to data sources used as the sources reducer state
 */
export interface SourcesModelState {
    readonly [index: number]: AnyDataSource;
}

/**
 * The interface used to brand numbers as data source ids, to make them incompatible with field ids
 */
export interface DataSourceIdBrand {
    " do not use data source ": void;
}
/**
 * The type alias for a data source id - you must cast to make a new instance this type, as 
 * it is impossible to construct. Generally, a library consumer should never need to make
 * one - the library yields these where appropriate, and accepts them where required.
 */
export type DataSourceId = number & DataSourceIdBrand;

/**
 * Defines the shape of the state associated with a data source
 */
export interface DataSource<T extends string, M, C> {
    /**
     * A string literal uniquely identifying the data source's type
     * Note: Not currently important, but will be used deserialization of
     * data sources.
     */
    readonly type: T;
    /**
     * An arbitrary cache of metadata the data source may cache inside the model;
     * useful for storing things like available fields, schemas, connection data,
     * and more - potentially very useful for deserialization.
     */
    readonly metadata: M;
    /**
     * The cache of actual row data from the data source - while the type is allowed
     * to be arbitrary, joining logic may not handle caches not structures as a list
     * of rows well.
     */
    readonly cache: C;
    /**
     * The unique identifier assigned to this specific data source.
     */
    readonly id: DataSourceId;
    /**
     * A reference to the actual instantiated adapter associated with this data source
     *  - useful for reaquiring adapter-specific bound actions after deserialization
     */
    readonly adapter: DataAdapter;
}

/**
 * Describes the state managed by the marks reducer
 */
export interface MarkState {
    /**
     * A string representing the kind of mark the visualization should use
     * One of `"bar"`, `"circle"`, `"square"`, `"tick"`, `"line"`, `"area"`, `"point"`, `"rule"`, and `"text"`.
     * TODO: Update tpe to be a string literal union of those types, rather than `string`.
     */
    readonly mark?: string;

    /**
     * Represents the size of the visualization, if it has been specified
     */
    readonly size?: {
        readonly width: number,
        readonly height: number
    };

    /**
     * A description for the visualization
     * FIXME: vega-lite doesn't seem to use this property, so it may not have any use beyond an internal one
     */
    readonly description?: string;
}

/**
 * Type function which takes a type, and makes it readonly down to the leaves
 */
export type DeepReadonly<T> = {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
}

/**
 * Describes the shape of the state managed by the channels reducer
 */
export type ChannelState = {
    readonly [K in Channel]?: DeepReadonly<ChannelArguments<K>>;
}

/**
 * Shape of a field definition
 */
export interface FieldChannelDef extends BaseChannelDef {
    /**
     * String identifying field of channel
     * FieldId is a local addition. (not in vega-lite) Subtraction types would make it easier to type this correctly
     */
    field: string | FieldId;

    /**
     * Type of channel, allowed values defined by vega-lite
     */
    type: "quantitative" | "temporal" | "ordinal" | "nominal" | "Q" | "T" | "O" | "N";

    /**
     * Aggregation to perform of the field, if desired
     */
    aggregate?: "mean" | "sum" | "median" | "min" | "max" | "count";

    /**
     * If the field needs to be sorted, how it should be sorted
     */
    sort?: "ascending" | "descending" | "none";

    /**
     * If the field is temporal, what granularity of time units to show, eg "year" or "yearmonth"
     * There are too many options to enumerate here in the type definition, but the whole list is identical to the one in the vega-lite documentation
     */
    timeUnit?: string;

    /**
     * If the field should be binned
     */
    bin?: boolean;
}
/**
 * Used for specifying constant values rather than fields, mutually exclusive with field + type
 */
export interface ValueChannelDef extends BaseChannelDef {
    /**
     * Makes discernable type-wise vs FieldChannelDef, should never have a value
     */
    field: undefined;

    /**
     * Mutually exclusive with field in FieldChannelDef
     */
    value: string | number;
}

/**
 * Definitions common to all channel definitions
 */
export interface BaseChannelDef {
    /**
     * All scale settings for the channel
     */
    scale?: ScaleDef;

    /**
     * All axis settings for the channel, or false to not render an axis
     */
    axis?: AxisDef | false;

    /**
     * All legend settings for the channel, or false to not render a legend
     */
    legend?: LegendDef | false;
}

/**
 * Union of all channel kinds - this is more fine-grained than is declared by the vega-lite specification
 */
export type ChannelDef = FieldChannelDef | ValueChannelDef;

/**
 * Contains the settings for the scale of a channel
 * TODO: ScaleDef is dependent on field type, and different definitions should exist for each type
 */
export interface ScaleDef {
    /**
     * Controls the kind of scale
     */
    type?: "linear" | "log" | "pow" | "sqrt" | "quantile" | "quantize" | "threshold" | "time" | "ordinal";

    /**
     * Controls the domain of the visualization
     */
    domain?: [number, number] | number[] | [DateTimeDef, DateTimeDef];

    /**
     * Controls the range of value allowed for a visualization - only makes sense for certain types of scales
     */
    range?: string[] | string | [number, number] | number[];

    /**
     * Should the value be rounded?
     */
    round?: boolean;

    /**
     * Should the values be clamped ot the domain?
     * Note: quantitative and time only
     */
    clamp?: boolean;

    /**
     * Exponent to use for the scale
     * Note: quantitative only
     */
    exponent?: number;

    /**
     * Should values be made "nice"?
     * Note: quantitative (boolean) and time (string) only
     */
    nice?: boolean | string;

    /**
     * Should there be a zero?
     * Note: quantitative only
     */
    zero?: boolean;

    /**
     * Should the raw domain value be used?
     * Note: quantitative only
     */
    useRawDomain?: boolean;

    /**
     * Specifies the width of bands on the chart, or "fit" to calculate the best fit
     * Note: ordinal only
     */
    bandSize?: number | "fit";

    /**
     * Specifies the padding between bands
     * Note: ordinal only
     */
    padding?: number;
}

/**
 * Defines a date-time in a precise way
 */
export interface DateTimeDef {
    year?: number;
    quarter?: 1 | 2 | 3 | 4;
    month?: string | number;
    date?: number; // TODO: could use literal types 1-31
    day?: number | string; // TODO: could use literal numbers 1-7
    hours?: number; // TODO: could use literal number 0-23
    minutes?: number; // TODO: could use literal types 0-59
    seconds?: number; // TODO: could use literal types 0-59
    milliseconds?: number; // TODO: could use literal type 0-999
}

/**
 * Specifies the display of an axis for a channel
 */
export interface AxisDef {
    /**
     * The color of the axis
     */
    axisColor?: string;

    /**
     * The width of the wxis
     */
    axisWidth?: number;

    /**
     * Which layer the axis should be rendered in
     */
    layer?: "front" | "back";

    /**
     * How far the axis should be offset
     */
    offset?: number;

    /**
     * The orientation of the axis
     * Only certain vlues are allowed, depending on the channel being specified
     */
    orient?: "top" | "bottom" | "left" | "right";

    /**
     * Should the axis be grided?
     */
    grid?: boolean;

    /**
     * The color of the grid
     */
    gridColor?: string;

    /**
     * The offset (in pixels) into which to begin drawing with the grid dash array.
     */
    gridDash?: number[];

    /**
     * Stoke opacity of the grid, 0-1
     */
    gridOpacity?: number;

    /**
     * Grid width, in pixels
     */
    gridWidth?: number;

    /**
     * Should the axis have labels?
     */
    labels?: boolean;

    /**
     * What format should the labels follow? Uses [d3's formatting pattern.](https://github.com/d3/d3/wiki/Formatting)
     */
    format?: string;

    /**
     * Angle the labels should be rendered at
     */
    labelAngle?: number;

    /**
     * The maximum length of a label to display prior to truncation
     */
    labelMaxLength?: number;

    /**
     * Should shorter time labels be used?
     */
    shortTimeLabels?: boolean;

    /**
     * How any subdivisions should the axis have?
     */
    subdivide?: number;

    /**
     * Should tick marks be displayed on the axis?
     */
    ticks?: number;

    /**
     * What color should the tick marks be?
     */
    tickColor?: string;

    /**
     * What color should the ticks' labels be?
     */
    tickLabelColor?: string;

    /**
     * What font should the ticks' labels be?
     */
    tickLabelFont?: string;

    /**
     * What font size should the ticks' labels have?
     */
    tickLabelFontSize?: number;

    /**
     * How much padding should a tick have?
     */
    tickPadding?: number;

    /**
     * How many pixels should a tick be?
     */
    tickSize?: number;

    /**
     * What size should major ticks be?
     */
    tickSizeMajor?: number;

    /**
     * What size should minor ticks be?
     */
    tickSizeMinor?: number;

    tickSizeEnd?: number;
    tickWidth?: number;
    values?: number[] | DateTimeDef[];
    title?: string;
    titleColor?: string;
    titleFont?: string;
    titleFontWeight?: number;
    titleFontSize?: number;
    titleOffset?: number;
    titleMaxLength?: number;

    /**
     * Specify a character width in environments where it cannot be calculated
     */
    characterWidth?: number;
}

/**
 * Contains settings for controling the display of a legend for a channel
 */
export interface LegendDef {
    orient?: "left" | "right";
    offset?: number;
    values?: DateTimeDef[] | string[] | number[];
    format?: string;
    labelAlign?: string;
    labelBaseline?: string;
    labelColor?: string;
    labelFont?: string;
    labelFontSize?: number;
    shortTimeLabels?: boolean;
    symbolColor?: string;
    symbolShape?: string;
    symbolSize?: number;
    symbolStrokeWidth?: number;
    title?: string;
    titleColor?: string;
    titleFont?: string;
    titleFontSize?: string;
    titleFontWeight?: string;
}

/**
 * Declares all channel names and their types
 * TODO: Pull detailed Encoding type from latest vega-lite dts, rather than replicating it here
 */
export interface Encoding {
    x?: ChannelDef;
    y?: ChannelDef;
    x2?: ChannelDef;
    y2?: ChannelDef;
    color?: ChannelDef;
    opacity?: ChannelDef;
    size?: ChannelDef;
    shape?: ChannelDef;
    detail?: ChannelDef;
    text?: ChannelDef;
    path?: ChannelDef;
    order?: ChannelDef;
    row?: ChannelDef;
    column?: ChannelDef;
};

/**
 * Aliases all channel names
 */
export type Channel = keyof Encoding;

/**
 * Aliases all possible channel types
 */
export type ChannelArguments<T extends Channel> = Encoding[T];

/**
 * Shape of a reference to a field in a data source
 */
export interface Field {
    /**
     * Name used to identify the field within the data source
     */
    readonly name: string;

    /**
     * Table within the data source to look up within
     * TODO: Remove `table` and make data sources be inherently only one table at a time.
     */
    readonly table?: string;

    /**
     * ID of the associated data source
     */
    readonly dataSource: DataSourceId;
}

/**
 * Brand intersected with a number to render it unassignable to other branded number types
 * which re not field ids.
 */
export interface FieldIdBrand {
    " do not use field ": void;
}

/**
 * Alias for a brnaded number representing a field id
 */
export type FieldId = number & FieldIdBrand;

/**
 * A FieldDescriptor is simply a Field after it has been assigned an id
 */
export type FieldDescriptor = Field & { id: FieldId; }

/**
 * State managed by the fields reducer - a map of field ids to field descriptors
 */
export interface FieldState {
    [id: number]: FieldDescriptor;
}

/**
 * Specifies a join across two fields
 */
export interface JoinDescriptor {
    readonly left: FieldId;
    readonly right: FieldId;
}

/**
 * State managed by the transforms reducer
 */
export interface TransformsState {
    /**
     * List of all active joins connecting data sources
     */
    readonly joins: JoinDescriptor[];

    /**
     * Description of the filter to apply to the data after all joins have been applied
     */
    readonly post_filter: FilterDescriptor | undefined;
}

/**
 * Selector for a numeric constant within a filter
 */
export interface NumericConstantSelector {
    readonly type: "constant";
    readonly kind: "number";
    readonly value: number;
}

/**
 * Selector for a string constant within a filter
 */
export interface StringConstantSelector {
    readonly type: "constant";
    readonly kind: "string";
    readonly value: string;
}

/**
 * Union of all constant selector kinds
 */
export type ConstantSelector = NumericConstantSelector | StringConstantSelector;

/**
 * Selector referencing a specific field
 */
export interface FieldSelector {
    readonly type: "fieldref";
    readonly field: FieldId;
}

/**
 * Union representing a selector of a value of some kind
 */
export type ValueSelector = ConstantSelector | FieldSelector;

/**
 * Union of either a nested filter or a selector of a value
 */
export type NestedDescriptor = FilterDescriptor | ValueSelector;

/**
 * Enumeration of all valid binary operator filter kinds
 */
export const BinaryFilters = Enum("AND", "OR", "GT", "GTE", "LT", "LTE", "EQ", "NE", "LIKE");

/**
 * Type containing specific types for each binary filter
 */
export type BinaryFilterDescriptors = {
    [K in keyof typeof BinaryFilters]: {
        readonly type: K;
        readonly left: NestedDescriptor;
        readonly right: NestedDescriptor;
    }
}

/**
 * Union of all filter descriptors
 */
export type FilterDescriptor =
  | BinaryFilterDescriptors["AND"]
  | BinaryFilterDescriptors["OR"]
  | BinaryFilterDescriptors["GT"]
  | BinaryFilterDescriptors["GTE"]
  | BinaryFilterDescriptors["LT"]
  | BinaryFilterDescriptors["LTE"]
  | BinaryFilterDescriptors["EQ"]
  | BinaryFilterDescriptors["NE"]
  | BinaryFilterDescriptors["LIKE"];

/**
 * Simplified representation of a value selector used in action creation arguments
 */
export type ValueSelectorArg = number | string | FieldDescriptor;

/**
 * Union of all possible values for a filter when defined as an argument to an action
 */
export type NestedDescriptorArg = FilterDescriptorArg | ValueSelectorArg;

/**
 * Type containing specific type of all available binary filters as arguments
 */
export type BinaryFilterDescriptorsArg = {
    [K in keyof typeof BinaryFilters]: {
        readonly type: K;
        readonly left: NestedDescriptorArg;
        readonly right: NestedDescriptorArg;
    }
}

/**
 * Union of the specific type of all available filters when used as action arguments
 */
export type FilterDescriptorArg =
  | BinaryFilterDescriptorsArg["AND"]
  | BinaryFilterDescriptorsArg["OR"]
  | BinaryFilterDescriptorsArg["GT"]
  | BinaryFilterDescriptorsArg["GTE"]
  | BinaryFilterDescriptorsArg["LT"]
  | BinaryFilterDescriptorsArg["LTE"]
  | BinaryFilterDescriptorsArg["EQ"]
  | BinaryFilterDescriptorsArg["NE"]
  | BinaryFilterDescriptorsArg["LIKE"];

/**
 * Specific shape of an in-memory data source, without specifying the shape of any data within it
 */
export interface MemoryDataSource extends DataSource<"memory", {}, any> {}

/**
 * Specific shape of a sqlite file data source, without specifying the shape of any data within it
 */
export interface SqliteFileDataSource extends DataSource<"sqlite-file", {path: string}, any> {}

/**
 * Helper alias for any data source - generally DataSource<string, {}, {}> is sufficient, 
 *   but the bellow yields slightly nicer intellisense internally
 */
export type AnyDataSource = MemoryDataSource | SqliteFileDataSource | DataSource<string, {}, {}>;
