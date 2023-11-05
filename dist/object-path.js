export function valueAt(obj, path) { return _valueAt(obj, path); }
;
const _valueAt = (obj, path) => path.split(".").reduce((a, v) => (a ? a[v] : undefined), obj);
