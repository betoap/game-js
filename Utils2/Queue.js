export class Queue {
    constructor(...items) {
        this._queue = new Array();
        if (items.length > 0) {
            this.enqueue(...items);
        }
    }
    enqueue(...items) {
        items.forEach((item) => {
            this._queue.push(item);
        });
    }
    dequeue(count = 1) {
        if (this.count > 0) {
            return this._queue.splice(0, count)[0];
        }
        return undefined;
    }
    get count() {
        return this._queue.length;
    }
    isEmpty() {
        return this._queue.length == 0;
    }
    get items() {
        return this._queue;
    }
}
//# sourceMappingURL=Queue.js.map