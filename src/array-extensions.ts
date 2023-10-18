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
        filterInPlace(callback: (element: T, index: number, array: T[]) => boolean): T[]
    }
}

Array.prototype.insertAt = function (index: number, item: unknown) {
    if (Array.isArray(item)) {
        this.splice(index, 0, ...item);
    } else {
        this.splice(index, 0, item);
    }
}
Array.prototype.filterInPlace = function (filterPredicate) {
    let from = 0, to = 0;
    while (from < this.length) {
        if (filterPredicate(this[from], to, this)) {
            this[to] = this[from];
            to++;
        }
        from++;
    }
    this.length = to;
    return this;
}

Array.prototype.mapInPlace = function (mapPredicate) {
    for (let i = 0; i < this.length; i++) {
        this[i] = mapPredicate(this[i], i, this);
    }
    return this;
}

export default { }