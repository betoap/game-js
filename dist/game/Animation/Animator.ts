import { EventEmitter } from "../Events/EventEmitter.js";
import { Helper } from "../../Utils/Helper.js";
import { Vector2 } from "./../../Utils/Vector2.js";

export interface IAnimator{
  element: any;
  time?:number;
  x?:string;
  y?:string;
}


export interface IAnimation{
  element: any;
  time:number;
  steps:number;
  count:number | 'infinite';
  url: string;
  face: Vector2;
}


export class Animation {

  public event!:EventEmitter;

  constructor(public data:IAnimator){
    this.event = new EventEmitter();
    this.registerEvents();
  }

  private registerEvents(){
    this.data.element.addEventListener("animationstart", () => {
      this.event.emit('started');
      this.data.element.interval = setInterval(()=>{
        this.event.emit('loop');
      }, 1);
    });

  this.data.element.addEventListener("animationcancel", () => {
    this.event.remove('loop');
    this.event.emit('cancel');
  });

  this.data.element.addEventListener("animationend", () => {
    this.event.remove('loop');
    this.event.emit('finished');
  });
  }

  static async setPosition(data: IAnimator) {
    await Helper.waitForSeconds(0);
    if( data.x && !data.y ) {
      data.element.style.transform = `translateX(${data.x})`;
      return this.configAnimate(data);
    }
    if( !data.x && data.y ) {
      data.element.style.transform = `translateY(${data.y})`;
      return this.configAnimate(data);
    }
    data.element.style.transform = `translate(${data.x}, ${data.y})`;
    return this.configAnimate(data);
  }

  static setPositionByElement(data: {element: any, target: any}) {
    const {left, top } = data.target.getBoundingClientRect();
    data.element.style.transform = `translate(${left}, ${top})`;
    return this.configAnimate(data);
  }

  private static configAnimate(data: IAnimator){
    const time = data.time || 0;
    data.element.style.animationDuration = `${time}s`;
    data.element.style.transition = `all ${time}s ease-in`;
    data.element.style.animationName = 'animate';
    return new Animation(data);
  }

  public static async setAnimation(data: IAnimation) {
    // document.querySelector(`#keyframes-${data.element.id}`) TODO 
    data.element.style.background = `url(${data.url})`;
    const image = await Helper.loadImage(data.url);
    document.querySelector(`#keyframes-${data.element.id}`)?.remove();
    data.element.style.animation = `keyframes-${data.element.id} ${data.time}s steps(${data.steps}) ${data.count} reverse`;
    const keyframesAnimation = `@keyframes keyframes-${data.element.id} {from {background-position: 0 ${data.face.y}px;} to {background-position: ${image.width}px ${data.face.y}px;}};`;
    const keyFrames = document.createElement("style");
    keyFrames.setAttribute('id', `keyframes-${data.element.id}`);
    keyFrames.innerHTML = keyframesAnimation;
    data.element.appendChild(keyFrames);
  }

}