import { MonoBehaviour } from "../Core/MonoBehaviour.js";
import { Vector2 } from '../../Utils/Vector2.js';
export class Camera extends MonoBehaviour {
    get leftEdge() {
        return this.position.x + (this.size.width * this.offset);
    }
    get rightEdge() {
        return this.position.x + (this.size.width * this.offset * 3);
    }
    get topEdge() {
        return this.position.y + (this.size.height * this.offset);
    }
    get bottomEdge() {
        return this.position.y + (this.size.height * this.offset * 3);
    }
    constructor(cameraElementParent = document.body) {
        super();
        this.cameraElementParent = cameraElementParent;
        this.offset = .25;
    }
    getCanvasCenter() {
        return new Vector2(this.cameraElementParent.clientWidth / 2 - this.size.width / 2, this.cameraElementParent.clientHeight / 2 - this.size.height / 2);
    }
}
//# sourceMappingURL=Camera.js.map