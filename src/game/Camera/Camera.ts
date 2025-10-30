import { MonoBehaviour } from "../Core/MonoBehaviour.js";
import { Vector2 } from '../../Utils/Vector2.js';

export class Camera extends MonoBehaviour {

  public zoom!: number;
  public active!: boolean;
  public offset: number = .25;
  public sizeMax!: Vector2;
  
  public get leftEdge(): number {
    return this.position.x + (this.size.width * this.offset);
  }
  public get rightEdge(): number {
    return this.position.x + (this.size.width * this.offset * 3);
  }
  public get topEdge(): number {
    return this.position.y + (this.size.height * this.offset);
  }
  public get bottomEdge(): number {
    return this.position.y + (this.size.height * this.offset * 3);
  }

  constructor(
    protected cameraElementParent: HTMLElement = document.body
  ){
    super();
  }

  public getCanvasCenter(): Vector2 {
    return new Vector2(
      this.cameraElementParent.clientWidth / 2 - this.size.width / 2,
      this.cameraElementParent.clientHeight / 2 - this.size.height / 2
    );
  }

}