export type FunctionWithCallback<T = any> = (...args: [...any, (data: T) => any]) => void;
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
export function parallel(parallel: ($await: (_: unknown) => void, $: (data: any) => void) => void, complete: (results: any[]) => void) {
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
    const $await = (_: unknown) => {
        functionsToRun++;
    };
    parallel($await, $);

    $(undefined, true);
}
/**
 * this function will returns a "proxy" function that will only call the callback once
 */
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
