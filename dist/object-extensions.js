import { valueAt } from "./object-path.js";
Object.prototype.valueAt = function (path) {
    return valueAt(this, path);
};
export default {};
