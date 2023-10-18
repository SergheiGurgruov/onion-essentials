import { LinkedList } from "./linked-list.js";
export class Queue {
    #items = new LinkedList();
    get length() {
        return this.#items.length;
    }
    enqueue(item) {
        this.#items.push(item);
    }
    dequeue() {
        return this.#items.shift();
    }
}
