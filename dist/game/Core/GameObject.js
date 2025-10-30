import { EventEmitter } from "../Events/EventEmitter.js";
import { Vector2 } from "../../Utils/Vector2.js";
export class GameObject {
    constructor() {
        this.properties = {};
        this.events = new EventEmitter();
    }
    get corners() {
        return this._corners;
    }
    get element() {
        return this._element;
    }
    get elementParent() {
        return this._elementParent;
    }
    get half() {
        return new Vector2(this.hitArea.width / 2, this.hitArea.height / 2);
    }
    get center() {
        return new Vector2(this.position.x + this.hitArea.x + this.half.x, this.position.y + this.hitArea.y + this.half.y);
    }
    instantiate(elementParent) {
        const div = document.createElement('div');
        div.setAttribute('id', this.id);
        div.setAttribute('name', this.name);
        if (this.background) {
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
        };
        div.style.position = 'absolute';
        this._element = div;
        this._elementParent = elementParent;
        elementParent.appendChild(div);
    }
    setRigidbody(size) {
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
//# sourceMappingURL=GameObject.js.map