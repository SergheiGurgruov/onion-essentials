import { Queue } from "./queue.js";
export class ActionQueue {
    queue = new Queue();
    onQueueEmptiedCallback;
    onQueueEmptied(action) {
        this.onQueueEmptiedCallback = action;
    }
    async dequeue() {
        await Promise.resolve(this.queue[0]());
        this.queue.dequeue();
        if (this.queue.length > 0) {
            this.dequeue();
        }
        if (this.queue.length == 0) {
            this.onQueueEmptiedCallback?.();
        }
    }
    enqueue(action) {
        this.queue.enqueue(action);
        if (this.queue.length == 1) {
            this.dequeue();
        }
    }
}
