import { Dictionary } from './Dictionary.js';
import { Proxy } from './Proxy.js';

export class Coroutine {
  private static generateKey() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  private static method: Dictionary<any, any> = new Dictionary();

  static startCoroutine(iterator: Iterator<any>, nextValue?: any): any {
    const key = this.generateKey();
    this.method.set(key, false);
    this.coroutina(iterator, nextValue, key);
    return key;
  }

  private static coroutina(
    iterator: Iterator<any>,
    nextValue?: any,
    key?: string
  ): void {
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
    } else {
      this.coroutina(iterator, value);
    }
  }

  private static resolve(
    iterator: Iterator<any>,
    key: string,
    value: any
  ): void {
    this.coroutina(iterator, value, key);
  }

  private static reject(error: any): void {
    throw new Error(error);
  }

  static stopCoroutine(key: any): void {
    if (this.method.has(key)) {
      this.method.set(key, true);
    }
  }

  static stopAllCoroutine(): void {
    const keys = this.method.keys();
    for (var key of keys) {
      this.method.set(key, true);
    }
  }
}

const delay = (ms: any, result: any) => {
  return new Promise((resolve) => setTimeout(() => resolve(result), ms));
};

/*
import fetch from 'node-fetch';
const data: any = {
    method: 'GET',
    mode: 'cors',
    'headers': {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    }
}
const d = Coroutine.StartCoroutine(delays(100));
function * delays(x: any) {
    const url = `https://viacep.com.br/ws/06900000/json`;
    let w = yield fetch(url, data);
    let j = yield w.json();
    console.log(j);
    Coroutine.StopAllCoroutine( );
    let a = yield delay(800 + x, "Hello, I'm an");
    console.log( a );
    let b = yield delay(100 + x , "async coroutine!");
    console.log( b );
    const c = yield delay(100 + x, "async coroutine finish!!!!");
    console.log( c );
    const o = yield {a: 123, b: 456 };
    console.log( o );
    return yield x;
}

// call it
// const c = new Coroutine();
// const c = Coroutine.StartCoroutine(delays(100));

console.log( d );
// console.log( '---------------' );
// console.log( d );

*/
