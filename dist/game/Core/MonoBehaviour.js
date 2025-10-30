import { Dictionary } from "../../Utils/Dictionary.js";
import { EventEmitter } from "../Events/EventEmitter.js";
import { GameObject } from "./GameObject.js";
import { Helper } from "../../Utils/Helper.js";
import { Rigidbody } from "./../Physicas/Rigidbody.js";
class GameEvents {
    constructor() {
        this.events = new Dictionary;
    }
    static get instance() {
        if (!GameEvents._instance) {
            GameEvents._instance = new GameEvents();
        }
        return GameEvents._instance;
    }
}
export class MonoBehaviour extends GameObject {
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
    _start() {
    }
    _disable() {
    }
    _enable() {
    }
    _destroy() {
        GameEvents.instance.events.forEach(obj => obj['destroy']?.apply(obj));
    }
    _update() {
        if (this.stop)
            return;
        this.now = Date.now();
        this.elapsed = this.now - this.lastTime;
        if (this.elapsed > this.fpsInterval) {
            this.lastTime = this.now - (this.elapsed % this.fpsInterval);
            GameEvents.instance.events.forEach(obj => obj['update']?.apply(obj));
            this._collision();
            this._render();
        }
        requestAnimationFrame(() => this._update());
    }
    _fixUpdate() {
        this.interval = setInterval(() => {
            if (this.stop)
                return;
            GameEvents.instance.events.forEach(obj => obj['fixUpdate']?.apply(obj));
            this._lateUpdate();
        }, this.fpsInterval);
    }
    _lateUpdate() {
        if (this.stop)
            return;
        GameEvents.instance.events.forEach(obj => obj['lateUpdate']?.apply(obj));
    }
    _render() {
        if (this.stop)
            return;
        GameEvents.instance.events.forEach(obj => obj['render']?.apply(obj));
    }
    registerEvents() {
        this.registerEvent('started');
        this.registerEvent('update');
        this.registerEvent('render');
        this.registerEvent('fixUpdate');
        this.registerEvent('lateUpdate');
        this.registerEvent('destroy');
        this.registerEvent('collision');
    }
    registerEvent(method) {
        if (typeof this[method] === 'function') {
            GameEvents.instance.events.set(`${this.uuid}-${method}`, this);
        }
    }
    _collision() {
        Rigidbody.instance.colliders.forEach(obj => obj.rigidbody._checkCollision(obj, Rigidbody.instance.colliders));
    }
}
//# sourceMappingURL=MonoBehaviour.js.map