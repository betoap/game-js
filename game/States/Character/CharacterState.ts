import { Player } from "game/Character/Player.js";
import { State } from "../State.js";
import { IAnimation } from "./../../Animation/Animator.js";

export abstract class CharacterState extends State {
  public player!: Player;
  protected animationConfig!: IAnimation;
}