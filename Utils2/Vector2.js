export class Vector2 {
    constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
    }
    set x(x) {
        this._x = x;
    }
    get x() {
        return this._x;
    }
    set y(y) {
        this._y = y;
    }
    get y() {
        return this._y;
    }
    copy(vector2) {
        this.x = vector2.x;
        this.y = vector2.y;
        return this;
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    add(vector2) {
        return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }
    addVectors(v1, V2) {
        return new Vector2(v1.x + V2.x, v1.y + V2.y);
    }
    subtract(vector2) {
        return new Vector2(this.x - vector2.x, this.y - vector2.y);
    }
    subVectors(v1, V2) {
        return new Vector2(v1.x - V2.x, v1.y - V2.y);
    }
    multiply(vector2) {
        return new Vector2(this.x * vector2.x, this.y * vector2.y);
    }
    divide(vector2) {
        return new Vector2(this.x / vector2.x, this.y / vector2.y);
    }
    addScalar(value) {
        return new Vector2(this.x + value, this.y + value);
    }
    subtractScalar(value) {
        return new Vector2(this.x - value, this.y - value);
    }
    multiplyScalar(value) {
        return new Vector2(this.x * value, this.y * value);
    }
    divideScalar(value) {
        return this.multiplyScalar(1 / value);
    }
    min(vector2) {
        return new Vector2(Math.min(this.x, vector2.x), Math.min(this.y, vector2.y));
    }
    max(vector2) {
        return new Vector2(Math.max(this.x, vector2.x), Math.max(this.y, vector2.y));
    }
    dot(vector2) {
        return (this.x * vector2.x + this.y + vector2.y);
    }
    dotProduct(vector2) {
        return this.x * vector2.x + this.y * vector2.y;
    }
    ;
    clamp(minVector2, maxVector2) {
        return new Vector2(Math.max(minVector2.x, Math.min(maxVector2.x, this.x)), Math.max(minVector2.y, Math.min(maxVector2.y, this.y)));
    }
    clampScalar(minVal, maxVal) {
        return new Vector2(Math.max(minVal, Math.min(maxVal, this.x)), Math.max(minVal, Math.min(maxVal, this.y)));
    }
    clampLength(min, max) {
        const length = this.magnitude();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
    lengthSqr() {
        return this.magnitudeSqr();
    }
    magnitudeSqr() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return this.magnitude();
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y);
    }
    normalize() {
        return this.divideScalar(this.magnitude() || 1);
    }
    applyMatrix3(matrix) {
        const x = this.x;
        const y = this.y;
        const e = matrix.elements;
        return new Vector2(e[0] * x + e[3] * y + e[6], e[1] * x + e[4] * y + e[7]);
    }
    floor() {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }
    ceil() {
        return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
    }
    round() {
        return new Vector2(Math.round(this.x), Math.round(this.y));
    }
    roundToZero() {
        return new Vector2((this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x), (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y));
    }
    angle() {
        let angle = Math.atan2(this.y, this.x);
        if (angle < 0)
            angle += 2 * Math.PI;
        return angle;
    }
    angleBetween(vector2) {
        return Math.atan2(vector2.y - this.y, vector2.x - this.x);
    }
    ;
    distance(vector2) {
        return this.distanceTo(vector2);
    }
    distanceTo(vector2) {
        return Math.sqrt(this.distanceToSquared(vector2));
    }
    distanceToSquared(vector2) {
        const dx = this.x - vector2.x;
        const dy = this.y - vector2.y;
        return dx * dx + dy * dy;
    }
    manhattanDistanceTo(vector2) {
        return Math.abs(this.x - vector2.x) + Math.abs(this.y - vector2.y);
    }
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }
    lerp(destiny, time = .01) {
        return new Vector2((1 - time) * this.x + time * destiny.x, (1 - time) * this.y + time * destiny.y);
    }
    lerpVectors(v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    }
    equals(vector2) {
        return ((vector2.x === this.x) && (vector2.y === this.y));
    }
    fromArray(array, offset) {
        return new Vector2(array[offset], array[offset + 1]);
    }
    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    }
    fromBufferAttribute(attribute, index, offset) {
        return new Vector2(attribute.getX(index), attribute.getY(index));
    }
    rotateAround(vector2, angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const x = this.x - vector2.x;
        const y = this.y - vector2.y;
        return new Vector2(x * c - y * s + vector2.x, x * s + y * c + vector2.y);
    }
    precision(precision) {
        const vector = this.clone();
        return new Vector2(parseFloat(vector.x.toFixed(precision)), parseFloat(vector.y.toFixed(precision)));
    }
    perpendicularRight() {
        const vector = this.clone();
        return new Vector2(vector.y, -vector.x);
    }
    perpendicularLeft() {
        const vector = this.clone();
        return new Vector2(-vector.y, vector.x);
    }
    reflect(vector2) {
        var normal = vector2.normalize();
        var dot = this.dotProduct(normal);
        return this.subtract(normal.multiplyScalar(dot + dot));
    }
    perp() {
        return new Vector2(this.x, -this.y);
    }
    ;
    perpendicular(vector2) {
        return this.subtract(this.project(vector2));
    }
    ;
    project(vector2) {
        const percent = this.dot(vector2) / vector2.dot(vector2);
        return vector2.multiplyScalar(percent);
    }
    ;
    cross(vector2) {
        return this.x * vector2.y - this.y * vector2.x;
    }
    unit() {
        return this.divideScalar(this.magnitude());
    }
    ;
    toString() {
        return ("Vector2 [" + this.x + ", " + this.y + "]");
    }
    static get up() {
        return new Vector2(0, 1);
    }
    static get down() {
        return new Vector2(0, -1);
    }
    static get right() {
        return new Vector2(1, 0);
    }
    static get left() {
        return new Vector2(-1, 0);
    }
    static get zero() {
        return new Vector2(0, 0);
    }
    static get one() {
        return new Vector2(1, 1);
    }
}
//# sourceMappingURL=Vector2.js.map