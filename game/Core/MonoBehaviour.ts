import { Dictionary } from "../../Utils/Dictionary.js";
import { EventEmitter } from "../Events/EventEmitter.js";
import { GameObject } from "./GameObject.js";
import { Helper } from "../../Utils/Helper.js";
import { Rigidbody } from "./../Physicas/Rigidbody.js";

class GameEvents {
  public events: Dictionary<string, MonoBehaviour> = new Dictionary<string, MonoBehaviour>;

  private static _instance: GameEvents;
  private constructor() { }
  public static get instance(): GameEvents {
    if (!GameEvents._instance) {
      GameEvents._instance = new GameEvents();
    }
    return GameEvents._instance;
  }
  
}

export abstract class MonoBehaviour extends GameObject {

  private stop:boolean;
  private fpsInterval:number;
  private now:number;
  private lastTime:number;
  private elapsed:number;
  private uuid: string;
  private interval: any;
  
  public event: EventEmitter;
  public fps;

  constructor() {
    super();
    this.uuid = Helper.UUID();
    this.stop = false;
    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;
    this.lastTime = Date.now();
    this.now = Date.now();
    this.elapsed = 0;
    this.event = new EventEmitter();
    this.registerEvents();
    this._start();
    this._disable();
    this._fixUpdate();
    this._update();
  }

  private _start() {
  }
  private _disable(){
    // GameEvents.instance.events.forEach( obj => obj?['disable'].apply(obj));
  }
  private _enable() {
    // GameEvents.instance.events.forEach( obj => obj?['enable'].apply(obj));
  }
  private _destroy() {
    GameEvents.instance.events.forEach( obj => obj['destroy']?.apply(obj));
  }

  private _update() {
    if( this.stop ) return;
    this.now = Date.now();
    this.elapsed = this.now - this.lastTime;
    if (this.elapsed > this.fpsInterval) {
      this.lastTime = this.now - (this.elapsed % this.fpsInterval);
      GameEvents.instance.events.forEach( obj => obj['update']?.apply(obj));
      this._collision();
      this._render();
    }
    requestAnimationFrame(()=>this._update());
  }

  private _fixUpdate() {
    this.interval = setInterval(()=>{
      if( this.stop ) return;
      GameEvents.instance.events.forEach( obj => obj['fixUpdate']?.apply(obj));
      this._lateUpdate();
    }, this.fpsInterval);
  }

  private _lateUpdate() {
    if( this.stop ) return;
    GameEvents.instance.events.forEach( obj => obj['lateUpdate']?.apply(obj));
  }

  private _render() {
    if( this.stop ) return;
    GameEvents.instance.events.forEach( obj => obj['render']?.apply(obj));
  }

  private registerEvents() {
    this.registerEvent('started');
    this.registerEvent('update');
    this.registerEvent('render');
    this.registerEvent('fixUpdate');
    this.registerEvent('lateUpdate');
    this.registerEvent('destroy');
    this.registerEvent('collision');
  }

  private registerEvent(method: string) {
    if( typeof (this as any)[method] === 'function' ) {
      GameEvents.instance.events.set(`${this.uuid}-${method}`, this);
    }
  }

  public _collision() {
    Rigidbody.instance.colliders.forEach( obj => obj.rigidbody._checkCollision(obj, Rigidbody.instance.colliders) );
  }

}


