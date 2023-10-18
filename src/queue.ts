import { LinkedList } from "./linked-list.js";

export class Queue<T>{
    #items: LinkedList<T> = new LinkedList<T>();
    get length() {
        return this.#items.length;
    }
    enqueue(item: T) {
        this.#items.push(item);
    }
    dequeue() {
        return this.#items.shift();
    }
}