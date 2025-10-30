import { Helper } from "./Helper.js";
export class Dictionary extends Map {
    constructor(entries) {
        super(entries);
    }
    get(_value) {
        for (const item of this) {
            if (Helper.objectToEqual(item[0], _value)) {
                return item[1];
            }
        }
        return;
    }
    getForValue(_value) {
        for (const item of this) {
            if (item[1] === _value) {
                return item[0];
            }
        }
        return;
    }
}
//# sourceMappingURL=Dictionary.js.map