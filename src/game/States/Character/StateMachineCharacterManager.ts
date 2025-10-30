import { Player } from "game/Character/Player.js";
import { State } from "../State.js";
import { StateMachineManager } from "../StateMachineManager.js";
import { CharacterState } from "./CharacterState.js";

export class StateMachineCharacterManager extends StateMachineManager {

  constructor( private player: Player ) {
    super();
  }

  public override changeTo<T extends State>(type: { new(): T ;} ) {
    const state: CharacterState = this.GetState<T>(type) as CharacterState;
    if(this._current != state) {
      state.player = this.player;
      this.changeState(state);
    }
  }

}