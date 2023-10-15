import { Maybe } from "./monads.js";

export class LinkedListNode<T> {
    next: Maybe<LinkedListNode<T>> = Maybe.none;
    constructor(public value: T) { }
}
export class LinkedList<T>{
    #head: Maybe<LinkedListNode<T>> = Maybe.none;
    #tail: Maybe<LinkedListNode<T>> = Maybe.none;
    #length: number = 0;

    get head() {
        return this.#head;
    }

    get tail() {
        return this.#tail;
    }

    get length() {
        return this.#length;
    }

    push(value: T) {
        const node = new LinkedListNode(value);
        this.#head.match(
            (some) => {
                this.#tail.unwrap().next = Maybe.some(node);
                this.#tail = Maybe.some(node);
            },
            () => {
                this.#head = Maybe.some(node);
                this.#tail = Maybe.some(node);
            }
        )

        this.#length++;
    }

    shift(): Maybe<T> {
        return this.#head.match(
            (node: LinkedListNode<T>) => {
                this.#head = node.next;
                this.#length--;
                return Maybe.some(node.value);
            },
            () => Maybe.none
        )
    }

    unshift(value: T) {
        const newNode = new LinkedListNode(value);
        this.#head.match(
            (_some) => {
                newNode.next = this.#head;
                this.#head = Maybe.some(newNode);
            },
            () => {
                this.#head = Maybe.some(newNode);
                this.#tail = Maybe.some(newNode);
            }
        )
        this.#length++;
    }

    *[Symbol.iterator]() {
        let maybeNode = this.#head;
        while (maybeNode.isSome()) {
            const node = maybeNode.unwrap();
            yield node.value;
            maybeNode = node.next;
        }
    }
}