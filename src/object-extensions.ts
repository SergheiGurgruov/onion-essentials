import { ObjectPath } from "./object-path.js";

declare global {
    interface Object {
        at<T>(this: T, path: ObjectPath<T>): unknown;
    }
}
const _valueAt = (obj: any, path: string) => path.split(".").reduce((a, v) => (a ? a[v] : undefined), obj);
Object.prototype.at = function <T>(this: T, path: ObjectPath<T>): unknown {
    return _valueAt(this, path as string);
}

export default {}