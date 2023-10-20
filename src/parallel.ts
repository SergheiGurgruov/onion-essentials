export type FunctionWithCallback<T = any> = (...args: [...any, (data: T) => any]) => void;
export function parallel(parallel: ($await: (_: void) => void, $: (data: any) => void) => void, complete: (results: any[]) => void) {
    let functionsToRun = 1;

    const results = [];
    const $ = (data: any, ignoreOutput = false) => {
        if (!ignoreOutput) {
            results.push(data);
        }
        functionsToRun--;
        if (functionsToRun === 0) {
            complete(results);
        }
    };
    const $await = (_: void) => {
        functionsToRun++;
    };
    parallel($await, $);

    $(undefined, true);
}

export function once<T extends unknown[]>(callback: (...args: T) => void) {
    const resolver = (function* () {
        yield true;
    })();
    return (...args: T) => {
        if (resolver.next().value) {
            callback(...args);
        }
    }
}
