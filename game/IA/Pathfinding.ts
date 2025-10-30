import { Board } from "./Board.js";
import { Queue } from "../../Utils/Queue.js";
import { Tile } from "./Tile.js";
import { Turn } from "../States/Turn.js";
import { Vector2 } from "../../Utils/Vector2.js";

export abstract class Pathfinding<T> {

  protected checkNow: Queue<Tile> = new Queue<Tile>();
  protected checkNext: Queue<Tile> = new Queue<Tile>();

  public initialPosition!: Vector2;
  public tilesSearch: Array<Tile> = new Array<Tile>();
  public abstract Search(tileStart:Tile, searchType: (start:Tile, end:Tile, bool?: boolean) => any): Promise<Array<Tile>>;

  public ValidateMovement( from: Tile, to: Tile ):boolean {
    return !(to.content != null );
  }

  public static ClearSeach(): void {
    Board.instance.tiles.forEach( (tile: Tile) => {
      if( !tile.content ) {
        tile.background = 'rgb(32, 66, 96, .9)';
        tile.costFromOrigin = Number.MAX_VALUE;
        tile.costToObjective = Number.MAX_VALUE;
        tile.costTotal = Number.MAX_VALUE;
        tile.previus = undefined;
      }
    });
  }

  public BuildPath( lastTile: Tile ): Array<Tile> {
    const path: Array<Tile> = new Array<Tile>();
    let tile: Tile = lastTile;
    while ( tile.previus && tile != Turn.unit.tile) {
      path.push(tile);
      tile = tile.previus;
    }
    path.push(tile);
    path.reverse();
    return path;
  }

  public SelectTiles(tiles:Array<Tile>, color: any):void {
    this.DeSelectTiles(tiles, color);
    tiles.forEach( tile => {
      tile.background = color;
    })
  }

  public DeSelectTiles(tiles: Array<Tile> , color: any):void {
    tiles.forEach( tile => {
      tile.background = color;
    })
  }

  protected swapReference( checkNow:Queue<Tile>, checkNext:Queue<Tile> ): void {
    const temp: Queue<Tile> = checkNow;
    this.checkNow = this.checkNext;
    this.checkNext = temp;
  }

}