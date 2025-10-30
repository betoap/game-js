import { Vector2 } from "./../../Utils/Vector2.js";
import { MonoBehaviour } from "./../Core/MonoBehaviour.js";
export class Character extends MonoBehaviour {
    get FSMCurrent() {
        return this._FSMCurrent;
    }
    constructor() {
        super();
        this.horizontal = 0;
        this.vertical = 0;
        this.moved = false;
        this.direction = Vector2.right;
    }
    instantiate(elementParent) {
        super.instantiate(elementParent);
    }
}
//# sourceMappingURL=Character.js.map