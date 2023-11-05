import { ObjectPath } from "./object-path.js";

declare global {
    interface Object {
        valueAt<T>(this: T, path: ObjectPath<T>): unknown;
    }
}
const _valueAt = (obj: any, path: string) => path.split(".").reduce((a, v) => (a ? a[v] : undefined), obj);
Object.prototype.valueAt = function <T>(this: T, path: ObjectPath<T>): unknown {
    return _valueAt(this, path as string);
}

export default {}