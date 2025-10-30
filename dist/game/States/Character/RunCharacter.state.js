import { Animation } from "../../Animation/Animator.js";
import { CharacterState } from "./CharacterState.js";
import { IdleCharacterState } from "./IdleCharacter.state.js";
import { WalkCharacterState } from "./WalkCharacter.state.js";
export class RunCharacterState extends CharacterState {
    enter() {
        this.animationConfig = {
            element: this.player.element,
            time: .3,
            steps: 10,
            count: 'infinite',
            url: './../assets/images/walk.png',
            face: this.player.face
        };
        this.player.speed = this.player.speedRun;
        Animation.setAnimation(this.animationConfig);
    }
    update() {
        if (this.animationConfig.face !== this.player.face) {
            this.animationConfig.face = this.player.face;
            Animation.setAnimation(this.animationConfig);
        }
        if (!(this.player.joystick.horizontal || this.player.joystick.vertical)) {
            this.player.fsm.changeTo(IdleCharacterState);
        }
        if (!this.player.joystick.run) {
            this.player.fsm.changeTo(WalkCharacterState);
        }
    }
    exit() {
    }
}
//# sourceMappingURL=RunCharacter.state.js.map