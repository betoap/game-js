export class Vector2 {
    private _x: number;
    private _y: number;

    constructor( _x: number = 0, _y: number = 0) {
        this._x = _x;
        this._y = _y;
    }

    public set x(x: number) {
        this._x = x;
    }

    public get x(): number{
        return this._x;
    }


    public set y(y: number) {
        this._y = y;
    }

    public get y(): number{
        return this._y;
    }

    public copy ( vector2: Vector2 ): Vector2 {
        this.x = vector2.x;
        this.y = vector2.y;
        return this;
    }

    public clone (): Vector2 {
        return new Vector2(this.x, this.y)
    }

    /** Operations */
    public add( vector2: Vector2 ) {
        return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }
    public addVectors ( v1: Vector2, V2: Vector2 ): Vector2 {
        return new Vector2(v1.x + V2.x, v1.y + V2.y);
    }

    public subtract( vector2: Vector2 ): Vector2 {
        return new Vector2(this.x - vector2.x, this.y - vector2.y);
    }
    public subVectors ( v1: Vector2, V2: Vector2 ): Vector2 {
        return new Vector2(v1.x - V2.x, v1.y - V2.y);
    }

    public multiply ( vector2: Vector2 ): Vector2 {
        return new Vector2(this.x * vector2.x, this.y * vector2.y);
    }

    public divide ( vector2: Vector2 ): Vector2 {
        return new Vector2(this.x / vector2.x, this.y / vector2.y);
    }

    /** Scalar */
    public addScalar( value: number ): Vector2 {
        return new Vector2(this.x + value, this.y + value);
    }

    public subtractScalar( value: number ): Vector2 {
        return new Vector2(this.x - value, this.y - value);
    }

    public multiplyScalar( value: number ): Vector2 {
        return new Vector2(this.x * value, this.y * value);
    }

    public divideScalar( value: number ): Vector2 {
        return this.multiplyScalar( 1 / value );
    }


    public min ( vector2: Vector2 ): Vector2 {
        return new Vector2( Math.min( this.x, vector2.x ), Math.min( this.y, vector2.y ) );
    }

    public max ( vector2: Vector2 ): Vector2 {
        return new Vector2( Math.max( this.x, vector2.x ), Math.max( this.y, vector2.y ) );
    }
    
    public dot ( vector2: Vector2): number {
        return (this.x * vector2.x + this.y + vector2.y);
    }

    public dotProduct ( vector2: Vector2): number {
        return this.x * vector2.x + this.y * vector2.y;
    };
    
    /** Climp */
    public clamp ( minVector2: Vector2, maxVector2:Vector2 ): Vector2 {
        return new Vector2( 
            Math.max( minVector2.x, Math.min( maxVector2.x, this.x ) ), 
            Math.max( minVector2.y, Math.min( maxVector2.y, this.y ) )
        );
    }

    public clampScalar ( minVal: number, maxVal: number ): Vector2 {
        return new Vector2(
            Math.max( minVal, Math.min( maxVal, this.x ) ),
            Math.max( minVal, Math.min( maxVal, this.y ) )
        );
    }

    public clampLength ( min: number, max: number ): Vector2 {
        const length = this.magnitude();
        return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );
    }
    

    /** Length = Magnitude */
    public lengthSqr (): number {
        return this.magnitudeSqr();
    }
    public magnitudeSqr (): number {
        return this.x * this.x + this.y * this.y;
    }

    public length (): number {
        return this.magnitude();
    }
    public magnitude (): number {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }
    
    public manhattanLength (): number {
        return Math.abs( this.x ) + Math.abs( this.y );
    }

    public normalize () {
        return this.divideScalar( this.magnitude() || 1 );
    }
    
    public applyMatrix3 ( matrix: any ): Vector2 {
        const x = this.x;
        const y = this.y;
        const e = matrix.elements;
        return new Vector2(
            e[ 0 ] * x + e[ 3 ] * y + e[ 6 ],
            e[ 1 ] * x + e[ 4 ] * y + e[ 7 ]
        );
    }

    /** Asserts */
    public floor () {
        return new Vector2( Math.floor( this.x ), Math.floor( this.y ) );
    }

    public ceil () {
        return new Vector2(  Math.ceil( this.x ), Math.ceil( this.y ) );
    }

    public round () {
        return new Vector2( Math.round( this.x ), Math.round( this.y ) );
    }
    
    public roundToZero () {
        return new Vector2( 
            ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x ),
            ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y )
        );
    }

    public angle () {
        let angle = Math.atan2( this.y, this.x );
        if ( angle < 0 ) angle += 2 * Math.PI;
        return angle;
    }

    public angleBetween ( vector2: Vector2 ): number {
        return Math.atan2(
            vector2.y - this.y,
            vector2.x - this.x
        );
    };
    
    public distance ( vector2: Vector2 ): number {
        return this.distanceTo( vector2 );
    }

    public distanceTo ( vector2: Vector2 ): number {
        return Math.sqrt( this.distanceToSquared( vector2 ) );
    }
    
    public distanceToSquared ( vector2: Vector2 ): number {
        const dx = this.x - vector2.x;
        const dy = this.y - vector2.y;
        return dx * dx + dy * dy;
    }
    
    public manhattanDistanceTo ( vector2: Vector2 ): number {
        return Math.abs( this.x - vector2.x ) + Math.abs( this.y - vector2.y );
    }
    
    public setLength ( length: number ) {
        return this.normalize().multiplyScalar( length );
    }
    
    public lerp ( destiny: Vector2, time: number = .01 ): Vector2 {
        return new Vector2( 
            ( 1 - time ) * this.x + time * destiny.x,
            ( 1 - time ) * this.y + time * destiny.y
        );
    }
    
    public lerpVectors ( v1: Vector2, v2: Vector2, alpha: number ) {
        return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );
    }
    
    public equals ( vector2: Vector2 ) {
        return ( ( vector2.x === this.x ) && ( vector2.y === this.y ) );
    }
    
    public fromArray ( array: Array<number>, offset: number ): Vector2 {
        return new Vector2( array[ offset ], array[ offset + 1 ] );
    }
    
    public toArray ( array: Array<number> = [], offset = 0 ): Array<number> {
        array[ offset ] = this.x;
        array[ offset + 1 ] = this.y;
        return array;
    }
    
    public fromBufferAttribute ( attribute: any, index: any, offset?: number ) {
        return new Vector2( attribute.getX( index ), attribute.getY( index ) );
    }
    
    public rotateAround ( vector2: Vector2, angle: number ): Vector2 {
        const c = Math.cos( angle );
        const s = Math.sin( angle );
        const x = this.x - vector2.x;
        const y = this.y - vector2.y;
        return new Vector2( x * c - y * s + vector2.x, x * s + y * c + vector2.y);
    }

    public precision ( precision: number ): Vector2 {
        const vector = this.clone();
        return new Vector2( 
            parseFloat(vector.x.toFixed(precision)),
            parseFloat(vector.y.toFixed(precision))
        );
    }
    
    public perpendicularRight(): Vector2 {
        const vector = this.clone();
        return new Vector2( vector.y, -vector.x );
    }
    
    public perpendicularLeft(): Vector2 {
        const vector = this.clone();
        return new Vector2( -vector.y, vector.x);
    }

    public reflect( vector2: Vector2 ): Vector2 {
        var normal = vector2.normalize(); // reflect through this normal
        var dot = this.dotProduct(normal);
        return this.subtract( normal.multiplyScalar(dot + dot) );
    }

    /***** perp *****/
    public perp (): Vector2 {
        return new Vector2( this.x, -this.y );
    };
    
    /***** perpendicular *****/
    public perpendicular ( vector2: Vector2 ): Vector2 {
        return this.subtract( this.project( vector2 ) );
    };
    
    /***** project *****/
    public project ( vector2: Vector2 ): Vector2 {
        const percent: number = this.dot( vector2 ) / vector2.dot( vector2 );
        return vector2.multiplyScalar( percent );
    };
    
    /***** Cross *****/
    public cross (vector2: Vector2): number {
        return this.x * vector2.y - this.y * vector2.x;
    }

    public unit (): Vector2 {
        return this.divideScalar( this.magnitude() );
    };

    public toString () {
        return ("Vector2 [" + this.x + ", " + this.y + "]");
    }
    
    public static get up(): Vector2 {
        return new Vector2(0, 1);
    }
    
    public static get down(): Vector2 {
        return new Vector2(0, -1);
    }
    
    public static get right(): Vector2 {
        return new Vector2(1, 0);
    }
    
    public static get left(): Vector2 {
        return new Vector2(-1, 0);
    }
    
    public static get zero(): Vector2 {
        return new Vector2(0, 0);
    }
    
    public static get one(): Vector2 {
        return new Vector2(1, 1);
    }

}
