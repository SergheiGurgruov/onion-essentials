export function match(value) {
    return new OnionMatcher(value);
}
class OnionMatcher {
    value;
    constructor(value) {
        this.value = value;
    }
    #matchers = [];
    #default = () => undefined;
    case(predicate, fn) {
        this.#matchers.push([predicate, fn]);
        return this;
    }
    default(fn) {
        this.#default = fn;
        return this;
    }
    eval() {
        for (const matcher of this.#matchers) {
            if (matcher[0](this.value)) {
                return matcher[1](this.value);
            }
        }
        return this.#default(this.value);
    }
}
export function matchFirst(obj, fallback, ...matchers) {
    for (const fn of matchers) {
        const result = fn(obj);
        if (result) {
            return result;
        }
    }
    return fallback;
}
