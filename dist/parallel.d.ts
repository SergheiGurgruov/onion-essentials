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
export declare function parallel(parallel: ($await: (_: unknown) => void, $: (data: any) => void) => void, complete: (results: any[]) => void): void;
/**
 * this function will returns a "proxy" function that will only call the callback once
 */
export declare function once<T extends unknown[]>(callback: (...args: T) => void): (...args: T) => void;
