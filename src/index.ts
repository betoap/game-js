import { GameState } from "./game/States/Game/Game.state.js";
import { StateMachineGameManager } from "./game/States/Game/StateMachineGameManager.js";

export class Index {

  constructor() {
    const fsmg = new StateMachineGameManager();
    fsmg.changeTo(GameState);
  }

}

new Index();