export type FunctionWithCallback<T = any> = (...args: [...any, (data: T) => any]) => void;
export declare function parallel(parallel: (await: (_: void) => void, $: (data: any) => void) => void, complete: (results: any[]) => void): void;
