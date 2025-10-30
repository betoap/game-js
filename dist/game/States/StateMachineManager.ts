import { MonoBehaviour } from "../Core/MonoBehaviour.js";
import { State } from "./State.js";
import { Dictionary } from "../../Utils/Dictionary.js";

export abstract class StateMachineManager extends MonoBehaviour {

  public static instance: StateMachineManager;

  private _states: Dictionary<string, State> = new Dictionary<string, State>();
  protected _current!: State;
  private _busy!: boolean;
  
  public get current(): State {
    return this._current
  }
  
  public setStates(states: Array<State>) {
    states.forEach(state => {
      this._states.set(state.name, state);
    });
  }

  public GetState<T extends State>(type: { new(): T ;} ): State {
    const stateName: string = type.name;
    if(!this._states.has(stateName)) {
      const target = new type();
      this._states.set(stateName, target);
      return target;
    } 
    return this._states.get(stateName) as State;
  }

  public changeTo<T extends State>(type: { new(): T ;} ) {
    const state: State = this.GetState<T>(type);
    if(this._current != state) {
      this.changeState(state)
    }
  }

  protected changeState(state: State) {
    if(this._busy) return;

    this._busy = true;

    if(this._current != null) {
      this._current.exit();
    }

    this._current = state;
    if(this._current != null) {
      this._current.enter();
    }

    this._busy = false;
  }

}