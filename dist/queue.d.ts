export declare class Queue<T> {
    #private;
    enqueue(item: T): void;
    dequeue(): import("./monads.js").Maybe<T>;
}
