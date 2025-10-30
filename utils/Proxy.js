export class Proxy {
    static create(scope, method, ...params) {
        var aArgs = Array.prototype.slice.call(arguments, 2);
        return function () {
            const _arr = Array.prototype.slice.call(arguments, 0);
            return method.apply(scope, aArgs.concat(_arr));
        };
    }
}
//# sourceMappingURL=Proxy.js.map