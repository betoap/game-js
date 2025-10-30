import { Dictionary } from "../../Utils/Dictionary.js";
import { GameObject } from "../Core/GameObject.js";
import { Rectangle } from "../../Utils/Rectangle.js";
import { Vector2 } from "../../Utils/Vector2.js";
export class Board extends GameObject {
    static get instance() {
        return Board._instance;
    }
    get quantityTiles() {
        return this._quantityTiles;
    }
    get tileSize() {
        return this._tileSize;
    }
    get gap() {
        return this._gap;
    }
    set gap(value) {
        this._gap = value;
    }
    get map() {
        return this._world;
    }
    constructor(world) {
        super();
        this._quantityTiles = new Vector2(8, 8);
        this._tileSize = new Vector2(100, 100);
        this._gap = Vector2.zero;
        this.tiles = new Dictionary();
        this.tiledmap = { image: { url: '', width: 0, height: 0 }, map: [], tilesets: [] };
        this._world = world;
        Board._instance = this;
    }
    async initialize(element, quantityTiles, tileSize) {
        this._tileSize = tileSize;
        this._quantityTiles = quantityTiles;
        this.size = new Rectangle(quantityTiles.x * tileSize.x, quantityTiles.y * tileSize.y);
        this.instantiate(element);
        this.renderTiles();
    }
    renderTiles() {
        for (const [vector, tile] of this._world.tiles.entries()) {
            tile.instantiate(this.element);
            tile.element.style.zIndex = `${tile.zIndex}`;
            tile.element.style.backgroundPosition = `${-tile.cropImage.x}px ${-tile.cropImage.y}px`;
        }
    }
    static getTile(position) {
        return this._instance._world.tiles.get(position);
    }
    static getPositionToTile(position) {
        const _position = new Vector2(Math.ceil(position.x / this.instance._tileSize.x), Math.ceil(position.y / this.instance._tileSize.y));
        return Board.getTile(_position);
    }
    static getTileToPosition(tile) {
        const _position = new Vector2(tile.position.x * this.instance._tileSize.x, tile.position.y * this.instance._tileSize.y);
        return _position;
    }
}
Board.directions = new Array(Vector2.up, Vector2.right, Vector2.down, Vector2.left);
//# sourceMappingURL=Board.js.map