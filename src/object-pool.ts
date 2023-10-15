export type Intantiable<T = any> = new (...args: any) => T;
interface IPoolable {
    reset(): void;
    construct(...args: ConstructorParameters<typeof this>): InstanceType<typeof this>;
}

export class ObjectPool<T extends InstanceType<U> & IPoolable, U extends Intantiable> {
    #pooledInstances: T[] = []
    constructor(
        public generator: U,
        public poolMaxSize: number = 100
    ) { }

    release(instance: T) {
        if (this.#pooledInstances.length < this.poolMaxSize) {
            instance.reset();
            this.#pooledInstances.push(instance);
            return;
        } 
    }

    get(...args: ConstructorParameters<U>): T {
        if (this.#pooledInstances.length > 0) {
            return this.#pooledInstances.pop()!.construct(...args as any);
        }
        return new this.generator(...args as any);
    }
}