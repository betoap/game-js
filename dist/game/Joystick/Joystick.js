import { MonoBehaviour } from "../Core/MonoBehaviour.js";
export class Joystick extends MonoBehaviour {
    get horizontal() {
        return this._horizontal;
    }
    get vertical() {
        return this._vertical;
    }
    get run() {
        return this._run;
    }
    constructor() {
        super();
        this._horizontal = 0;
        this._vertical = 0;
        this._run = false;
        document.addEventListener('keydown', (event) => this.detectKeyOn(event), false);
        document.addEventListener('keyup', (event) => this.detectKeyOff(event), false);
    }
    detectKeyOn(event) {
        switch (event.code) {
            case 'Space':
                this._run = true;
                break;
            case 'Escape':
            case 'Esc':
                break;
            case 'KeyW':
            case 'ArrowUp':
                this._vertical = -1;
                break;
            case 'KeyS':
            case 'ArrowDown':
                this._vertical = 1;
                break;
            case 'KeyA':
            case 'ArrowLeft':
                this._horizontal = -1;
                break;
            case 'KeyD':
            case 'ArrowRight':
                this._horizontal = 1;
                break;
        }
    }
    detectKeyOff(event) {
        switch (event.code) {
            case 'Space':
                this._run = false;
                break;
            case 'Escape':
            case 'Esc':
                break;
            case 'KeyW':
            case 'ArrowUp':
            case 'KeyS':
            case 'ArrowDown':
                this._vertical = 0;
                break;
            case 'KeyA':
            case 'ArrowLeft':
            case 'KeyD':
            case 'ArrowRight':
                this._horizontal = 0;
                break;
        }
    }
}
//# sourceMappingURL=Joystick.js.map