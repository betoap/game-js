export class Queue<T> {

    private _queue:Array<T>;

    constructor( ...items: Array<T> ){
        this._queue = new Array<T>();
        if( items.length > 0 ) {
            this.enqueue( ...items );
        }
    }

    enqueue( ...items: Array<T> ) {
        items.forEach( ( item ) => {
            this._queue.push( item )
        });
    }
    
    dequeue( count: number = 1 ): T | undefined{
        if( this.count > 0 ) {
            return this._queue.splice( 0, count )[0];
        }
        return undefined;
    }

    get count(): number{
        return this._queue.length;
    }

    isEmpty() { 
        return this._queue.length == 0; 
    } 

    get items(): Array<T> {
        return this._queue;
    }

}
