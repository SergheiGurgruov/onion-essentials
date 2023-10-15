import { Maybe } from "./monads.js";
export class LinkedListNode {
    value;
    next = Maybe.none;
    constructor(value) {
        this.value = value;
    }
}
export class LinkedList {
    #head = Maybe.none;
    #tail = Maybe.none;
    #length = 0;
    get head() {
        return this.#head;
    }
    get tail() {
        return this.#tail;
    }
    get length() {
        return this.#length;
    }
    push(value) {
        const node = new LinkedListNode(value);
        this.#head.match((some) => {
            this.#tail.unwrap().next = Maybe.some(node);
            this.#tail = Maybe.some(node);
        }, () => {
            this.#head = Maybe.some(node);
            this.#tail = Maybe.some(node);
        });
        this.#length++;
    }
    shift() {
        return this.#head.match((node) => {
            this.#head = node.next;
            this.#length--;
            return Maybe.some(node.value);
        }, () => Maybe.none);
    }
    unshift(value) {
        const newNode = new LinkedListNode(value);
        this.#head.match((_some) => {
            newNode.next = this.#head;
            this.#head = Maybe.some(newNode);
        }, () => {
            this.#head = Maybe.some(newNode);
            this.#tail = Maybe.some(newNode);
        });
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
