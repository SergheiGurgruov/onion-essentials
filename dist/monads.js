export class Maybe {
    value;
    static _ = {};
    constructor(value) {
        this.value = value;
    }
    unwrap() {
        if (this.value === Maybe._) {
            throw new Error("called `Opt::unwrap()` on a `none` value");
        }
        return this.value;
    }
    isNone() {
        return this.value === Maybe._;
    }
    isSome() {
        return this.value !== Maybe._;
    }
    static some(value) {
        return new Maybe(value);
    }
    static get none() {
        return new Maybe(Maybe._);
    }
    match(some, none) {
        if (this.value === Maybe._) {
            return none();
        }
        return some(this.value);
    }
    chain(fn) {
        if (this.value === Maybe._) {
            return Result.Err(new Error("called `Opt::unwrap()` on a `none` value"));
        }
        return Result.encase(() => fn(this.value));
    }
    toString() {
        if (this.value === Maybe._) {
            return "null";
        }
        return this.value?.toString() || "";
    }
}
export class Result {
    value;
    error;
    constructor(value, error) {
        this.value = value;
        this.error = error;
    }
    static Ok(value) {
        return new Result(value);
    }
    static Err(error) {
        return new Result(undefined, error);
    }
    isOk() {
        return !this.error;
    }
    isErr() {
        return !!this.error;
    }
    unwrap() {
        if (this.error) {
            throw this.error;
        }
        return this.value;
    }
    match(ok, err) {
        if (this.error) {
            return err(this.error);
        }
        return ok(this.value);
    }
    static encase(fn) {
        try {
            return Result.Ok(fn());
        }
        catch (e) {
            return Result.Err(e);
        }
    }
    chain(fn) {
        if (this.error) {
            return this;
        }
        return this.recycle(() => fn(this.value));
    }
    recycle(fn) {
        try {
            this.value = fn();
        }
        catch (e) {
            this.error = e;
        }
        return this;
    }
}
