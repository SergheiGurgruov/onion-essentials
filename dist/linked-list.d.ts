import { Maybe } from "./monads.js";
export declare class LinkedListNode<T> {
    value: T;
    next: Maybe<LinkedListNode<T>>;
    constructor(value: T);
}
export declare class LinkedList<T> {
    #private;
    get head(): Maybe<LinkedListNode<T>>;
    get tail(): Maybe<LinkedListNode<T>>;
    get length(): number;
    push(value: T): void;
    shift(): Maybe<T>;
    unshift(value: T): void;
    [Symbol.iterator](): Generator<T, void, unknown>;
}
