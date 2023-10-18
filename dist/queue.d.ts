export declare class Queue<T> {
    #private;
    get length(): number;
    enqueue(item: T): void;
    dequeue(): import("./monads.js").Maybe<T>;
}
