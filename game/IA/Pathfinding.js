import { Board } from "./Board.js";
import { Queue } from "../../Utils/Queue.js";
import { Turn } from "../States/Turn.js";
export class Pathfinding {
    constructor() {
        this.checkNow = new Queue();
        this.checkNext = new Queue();
        this.tilesSearch = new Array();
    }
    ValidateMovement(from, to) {
        return !(to.content != null);
    }
    static ClearSeach() {
        Board.instance.tiles.forEach((tile) => {
            if (!tile.content) {
                tile.background = 'rgb(32, 66, 96, .9)';
                tile.costFromOrigin = Number.MAX_VALUE;
                tile.costToObjective = Number.MAX_VALUE;
                tile.costTotal = Number.MAX_VALUE;
                tile.previus = undefined;
            }
        });
    }
    BuildPath(lastTile) {
        const path = new Array();
        let tile = lastTile;
        while (tile.previus && tile != Turn.unit.tile) {
            path.push(tile);
            tile = tile.previus;
        }
        path.push(tile);
        path.reverse();
        return path;
    }
    SelectTiles(tiles, color) {
        this.DeSelectTiles(tiles, color);
        tiles.forEach(tile => {
            tile.background = color;
        });
    }
    DeSelectTiles(tiles, color) {
        tiles.forEach(tile => {
            tile.background = color;
        });
    }
    swapReference(checkNow, checkNext) {
        const temp = checkNow;
        this.checkNow = this.checkNext;
        this.checkNext = temp;
    }
}
//# sourceMappingURL=Pathfinding.js.map