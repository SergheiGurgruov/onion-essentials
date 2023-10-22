
export function some<T>(value: T): Maybe<T> {
    return Maybe.some(value);
}

export function none<T = any>(): Maybe<T> {
    return Maybe.none;
}

export class Maybe<T> {
    private static _ = {};
    private constructor(public value: T) { }

    public unwrap(): T {
        if (this.value === Maybe._) {
            throw new Error("called `Opt::unwrap()` on a `none` value");
        }
        return this.value;
    }

    public isNone(): boolean {
        return this.value === Maybe._;
    }

    public isSome(): boolean {
        return this.value !== Maybe._;
    }

    public static some<T>(value: T): Maybe<T> {
        return new Maybe(value);
    }

    public static get none(): Maybe<any> {
        return new Maybe(Maybe._);
    }

    public match<U>(some: (value: T) => U, none: () => U): U {
        if (this.value === Maybe._) {
            return none();
        }
        return some(this.value);
    }

    public chain<U>(fn: (value: T) => U): Result<U> {
        if (this.value === Maybe._) {
            return Result.Err(new Error("called `Opt::unwrap()` on a `none` value"));
        }
        return Result.encase(() => fn(this.value));
    }

    public toString(): string {
        if (this.value === Maybe._) {
            return "null";
        }
        return this.value?.toString() || "";
    }

}

export class Result<T, E = Error> {
    #value?: T;
    #error?: E;
    private constructor(value?: T, error?: E) {
        this.#value = value;
        this.#error = error
    }
    public static Ok<T>(value?: T): Result<T> {
        return new Result(value);
    }

    get error(): Maybe<E> {
        return this.#error ? Maybe.some(this.#error) : Maybe.none;
    }

    get value(): Maybe<T> {
        return this.#value ? Maybe.some(this.#value) : Maybe.none;
    }

    public static Err<E>(error: E): Result<any, E> {
        return new Result<any, E>(undefined, error);
    }

    public isOk(): boolean {
        return !this.#error;
    }

    public isErr(): boolean {
        return !!this.#error;
    }

    public unwrap(): T {
        if (this.#error) {
            throw this.#error;
        }
        return this.#value as T;
    }
    public match<U>(ok: (value: T) => U, err: (error: E) => U): U {
        if (this.#error) {
            return err(this.#error);
        }
        return ok(this.#value as T);
    }

    public static encase<U>(fn: () => U): Result<U> {
        try {
            return Result.Ok(fn());
        } catch (e) {
            return Result.Err(e as Error);
        }
    }

    public chain<U, V = Error>(fn: (value: T) => U): Result<U, V> {
        if (this.#error) {
            return this as any as Result<U, V>;
        }
        return this.recycle<U, V>(() => fn(this.#value as T));
    }

    private recycle<U, V>(fn: () => U): Result<U, V> {
        try {
            this.#value = fn() as any as T;
        } catch (e) {
            this.#error = e as any as E;
        }
        return this as any as Result<U, V>;
    }

}