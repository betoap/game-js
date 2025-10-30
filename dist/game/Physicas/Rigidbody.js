export class Rigidbody {
    static get instance() {
        return Rigidbody._instance;
    }
    constructor() {
        this.colliders = new Array();
        Rigidbody._instance = this;
    }
    _checkCollision(obj, colliders) {
        for (const objCollider of colliders) {
            if (obj.id === objCollider.id)
                continue;
            this.checkCollision(objCollider, obj);
        }
    }
    checkCollision(obj, objCollider) {
        const catXValidator = obj.center.x - objCollider.center.x;
        const catYValidator = obj.center.y - objCollider.center.y;
        const catX = Math.abs(catXValidator);
        const catY = Math.abs(catYValidator);
        const sumHalfWidth = obj.half.x + objCollider.half.x;
        const sumHalfHeight = obj.half.y + objCollider.half.y;
        if (catX < sumHalfWidth && catY < sumHalfHeight) {
            const overlapX = sumHalfWidth - catX;
            const overlapY = sumHalfHeight - catY;
            if (overlapX >= overlapY) {
                if (catYValidator > 0) {
                    obj.position.y += overlapY;
                    obj['collision']?.apply(obj, [objCollider, 'top']);
                }
                else {
                    obj.position.y -= overlapY;
                    obj['collision']?.apply(obj, [objCollider, 'down']);
                }
            }
            else {
                if (catXValidator > 0) {
                    obj.position.x += overlapX;
                    obj['collision']?.apply(obj, [objCollider, 'left']);
                }
                else {
                    obj.position.x -= overlapX;
                    obj['collision']?.apply(obj, [objCollider, 'rigth']);
                }
            }
        }
    }
}
//# sourceMappingURL=Rigidbody.js.map