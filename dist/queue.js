import { LinkedList } from "./linked-list.js";
export class Queue {
    #items = new LinkedList();
    enqueue(item) {
        this.#items.push(item);
    }
    dequeue() {
        return this.#items.shift();
    }
}
