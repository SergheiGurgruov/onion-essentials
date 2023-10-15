export class ObjectPool {
    generator;
    poolMaxSize;
    #pooledInstances = [];
    constructor(generator, poolMaxSize = 100) {
        this.generator = generator;
        this.poolMaxSize = poolMaxSize;
    }
    release(instance) {
        if (this.#pooledInstances.length < this.poolMaxSize) {
            instance.reset();
            this.#pooledInstances.push(instance);
            return;
        }
    }
    get(...args) {
        if (this.#pooledInstances.length > 0) {
            return this.#pooledInstances.pop().construct(...args);
        }
        return new this.generator(...args);
    }
}
