import { Queue } from "./queue.js";

export type ActionQueueElement = (() => (void | Promise<void>));
export class ActionQueue {
  private queue: Queue<ActionQueueElement> = new Queue<ActionQueueElement>();
  private onQueueEmptiedCallback?: ActionQueueElement;
  public onQueueEmptied(action: ActionQueueElement) {
    this.onQueueEmptiedCallback = action;
  }

  async dequeue() {
    await Promise.resolve(this.queue[0]());
    this.queue.dequeue();
    if (this.queue.length > 0) { this.dequeue() }
    if (this.queue.length == 0) { this.onQueueEmptiedCallback?.() }
  }

  enqueue(action: ActionQueueElement) {
    this.queue.enqueue(action);
    if (this.queue.length == 1) {
      this.dequeue();
    }
  }
}
