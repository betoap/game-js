import { Dictionary } from "../../Utils/Dictionary.js";
export class EventEmitter {
    constructor() {
        this.events = new Dictionary;
    }
    on(eventName, callback) {
        const oldEvents = this.events.get(eventName);
        if (this.events.has(eventName)) {
            return this.events.set(eventName, [...oldEvents, callback]);
        }
        return this.events.set(eventName, [callback]);
    }
    emit(eventName, data) {
        const myListeners = this.events.get(eventName);
        if (Array.isArray(myListeners) && myListeners.length) {
            myListeners.forEach(event => event(data));
        }
    }
    remove(eventName, data) {
        this.events.delete(eventName);
    }
}
//# sourceMappingURL=EventEmitter.js.map