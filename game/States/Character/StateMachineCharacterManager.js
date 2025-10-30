import { StateMachineManager } from "../StateMachineManager.js";
export class StateMachineCharacterManager extends StateMachineManager {
    constructor(player) {
        super();
        this.player = player;
    }
    changeTo(type) {
        const state = this.GetState(type);
        if (this._current != state) {
            state.player = this.player;
            this.changeState(state);
        }
    }
}
//# sourceMappingURL=StateMachineCharacterManager.js.map