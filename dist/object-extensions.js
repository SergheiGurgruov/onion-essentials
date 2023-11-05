const _valueAt = (obj, path) => path.split(".").reduce((a, v) => (a ? a[v] : undefined), obj);
Object.prototype.valueAt = function (path) {
    return _valueAt(this, path);
};
export default {};
