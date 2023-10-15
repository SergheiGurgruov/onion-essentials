export type Intantiable<T = any> = new (...args: any) => T;
interface IPoolable {
    reset(): void;
    construct(...args: ConstructorParameters<typeof this>): InstanceType<typeof this>;
}
export declare class ObjectPool<T extends InstanceType<U> & IPoolable, U extends Intantiable> {
    #private;
    generator: U;
    poolMaxSize: number;
    constructor(generator: U, poolMaxSize?: number);
    release(instance: T): void;
    get(...args: ConstructorParameters<U>): T;
}
export {};
