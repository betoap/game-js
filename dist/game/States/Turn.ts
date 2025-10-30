import { Player } from "game/Character/Player.js";
import { Tile } from "../IA/Tile.js";

export class Turn {
  public static unit: Player;
  public static targets: Array<Tile>;
  public static hasActed: boolean;
  public static hasMoved: boolean;
}