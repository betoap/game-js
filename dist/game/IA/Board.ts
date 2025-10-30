import { Dictionary } from "../../Utils/Dictionary.js";
import { GameObject } from "../Core/GameObject.js";
import { Rectangle } from "../../Utils/Rectangle.js";
import { Tile, TileType } from "./Tile.js";
import { Vector2 } from "../../Utils/Vector2.js";
import { Rigidbody } from "./../Physicas/Rigidbody.js";
import { World } from "./World.js";

export class Board extends GameObject {

  private _quantityTiles: Vector2 = new Vector2(8, 8);
  private _tileSize: Vector2 = new Vector2(100, 100);
  private _gap: Vector2 = Vector2.zero;
  private _world: any;
  private static _instance: Board;

  public tiles: Dictionary<Vector2, Tile> = new Dictionary<Vector2, Tile>();
  
  public tiledmap: { image: { url: string, width: number, height: number }, map: Array<number>, tilesets: Array<any> } = { image: { url: '', width: 0, height: 0 }, map: [], tilesets: [] };
  public static directions:Array<Vector2> = new Array<Vector2>(
    Vector2.up,
    Vector2.right,
    Vector2.down,
    Vector2.left
  );

  public static get instance(): Board {
    return Board._instance;
  }

  public get quantityTiles(): Vector2 {
    return this._quantityTiles;
  }
  public get tileSize(): Vector2 {
    return this._tileSize;
  }
  
  public get gap(): Vector2 {
    return this._gap;
  }
  public set gap( value: Vector2 ) {
    this._gap = value;
  }

  public get map(): any {
    return this._world
  }

  constructor(world: World) {
    super();
    this._world = world;
    Board._instance = this;
  }

  public async initialize( element: HTMLElement, quantityTiles: Vector2, tileSize: Vector2): Promise<void> {
    this._tileSize = tileSize;
    this._quantityTiles = quantityTiles;
    this.size = new Rectangle(quantityTiles.x * tileSize.x, quantityTiles.y * tileSize.y);
    this.instantiate(element);
    this.renderTiles();
  }

  renderTiles(): void {
    for ( const [vector, tile] of this._world.tiles.entries() ) {
      tile.instantiate(this.element);
      tile.element.style.zIndex = `${tile.zIndex}`;
      tile.element.style.backgroundPosition = `${-tile.cropImage.x}px ${-tile.cropImage.y}px`;
    }
  }

  public static getTile( position: Vector2 ): Tile | undefined {
    return this._instance._world.tiles.get( position );
  }

  public static getPositionToTile( position: Vector2 ) {
    const _position = new Vector2(
      Math.ceil(position.x / this.instance._tileSize.x),
      Math.ceil(position.y / this.instance._tileSize.y)
    );
    return Board.getTile(_position) as Tile;
  }

  public static getTileToPosition( tile: Tile ): Vector2 {
    const _position = new Vector2(tile.position.x * this.instance._tileSize.x, tile.position.y * this.instance._tileSize.y);
    return _position;
  }

}