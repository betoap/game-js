import { GameObject } from "../Core/GameObject.js";
import { Vector2 } from "../../Utils/Vector2.js";

export enum TileType {
  Solid = 1,
  Ice = 2,
  Sand = 2,
  Water = 4,
}

export class Tile extends GameObject{

  public type!:TileType;
  public content!: any;

  //#region Pathfinding
  public previus!: Tile | undefined;
  public costFromOrigin!: number;
  public costToObjective!: number;
  public costTotal!: number;
  public movementCost!: number;
  public tilePosition!: Vector2;
  public cropImage!: Vector2;
  //#endregion

  constructor( position: Vector2 ) {
    super();
    this.position = position;
  }
  

}