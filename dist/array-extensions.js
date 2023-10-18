Array.prototype.insertAt = function (index, item) {
    if (Array.isArray(item)) {
        this.splice(index, 0, ...item);
    }
    else {
        this.splice(index, 0, item);
    }
};
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
};
Array.prototype.mapInPlace = function (mapPredicate) {
    for (let i = 0; i < this.length; i++) {
        this[i] = mapPredicate(this[i], i, this);
    }
    return this;
};
export default {};
