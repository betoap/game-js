import { Board } from "./Board.js";
import { Helper } from "./../../Utils/Helper.js";
import { Pathfinding } from "./Pathfinding.js";
import { Queue } from "./../../Utils/Queue.js";
export class Dijkstra extends Pathfinding {
    constructor() {
        super(...arguments);
        this.searchLength = 5;
    }
    ValidateMovement(from, to) {
        return to.content || to.costFromOrigin < this.searchLength;
    }
    async Search(tileStart, searchType) {
        Pathfinding.ClearSeach();
        this.tilesSearch = new Array();
        this.tilesSearch.push(tileStart);
        this.checkNow = new Queue();
        this.checkNext = new Queue();
        tileStart.costFromOrigin = 0;
        this.checkNow.enqueue(tileStart);
        while (this.checkNow.count > 0) {
            const current = this.checkNow.dequeue();
            current.background = "green";
            await this.SearchAdjacent(current, this.checkNext, searchType);
            if (this.checkNow.count == 0) {
                this.swapReference(this.checkNow, this.checkNext);
            }
        }
        return this.tilesSearch;
    }
    async SearchAdjacent(current, checkNext, searchType) {
        for (let direction of Board.directions) {
            await Helper.waitForSeconds(0);
            console.log(current.tilePosition.add(direction));
            let next = Board.getTile(current.tilePosition.add(direction));
            if (next == null || next.costFromOrigin <= current.costFromOrigin + next.movementCost)
                continue;
            next.costFromOrigin = current.costFromOrigin + next.movementCost;
            if (searchType.apply(this, [current, next])) {
                next.previus = current;
                if (!this.tilesSearch.some(tile => Helper.objectToEqual(tile.tilePosition, next.tilePosition))) {
                    checkNext.enqueue(next);
                    this.tilesSearch.push(next);
                    next.background = "yellow";
                }
            }
        }
    }
}
//# sourceMappingURL=Dijkstra.js.map