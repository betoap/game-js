import { State } from "./../States/State.js";
import { Vector2 } from "./../../Utils/Vector2.js";
import { MonoBehaviour } from "./../Core/MonoBehaviour.js";

export abstract class Character extends MonoBehaviour {

  public horizontal:number = 0;
  public vertical: number = 0;
  public moved: boolean = false;
  protected direction:Vector2 = Vector2.right;


  private _FSMCurrent!: State;
  public get FSMCurrent(): State {
    return this._FSMCurrent;
  }


  constructor() {
    super();
  }

  override instantiate(elementParent: HTMLElement): void {
    // this.position = new Vector2(this.position.x * 64, this.position.y * 64);
    super.instantiate(elementParent);
  }

}