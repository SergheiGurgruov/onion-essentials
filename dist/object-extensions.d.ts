import { ObjectPath } from "./object-path.js";
declare global {
    interface Object {
        at<T>(this: T, path: ObjectPath<T>): unknown;
    }
}
declare const _default: {};
export default _default;
