/**
 * this function will run all the functions in parallel and call the complete callback when all the functions are done,
 *
 * the functions should call the $ function to signal that they are done
 *
 * the results will NOT be necessarily in the same order as the functions were called
 *
 * @example
 * parallel(($await, $) => {
 *   $await(setTimeout(() => {
 *       $(1);
 *   }, 1000));
 *   $await(setTimeout(() => {
 *       $(2);
 *   }, 2000));
 * },
 * (results) => {
 *   console.log(results); // [1, 2]
 * });
 */
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
/**
 * this function will returns a "proxy" function that will only call the callback once
 */
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
