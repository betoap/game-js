import { Vector2 } from "../../Utils/Vector2.js";
import { Rectangle } from "../../Utils/Rectangle.js";
import { Dictionary } from "../../Utils/Dictionary.js";
import { Rigidbody } from "../Physicas/Rigidbody.js";
import { Tile, TileType } from "./Tile.js";

export interface ILayer {
  alpha?: number;
  bodies?: Array<any>;
  callbacks?: Array<any>;
  data: Array<number>;
  height: number;
  name: string;
  id: number;
  opacity: number;
  properties?: any;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
  offsetx?: number;
  offsety?: number;
  objects?: Array<any>;
}

export interface ILayerset {
  columns: number;
  drawCoords: Array<number>;
  firstgid: number;
  image: string;
  name: String;
  properties: any;
  rows: number;
  tiles: Array<any>;
  tileheight: number;
  tileMargin: number;
  tileproperties: any;
  tileSpacing: number;
  tilewidth: number;
  imageheight: number;
  imagewidth: number;
  total: number;
}

export interface IWorld {
  height: number;
  infinite: boolean;
  layers: Array<ILayer>;
  nextobjectid: number;
  orientation: string;
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: Array<ILayerset>;
  tilewidth: number;
  type: string;
  version: number;
  width: number;
}

export class World implements IWorld {
  public height: number;
  public infinite: boolean;
  public layers: Array<ILayer>;
  public nextobjectid: number;
  public orientation: string;
  public renderorder: string;
  public tiledversion: string;
  public tileheight: number;
  public tilesets: Array<ILayerset>;
  public tilewidth: number;
  public type: string;
  public version: number;
  public width: number;

  public tiles: Dictionary<Vector2, Tile> = new Dictionary<Vector2, Tile>();

  constructor( data: any ) {
    this.height = data.height;
    this.infinite = data.infinite;
    this.layers = data.layers;
    this.nextobjectid = data.nextobjectid;
    this.orientation = data.orientation;
    this.renderorder = data.renderorder;
    this.tiledversion = data.tiledversion;
    this.tileheight = data.tileheight;
    this.tilesets = data.tilesets;
    this.tilewidth = data.tilewidth;
    this.type = data.type;
    this.version = data.version;
    this.width = data.width;
    this.loadLayers();
  }

  loadLayers(): void {
    this.layers.forEach( (layer, index) => {
      layer.id = index;
      if(layer.visible === false) return;
      this.loadTiles(layer);
    });
  }

  loadTiles( layer: ILayer ): void {
    for(let column = 0; column < this.height; ++column) {
      for(let row = 0; row < this.width; ++row) {
        const id = this.width * column + row;
        const position = new Vector2(row, column);
        this.createTile(id, layer, position);
      }
    }
  }

  createTile(id: number, layer: ILayer, tilePosition: Vector2): void {
    if( layer.data[id] <= 0 ) return;
    const tileset = this.getTilesets(layer.data[id]) as ILayerset;
    if( tileset === undefined ) return;
    const position = new Vector2(tilePosition.x * tileset.tilewidth, tilePosition.y * tileset.tileheight);
    const tile: Tile = new Tile( position );
    const tiledmapIndex = layer.data[id] - tileset.firstgid;
    const name: string = `pos${position.x}x${position.y}_tile${tilePosition.x}x${tilePosition.y}_type${TileType.Solid}_id${tiledmapIndex}`;
    tile.reference = { tilemap: layer.data, indice: id, value: tiledmapIndex};
    tile.id = name;
    tile.name = name;
    tile.type = TileType.Solid;
    tile.tilePosition = tilePosition;
    tile.background = `url("./assets/images/${tileset.image.replace('../../', '')}")`;
    tile.movementCost = 1;
    tile.size = new Rectangle(tileset.tilewidth, tileset.tileheight);
    tile.zIndex = this.orderLayers(layer.name, tilePosition);
    this.configureTile(tile, tileset);
    this.tiles.set( tilePosition, tile );
    const positionX = Math.floor( tiledmapIndex % tileset.columns );
    let left = positionX * tileset.tilewidth;
    let top = Math.floor( tiledmapIndex / tileset.imagewidth * tileset.tileheight ) * tileset.tileheight;
    tile.cropImage = new Vector2( left, top );
  }

  configureTile(tile: Tile, tileset: ILayerset): void {
    tile.properties = {};
    tile.hitArea = tile.size;
    const tileConfig = tileset.tiles?.find(( currentTile ) => currentTile.id === tile.reference.value );
    if( !tileConfig ) return;
    
    if( tileConfig.properties ) {
      tileConfig.properties.forEach( ( property ) => {
        tile.properties[property.name] = property.value;
      });
    }

    if( tile.properties.solid ) {
      const data = tileConfig.objectgroup?.objects[0] || tile.hitArea;
      tile.hitArea = new Rectangle(
        Math.round( data.width ),
        Math.round( data.height ),
        Math.round( data.x ),
        Math.round( data.y )
        );
      tile.rigidbody = Rigidbody.instance;
      tile.zIndex = 0;
      tile.content = {};
      tile.setRigidbody(tile.hitArea);
      Rigidbody.instance.colliders.push(tile);
    }
  }

  getTilesets( id: number ) {
    if ( id <= 0 ) return;
    let i = this.tilesets.length - 1;
    for (i; i >= 0; i--) {
      if ( this.tilesets[i].firstgid <= id ) break;
    }
    return this.tilesets[i];
  }

  private orderLayers(layer: string, tilePosition: Vector2): number {
    switch (layer) {
      case 'Above':
        return 999;
      case 'Grounded':
        return 0;
      default:
        return tilePosition.y;
    }
  }
}