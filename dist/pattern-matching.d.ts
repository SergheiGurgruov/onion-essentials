export declare function match<T>(value: T): OnionMatcher<T>;
declare class OnionMatcher<T> {
    #private;
    private value;
    constructor(value: T);
    case<U>(predicate: (input: T) => boolean, fn: (input: T) => U): this;
    default<U>(fn: (input: T) => U): this;
    eval(): any;
}
export declare function matchFirst<T, U>(obj: T, fallback: U, ...matchers: Array<(input: T) => any>): any;
export {};
