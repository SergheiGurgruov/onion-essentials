export function match<T>(value: T) {
    return new OnionMatcher<T>(value);
}

class OnionMatcher<T> {
    constructor(private value: T) { }

    #matchers: [(input: T) => boolean, (input: T) => any][] = []
    #default: (input: T) => any = () => undefined;

    case<U>(predicate: (input: T) => boolean, fn: (input: T) => U) {
        this.#matchers.push([predicate, fn]);
        return this;
    }

    default<U>(fn: (input: T) => U) {
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

export function matchFirst<T, U>(obj: T, fallback: U, ...matchers: Array<(input: T) => any>) {
    for (const fn of matchers) {
        const result = fn(obj);
        if (result) {
            return result;
        }
    }
    return fallback;
}