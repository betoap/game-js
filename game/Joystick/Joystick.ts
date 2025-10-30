import { MonoBehaviour } from "../Core/MonoBehaviour.js";

export class Joystick extends MonoBehaviour {
  
  private _horizontal: number = 0;
  public get horizontal(): number {
    return this._horizontal;
  }

  private _vertical: number = 0;
  public get vertical(): number {
    return this._vertical;
  }

  private _run: boolean = false;
  public get run(): boolean {
    return this._run;
  }

  constructor() {
    super();
    document.addEventListener('keydown', (event) => this.detectKeyOn(event), false);
    document.addEventListener('keyup', (event) => this.detectKeyOff(event), false);
  }

  private detectKeyOn(event: KeyboardEvent) {
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

  private detectKeyOff(event: KeyboardEvent) {
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