import { Camera } from './Camera.js';
import { Vector2 } from './../../Utils/Vector2.js';
import { Rectangle } from './../../Utils/Rectangle.js';
export class Cinemachine extends Camera {
    constructor(board) {
        super(document.querySelector('#game-player'));
        this.board = board;
    }
    set target(target) {
        this._target = target;
    }
    get target() {
        return this._target;
    }
    instantiate() {
        const boardWidth = this.board.map.tilewidth * this.board.map.width;
        const boardHeight = this.board.map.tileheight * this.board.map.height;
        const width = (boardWidth) ? this.sizeMax.x : boardWidth;
        const height = (boardHeight > this.sizeMax.y) ? this.sizeMax.y : boardHeight;
        this.size = new Rectangle(width, height, 0, 0);
        this._reposition = boardWidth > this.sizeMax.x || boardWidth > this.sizeMax.y;
        super.instantiate(this.cameraElementParent);
        this.element.style.overflow = 'hidden';
        this.element.style.position = 'relative';
        this.element.style.top = '0';
        this.element.style.left = '0';
    }
    update() {
        if (!this.board || !this.board.element || !this._reposition || !this.target)
            return;
        this.movement();
    }
    movement() {
        let position = new Vector2(this.position.x, this.position.y);
        if (this.target.position.x < this.leftEdge) {
            position.x = this.target.position.x - (this.size.width * this.offset);
        }
        if (this.target.position.x + this.target.size.width > this.rightEdge) {
            position.x = this.target.position.x + this.target.size.width - (this.size.width * this.offset * 3);
        }
        if (this.target.position.y < this.topEdge) {
            position.y = this.target.position.y - (this.size.height * this.offset);
        }
        if (this.target.position.y + this.target.size.height > this.bottomEdge) {
            position.y = this.target.position.y + this.target.size.height - (this.size.height * this.offset * 3);
        }
        this.position = this.position.lerp(position, .01);
        if (this.position.x <= 0) {
            this.position.x = 0;
        }
        if (this.position.x + this.size.width > this.board.size.width) {
            this.position.x = this.board.size.width - this.size.width;
        }
        if (this.position.y <= 0) {
            this.position.y = 0;
        }
        if (this.position.y + this.size.height > this.board.size.height) {
            this.position.y = this.board.size.height - this.size.height;
        }
    }
    render() {
        this.board.element.style.left = `${-this.position.x}px`;
        this.board.element.style.top = `${-this.position.y}px`;
    }
}
//# sourceMappingURL=Cinemachine.js.map