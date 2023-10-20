export function parallel(parallel, complete) {
    let functionsToRun = 0;
    const results = [];
    const $ = (data) => {
        results.push(data);
        functionsToRun--;
        if (functionsToRun === 0) {
            complete(results);
        }
    };
    const await = (_) => {
        functionsToRun++;
    };
    parallel(await, $);
}
