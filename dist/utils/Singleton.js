export class Singleton {
    constructor() { }
    static get getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
//# sourceMappingURL=Singleton.js.map