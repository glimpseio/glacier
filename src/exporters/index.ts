/**
 * Required shape of an exporter
 */
export interface Exporter<T> {
    /**
     * Call signature is called whenever the subscribed store is updated
     */
    (): void;

    /**
     * Returns a promise to the result of exporting the state to type T
     */
    export(): Promise<T>;

    /**
     * Unsubscribes the exported from the store it is subscribed to and does any other required cleanup
     */
    dispose(): void;
}

export * from "./svg";
export * from "./zip";