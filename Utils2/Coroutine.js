import { Dictionary } from './Dictionary.js';
import { Proxy } from './Proxy.js';
export class Coroutine {
    static generateKey() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    static startCoroutine(iterator, nextValue) {
        const key = this.generateKey();
        this.method.set(key, false);
        this.coroutina(iterator, nextValue, key);
        return key;
    }
    static coroutina(iterator, nextValue, key) {
        const stop = this.method.get(key);
        if (stop) {
            return nextValue;
        }
        const { done, value } = iterator.next(nextValue);
        if (done) {
            return nextValue;
        }
        if (value.constructor === Promise) {
            value
                .then(Proxy.create(this, this.resolve, iterator, key))
                .catch(Proxy.create(this, this.reject));
        }
        else {
            this.coroutina(iterator, value);
        }
    }
    static resolve(iterator, key, value) {
        this.coroutina(iterator, value, key);
    }
    static reject(error) {
        throw new Error(error);
    }
    static stopCoroutine(key) {
        if (this.method.has(key)) {
            this.method.set(key, true);
        }
    }
    static stopAllCoroutine() {
        const keys = this.method.keys();
        for (var key of keys) {
            this.method.set(key, true);
        }
    }
}
Coroutine.method = new Dictionary();
const delay = (ms, result) => {
    return new Promise((resolve) => setTimeout(() => resolve(result), ms));
};
//# sourceMappingURL=Coroutine.js.map