export function* idGenerator() {
    let i = 1

    while (true) {
        yield i++
    }
}