export type ActionQueueElement = (() => (void | Promise<void>));
export declare class ActionQueue {
    private queue;
    private onQueueEmptiedCallback?;
    onQueueEmptied(action: ActionQueueElement): void;
    dequeue(): Promise<void>;
    enqueue(action: ActionQueueElement): void;
}
