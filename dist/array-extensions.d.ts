declare global {
    interface Array<T> {
        insertAt(index: number, item: T): void;
        insertAt(index: number, items: T[]): void;
        /**
         * Equivalente a {@link Array.map} ma muta l'array di provenienza invece di allocarne uno nuovo
         */
        mapInPlace<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[];
        /**
         * Equivalente a {@link Array.filter} ma muta l'array di provenienza invece di allocarne uno nuovo
         */
        filterInPlace(callback: (element: T, index: number, array: T[]) => boolean): T[];
    }
}
declare const _default: {};
export default _default;
