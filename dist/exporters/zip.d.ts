/// <reference types="node" />
import redux = require("redux");
import { ModelState } from "../";
import { Exporter } from "./";
export declare type ZipExporter = Exporter<Uint8Array>;
/**
 * Instantiates a zip-file exporter for the given store
 * @param store The store to listen on and retrieve state from
 * @param library The map of utility files to include in the resulting zip, in addition to the `state.json` and `thumbnail.svg`
 * @param onChange The optional callback to execute whenever a state update is fired
 */
export declare function createZipExporter(store: redux.Store<ModelState>, library: {
    [index: string]: Buffer;
}, onChange?: (exp: ZipExporter) => void): ZipExporter;
/**
 * Instantiates a zip-file exporter for the given store
 * @param store The store to listen on and retrieve state from
 * @param library The map of utility files to include in the resulting zip, in addition to the `state.json` and `thumbnail.svg`
 * @param select A function which, given a state of type T, selects the ModelState fragement of that state
 * @param onChange The optional callback to execute whenever a state update is fired
 */
export declare function createZipExporter<T>(store: redux.Store<T>, library: {
    [index: string]: Buffer;
}, select: (state: T) => ModelState, onChange?: (exp: ZipExporter) => void): ZipExporter;
