import { Joystick } from "../Joystick/Joystick.js";
import { Vector2 } from "./../../Utils/Vector2.js";
import { StateMachineCharacterManager } from "./../States/Character/StateMachineCharacterManager.js";
import { Character } from "./Character.js";
import { IdleCharacterState } from "../States/Character/IdleCharacter.state.js";
import { Rectangle } from "./../../Utils/Rectangle.js";
import { Rigidbody } from "./../Physicas/Rigidbody.js";
import { Board } from "./../IA/Board.js";
export class Player extends Character {
    get face() {
        return this._face;
    }
    get fsm() {
        return this._fsm;
    }
    get collider() {
        return this._collider;
    }
    constructor() {
        super();
        this.joystick = new Joystick();
        this.image = './../assets/images/walk.png';
        this.time = .6;
        this.steps = 11;
        this.count = 'infinite';
        this._face = new Vector2(0, 576);
        this._collider = true;
        this.change = false;
        Rigidbody.instance.colliders.push(this);
    }
    start() {
        this._fsm = new StateMachineCharacterManager(this);
        this._fsm.changeTo(IdleCharacterState);
        this.setRigidbody(new Rectangle(30, 20, 80, 102));
    }
    update() {
        this.position.x += this.speed * this.joystick.horizontal;
        this.position.y += this.speed * this.joystick.vertical;
        this.tile = Board.getPositionToTile(this.position);
        if (this.joystick.vertical === -1) {
            this._face = new Vector2(0, 0);
        }
        if (this.joystick.horizontal === 1) {
            this._face = new Vector2(0, 576);
        }
        if (this.joystick.vertical === 1) {
            this._face = new Vector2(0, 384);
        }
        if (this.joystick.horizontal === -1) {
            this._face = new Vector2(0, 192);
        }
        this._fsm.current.update();
    }
    render() {
        this.element.style.top = `${this.position.y}px`;
        this.element.style.left = `${this.position.x}px`;
        const height = this.tile?.size?.height || 0;
        this.element.style.zIndex = `${Math.floor((this.position.y + this.hitArea.y + this.hitArea.height - 1) / height) - 1}`;
    }
    collision(other) {
    }
}
//# sourceMappingURL=Player.js.map