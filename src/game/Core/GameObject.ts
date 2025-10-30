import { EventEmitter } from "../Events/EventEmitter.js";
import { Rectangle } from "../../Utils/Rectangle.js";
import { Vector2 } from "../../Utils/Vector2.js";
import { Rigidbody } from "./../Physicas/Rigidbody.js";

export class GameObject {
  
  public name!: string;
  public id!: string;
  public reference!: any;
  public properties: any = {};
  public background!: string;
  public position!: Vector2;
  public size!: Rectangle;
  public zIndex!: number;
  public events: EventEmitter = new EventEmitter();
  protected _corners!: { topLeft?: Vector2, topRight?: Vector2, bottomLeft?: Vector2, bottomRight?: Vector2 };
  public get corners(): { topLeft?: Vector2, topRight?: Vector2, bottomLeft?: Vector2, bottomRight?: Vector2 } {
    return this._corners;
  }

  public rigidbody!: Rigidbody;
  
  public hitArea!:Rectangle;

  private _elementParent!: HTMLElement;
  private _element!: HTMLElement;

  public get element(): HTMLElement {
    return this._element;
  }
  public get elementParent(): HTMLElement {
    return this._elementParent;
  }

  public get half(): Vector2 {
    return new Vector2 (this.hitArea.width / 2, this.hitArea.height / 2);
  }

  public get center(): Vector2 {
    return new Vector2(this.position.x + this.hitArea.x + this.half.x, this.position.y + this.hitArea.y + this.half.y);
  }

  instantiate(elementParent: HTMLElement): void {
    const div = document.createElement('div');
    div.setAttribute('id', this.id);
    div.setAttribute('name', this.name);
    if( this.background ) {
      div.style.background = this.background;
      div.style.backgroundRepeat = 'no-repeat';
    }
    div.style.width = this.size.width + 'px';
    div.style.height = this.size.height + 'px';
    div.style.top = this.position.y + 'px';
    div.style.left = this.position.x + 'px';
    this._corners = {
      topLeft: new Vector2(this.position.x - this.size.width / 2, 0),
      bottomLeft: new Vector2(this.position.x - this.size.width / 2, this.size.height),
      topRight: new Vector2(this.position.x + this.size.width / 2, 0),
      bottomRight: new Vector2(this.position.x + this.size.width / 2, this.size.height)
    }
    div.style.position = 'absolute';
    this._element = div;
    this._elementParent = elementParent;
    elementParent.appendChild(div);
  }


  public setRigidbody(size: Rectangle): void {
    const obj = new GameObject();
    obj.name = `collider_${this.id}`;
    obj.id = `collider_${this.id}`;
    obj.position = new Vector2(size.x, size.y);
    obj.size = size;
    setTimeout(() => {
      obj.instantiate(this.element);
      obj.element.style.border = '1px solid #67feef';
      obj.element.style.zIndex = '99999';
    }, 10);
    
  }

}