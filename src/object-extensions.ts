import { ObjectPath, valueAt } from "./object-path.js";

declare global {
    interface Object {
        valueAt<T>(this: T, path: ObjectPath<T>): unknown;
        valueAt<T>(this: T, path: string): unknown;
    }
}

Object.prototype.valueAt = function <T>(this: T, path: ObjectPath<T>): unknown {
    return valueAt(this, path as string);
}

export default {}