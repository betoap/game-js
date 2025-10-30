import { Rectangle } from "./../../Utils/Rectangle.js";
import { GameObject } from "./../Core/GameObject.js";

export class Rigidbody {

  
  public colliders: Array<GameObject> = new Array<GameObject>();
  public area!:Rectangle;
  
  private static _instance: Rigidbody;
  public static get instance(): Rigidbody {
    return Rigidbody._instance;
  }
  
  constructor() {
    Rigidbody._instance = this;
  }

  public _checkCollision( obj: GameObject, colliders: Array<GameObject> ) {
    for (const objCollider of colliders) {
      if(obj.id === objCollider.id) continue;
      this.checkCollision( objCollider, obj );
    }
  }

  public checkCollision( obj: GameObject, objCollider: GameObject ) {
    //obj -> bloqueado
    //r2 -> parede
    //catetos; armazenam a distância entre os retângulos
    const catXValidator = obj.center.x - objCollider.center.x;
    const catYValidator = obj.center.y - objCollider.center.y;
    const catX = Math.abs(catXValidator);
    const catY = Math.abs(catYValidator);

    //soma das metades
    const sumHalfWidth  = obj.half.x + objCollider.half.x;
    const sumHalfHeight = obj.half.y + objCollider.half.y;
    
    if(catX < sumHalfWidth && catY < sumHalfHeight) {
      
      const overlapX = sumHalfWidth - catX;
      const overlapY = sumHalfHeight - catY;
      
      if(overlapX >= overlapY){ //colisão por cima ou por baixo
        if(catYValidator > 0){ //por cima
          obj.position.y += overlapY;
          obj['collision']?.apply(obj, [objCollider, 'top']);
        } else {
          obj.position.y -= overlapY;
          obj['collision']?.apply(obj, [objCollider, 'down']);
        }
      } else { //colisão pela esquerda ou direita
        if(catXValidator > 0) {//colisão pela esquerda
          obj.position.x += overlapX;
          obj['collision']?.apply(obj, [objCollider, 'left']);
        } else {
          obj.position.x -= overlapX;
          obj['collision']?.apply(obj, [objCollider, 'rigth']);
        }
      }
    }
  }
}