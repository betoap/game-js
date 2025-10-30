import { Joystick } from "../Joystick/Joystick.js";
import { Tile } from "./../IA/Tile.js";
import { Vector2 } from "./../../Utils/Vector2.js";
import { StateMachineCharacterManager } from "./../States/Character/StateMachineCharacterManager.js";
import { Character } from "./Character.js";
import { IdleCharacterState } from "../States/Character/IdleCharacter.state.js";
import { GameObject } from "./../Core/GameObject.js";
import { Rectangle } from "./../../Utils/Rectangle.js";
import { Rigidbody } from "./../Physicas/Rigidbody.js";
import { Board } from "./../IA/Board.js";

export class Player extends Character {

  public speed!: number;
  public speedRun!: number;
  public tile!: Tile;
  public joystick: Joystick = new Joystick();
  
  public image: string = './../assets/images/walk.png';
  public time: number = .6;
  public steps: number = 11;
  public count:string = 'infinite';
  private _face: Vector2 = new Vector2(0, 576);
  public get face(): Vector2 {
    return this._face;
  }

  private _fsm!:StateMachineCharacterManager;
  public get fsm(): StateMachineCharacterManager {
    return this._fsm;
  }

  private _collider: boolean = true;
  public get collider(): boolean {
    return this._collider;
  }

  constructor() {
    super();
    Rigidbody.instance.colliders.push(this);
  }

  public start(){
    this._fsm = new StateMachineCharacterManager(this);
    this._fsm.changeTo(IdleCharacterState);
    this.setRigidbody(new Rectangle(30, 20, 80, 102));
  }

  update() {

    this.position.x += this.speed * this.joystick.horizontal;
    this.position.y += this.speed * this.joystick.vertical;
    this.tile = Board.getPositionToTile(this.position);
    
    if(this.joystick.vertical === -1 ){
      this._face = new Vector2(0, 0);
    }
    if(this.joystick.horizontal === 1){
      this._face = new Vector2(0, 576);
    }
    if(this.joystick.vertical === 1 ){
      this._face = new Vector2(0, 384);
    }
    if(this.joystick.horizontal === -1){
      this._face = new Vector2(0, 192);
    }
    
    this._fsm.current.update();
  }

  render() {
    this.element.style.top = `${this.position.y}px`;
    this.element.style.left = `${this.position.x}px`;
    const height = this.tile?.size?.height || 0;
    this.element.style.zIndex = `${Math.floor((this.position.y + this.hitArea.y + this.hitArea.height - 1) / height ) -1 }`;
  }

  private change = false;

  collision(other: GameObject) {
    // if( other?.properties?.draggable ){
    //   other.position.x = other.position.x + this.speed * this.joystick.horizontal;
    //   other.position.y = other.position.y + this.speed * this.joystick.vertical;
    //   other.element.style.top = `${other.position.y}px`;
    //   other.element.style.left = `${other.position.x}px`;
    //   other.element.style.zIndex = `${Math.floor((other.position.y + other.hitArea.y + other.hitArea.height - 1) / other.size.height ) }`;
    // }
    
    // if(other?.properties?.openRef && !this.change) {
    //   this.change = true;
    //   // Board.instance.changeTile( (other as Tile) , other?.properties?.openRef);
    //   // setTimeout(() => {
    //   //   this.change = false;
    //   // }, 3000);
    // }
  }

}