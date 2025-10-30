import { Helper } from "./Helper.js";

export class Dictionary<TKey, TValue> extends Map<TKey, TValue> {

  constructor(entries?: ReadonlyArray<[TKey, TValue]> | null) {
    super(entries);
  }

  override get (_value: TKey): TValue | undefined{
    for ( const item of this ) {
      if( Helper.objectToEqual(item[0], _value) ) {
        return item[1];
      }
    }
    return;
  }

  getForValue( _value: TValue ): TKey | undefined {
    for ( const item of this ) {
      if( item[1] === _value ) {
        return item[0];
      }
    }
    return;
  }
}