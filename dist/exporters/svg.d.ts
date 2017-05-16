import redux = require("redux");
import { ModelState } from "../";
import { Exporter } from "./";
export declare type SVGExporter = Exporter<{
    svg: string;
    spec: any;
}>;
/**
 * Instantiates an exporter which can transform the internal state into an SVG image
 * @param store The store to listen for changes on and retrieve state from
 * @param onChange The optional callback to execute whenever state update is fired
 */
export declare function createSvgExporter(store: redux.Store<ModelState>, onChange?: (exp: SVGExporter) => void): SVGExporter;
/**
 * Instantiates an exporter which can transform the internal state into an SVG image
 * @param store The store to listen for changes on and retrieve state from
 * @param select A function which, given a state of type T, selects the ModelState fragement of that state
 * @param onChange The optional callback to execute whenever state update is fired
 */
export declare function createSvgExporter<T>(store: redux.Store<T>, select: (state: T) => ModelState, onChange?: (exp: SVGExporter) => void): SVGExporter;
