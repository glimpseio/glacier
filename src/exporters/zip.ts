import redux = require("redux");
import JSZip = require("jszip");
import {ModelState} from "../";
import {Exporter, createSvgExporter} from "./";

export type ZipExporter =  Exporter<Uint8Array>;

/**
 * Instantiates a zip-file exporter for the given store
 * @param store The store to listen on and retrieve state from
 * @param library The map of utility files to include in the resulting zip, in addition to the `state.json` and `thumbnail.svg`
 * @param onChange The optional callback to execute whenever a state update is fired
 */
export function createZipExporter(
    store: redux.Store<ModelState>,
    library: {[index: string]: Buffer},
    onChange?: (exp: ZipExporter) => void
): ZipExporter;
/**
 * Instantiates a zip-file exporter for the given store
 * @param store The store to listen on and retrieve state from
 * @param library The map of utility files to include in the resulting zip, in addition to the `state.json` and `thumbnail.svg`
 * @param select A function which, given a state of type T, selects the ModelState fragement of that state
 * @param onChange The optional callback to execute whenever a state update is fired
 */
export function createZipExporter<T>(
    store: redux.Store<T>,
    library: {[index: string]: Buffer},
    select: (state: T) => ModelState,
    onChange?: (exp: ZipExporter) => void
): ZipExporter;
export function createZipExporter<T>(
    store: redux.Store<T>,
    library: {[index: string]: Buffer},
    selectOrOnChange?: ((state: T) => ModelState) | ((exp: ZipExporter) => void),
    onChange?: (exp: ZipExporter) => void
): ZipExporter {
    let select = ((s: any) => s);
    if (onChange) {
        select = selectOrOnChange as (state: T) => ModelState;
    }
    else if (selectOrOnChange) {
        onChange = selectOrOnChange as (exp: ZipExporter) => void;
    }

    const updater = ((() => {
        if (onChange) {
            onChange(updater);
        }
    }) as ZipExporter);
    updater.export = async () => {
        const stateString = JSON.stringify(select(store.getState()));
        const svgExporter = createSvgExporter(store, select);
        const zip = new JSZip();
        zip.file("state.json", stateString);
        zip.file("thumnail.svg", (await svgExporter.export()).svg);
        svgExporter.dispose();
        const keys = Object.keys(library);
        for ( const key of keys ) {
            zip.file(key, library[key]);
        }
        return await zip.generateAsync({ type: "nodebuffer" });
    };
    updater.dispose = store.subscribe(updater);
    return updater;
}