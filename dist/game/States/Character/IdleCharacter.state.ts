import { Animation } from "../../Animation/Animator.js";
import { CharacterState } from "./CharacterState.js";
import { WalkCharacterState } from "./WalkCharacter.state.js";

export class IdleCharacterState extends CharacterState {

  public override enter(): void {
    this.animationConfig = {
      element: this.player.element,
      time: .6,
      steps: 7,
      count: 'infinite',
      url: './../assets/images/idle.png',
      face: this.player.face
    };
    this.player.speed = 0;
    Animation.setAnimation(this.animationConfig);
  }

  public override update(): void {
    if(!!( this.player.joystick.horizontal || this.player.joystick.vertical )) {
      this.player.fsm.changeTo(WalkCharacterState);
    }
  }
  public override exit(): void {
    // console.log("exit Idle");
  }

}