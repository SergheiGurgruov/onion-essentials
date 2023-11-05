import { ObjectPath } from "./object-path.js";
declare global {
    interface Object {
        valueAt<T>(this: T, path: ObjectPath<T>): unknown;
    }
}
declare const _default: {};
export default _default;
