export function parallel(parallel, complete) {
    let functionsToRun = 1;
    const results = [];
    const $ = (data, ignoreOutput = false) => {
        if (!ignoreOutput) {
            results.push(data);
        }
        functionsToRun--;
        if (functionsToRun === 0) {
            complete(results);
        }
    };
    const $await = (_) => {
        functionsToRun++;
    };
    parallel($await, $);
    $(undefined, true);
}
export function once(callback) {
    const resolver = (function* () {
        yield true;
    })();
    return (...args) => {
        if (resolver.next().value) {
            callback(...args);
        }
    };
}
