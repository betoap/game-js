import { Animation } from "../../Animation/Animator.js";
import { CharacterState } from "./CharacterState.js";
import { IdleCharacterState } from "./IdleCharacter.state.js";
import { RunCharacterState } from "./RunCharacter.state.js";
export class WalkCharacterState extends CharacterState {
    enter() {
        this.animationConfig = {
            element: this.player.element,
            time: .6,
            steps: 10,
            count: 'infinite',
            url: './../assets/images/walk.png',
            face: this.player.face
        };
        Animation.setAnimation(this.animationConfig);
        this.player.speed = .4;
    }
    update() {
        if (this.animationConfig.face !== this.player.face) {
            this.animationConfig.face = this.player.face;
            Animation.setAnimation(this.animationConfig);
        }
        if (this.player.joystick.run) {
            this.player.fsm.changeTo(RunCharacterState);
        }
        if (!(this.player.joystick.horizontal || this.player.joystick.vertical)) {
            this.player.fsm.changeTo(IdleCharacterState);
        }
    }
    exit() {
    }
}
//# sourceMappingURL=WalkCharacter.state.js.map