import { State } from "./State.js";

export class Menu extends State {

  public override enter(): void {
    console.log('enter MENU');
  }

  public override exit(): void {
    console.log('exit MENU');
  }

}