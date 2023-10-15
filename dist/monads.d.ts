export declare class Maybe<T> {
    value: T;
    private static _;
    private constructor();
    unwrap(): T;
    isNone(): boolean;
    isSome(): boolean;
    static some<T>(value: T): Maybe<T>;
    static get none(): Maybe<any>;
    match<U>(some: (value: T) => U, none: () => U): U;
    chain<U>(fn: (value: T) => U): Result<U>;
    toString(): string;
}
export declare class Result<T, E = Error> {
    private value?;
    private error?;
    private constructor();
    static Ok<T>(value: T): Result<T>;
    static Err<E>(error: E): Result<any, E>;
    unwrap(): T;
    match<U>(ok: (value: T) => U, err: (error: E) => U): U;
    static encase<U>(fn: () => U): Result<U>;
    chain<U, V = Error>(fn: (value: T) => U): Result<U, V>;
    private recycle;
}
