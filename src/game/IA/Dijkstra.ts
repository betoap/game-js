import { Board } from "./Board.js";
import { Helper } from "./../../Utils/Helper.js";
import { Pathfinding } from "./Pathfinding.js";
import { Queue } from "./../../Utils/Queue.js";
import { Tile } from "./Tile.js";

export class Dijkstra extends Pathfinding<Dijkstra> {
  
  public searchLength: number = 5;

  public override ValidateMovement( from: Tile, to: Tile ):boolean {
    // return to.costFromOrigin < this.searchLength ;
    return to.content || to.costFromOrigin < this.searchLength ;
  }

  public override async Search(tileStart:Tile, searchType: (start:Tile, end:Tile, bool?: boolean) => any): Promise<Array<Tile>> {
    Pathfinding.ClearSeach();
    this.tilesSearch = new Array<Tile>();
    this.tilesSearch.push(tileStart);
    this.checkNow = new Queue<Tile>();
    this.checkNext = new Queue<Tile>();
    tileStart.costFromOrigin = 0;
    this.checkNow.enqueue(tileStart);
    while( this.checkNow.count > 0) {
      const current: Tile  = this.checkNow.dequeue() as Tile;
      current.background = "green";
      await this.SearchAdjacent(current, this.checkNext, searchType);
      if( this.checkNow.count == 0 ) {
        this.swapReference( this.checkNow, this.checkNext );
      }
    }
    return this.tilesSearch;
  }

  private async SearchAdjacent(current: Tile, checkNext:Queue<Tile> , searchType:(start:Tile, end:Tile, bool?: boolean) => any): Promise<void> {
    for( let direction of Board.directions) {
      await Helper.waitForSeconds(0);
      // const v: Vector2 = current.position;
      console.log(current.tilePosition.add(direction));
      
      let next:Tile = Board.getTile(current.tilePosition.add(direction)) as Tile;
      if( next == null || next.costFromOrigin <= current.costFromOrigin + next.movementCost ) continue;
      next.costFromOrigin = current.costFromOrigin + next.movementCost;
      if( searchType.apply(this, [current, next]) ) {
        next.previus = current;
        if( !this.tilesSearch.some( tile => Helper.objectToEqual(tile.tilePosition, (next as Tile).tilePosition) ) ) {
          checkNext.enqueue( next );
          this.tilesSearch.push(next);
          next.background = "yellow";
        }
      }
    }
  }

}