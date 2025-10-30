"use strict";
Object.defineProperty(Object.prototype, Symbol.iterator, {
    value: function* () {
        let keys = Object.keys(this);
        for (let key of keys) {
            const obj = {};
            obj[key] = this[key];
            yield obj;
        }
    },
    enumerable: false
});
let obj = { a: 'b', c: 'd' };
for (let i of obj) {
    if (i.a) {
        console.log(i.a);
        break;
    }
    console.log(i);
}
//# sourceMappingURL=Object.js.map