import { Rectangle } from '../../../Utils/Rectangle.js';
import { Vector2 } from '../../../Utils/Vector2.js';
import { Cinemachine } from '../../Camera/Cinemachine.js';
import { Player } from '../../Character/Player.js';
import { Board } from '../../IA/Board.js';
import { State } from '../State.js';
// import dataMap from '../../../assets/json/fase3.json' assert { type: "json" };
import { World } from '../../IA/World.js';
import { Rigidbody } from './../../Physicas/Rigidbody.js';

export class GameState extends State {
  private camera!: Cinemachine;
  private board!: Board;
  private player!: Player;
  private world!: World;
  private dataMap: any;

  public override async enter(): Promise<void> {
    this.dataMap = await fetch('../../../assets/json/fase3.json');
    this.dataMap = await this.dataMap.json();

    // create objects
    new Rigidbody();
    this.world = new World(this.dataMap);

    // return;
    this.board = new Board(this.world);
    this.player = new Player();
    this.camera = new Cinemachine(this.board);

    // configure objects
    this.configureCamera();
    this.configureBoard();
    this.configurePlayer();
  }

  configureCamera() {
    this.camera.id = 'camera';
    this.camera.name = 'camera';
    this.camera.background = 'rgba(0, 0, 0, .4)';
    this.camera.sizeMax = new Vector2(800, 600);
    this.camera.position = new Vector2(0, 0);
    this.camera.instantiate();
  }

  configureBoard() {
    this.board.name = 'game-player';
    this.board.id = 'game-player';
    this.board.position = new Vector2(0, 0);
    this.board.initialize(
      this.camera.element,
      new Vector2(this.dataMap.width, this.dataMap.height),
      new Vector2(
        this.dataMap.tilesets[0].tilewidth,
        this.dataMap.tilesets[0].tileheight
      )
    );
  }

  configurePlayer() {
    this.player.id = 'player';
    this.player.name = 'player';
    this.player.background = 'url(./../assets/images/idle.png) no-repeat';
    this.player.position = new Vector2(300, 300);
    this.player.size = new Rectangle(128, 128);
    this.player.speed = 0.4;
    this.player.speedRun = 0.6;
    this.player.instantiate(this.board.element);
    this.player.rigidbody = Rigidbody.instance;
    this.player.hitArea = new Rectangle(30, 20, 80, 102);
    this.player.element.style.zIndex = '1';
    this.player.element.style.backgroundSize = 'cover';
    this.camera.target = this.player;
    this.player.start();
  }

  public override exit(): void {
    this.board.element.remove();
    console.log('exit GAME');
  }
}
