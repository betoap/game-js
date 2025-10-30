import { MonoBehaviour } from "../Core/MonoBehaviour.js";
import { Dictionary } from "../../Utils/Dictionary.js";
export class StateMachineManager extends MonoBehaviour {
    constructor() {
        super(...arguments);
        this._states = new Dictionary();
    }
    get current() {
        return this._current;
    }
    setStates(states) {
        states.forEach(state => {
            this._states.set(state.name, state);
        });
    }
    GetState(type) {
        const stateName = type.name;
        if (!this._states.has(stateName)) {
            const target = new type();
            this._states.set(stateName, target);
            return target;
        }
        return this._states.get(stateName);
    }
    changeTo(type) {
        const state = this.GetState(type);
        if (this._current != state) {
            this.changeState(state);
        }
    }
    changeState(state) {
        if (this._busy)
            return;
        this._busy = true;
        if (this._current != null) {
            this._current.exit();
        }
        this._current = state;
        if (this._current != null) {
            this._current.enter();
        }
        this._busy = false;
    }
}
//# sourceMappingURL=StateMachineManager.js.map