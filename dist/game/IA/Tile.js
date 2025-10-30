import { GameObject } from "../Core/GameObject.js";
export var TileType;
(function (TileType) {
    TileType[TileType["Solid"] = 1] = "Solid";
    TileType[TileType["Ice"] = 2] = "Ice";
    TileType[TileType["Sand"] = 2] = "Sand";
    TileType[TileType["Water"] = 4] = "Water";
})(TileType || (TileType = {}));
export class Tile extends GameObject {
    constructor(position) {
        super();
        this.position = position;
    }
}
//# sourceMappingURL=Tile.js.map