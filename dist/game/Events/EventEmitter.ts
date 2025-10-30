import { Dictionary } from "../../Utils/Dictionary.js";

export class EventEmitter {

  protected events: Dictionary<string, Array<Function>> = new Dictionary<string, Array<Function>>;

  public on (eventName: string, callback: Function) {
    const oldEvents = this.events.get(eventName) as Array<Function>;
    if (this.events.has(eventName)) {
      return this.events.set(eventName, [ ...oldEvents, callback ]);
    }
    return this.events.set(eventName, [ callback ]);
  }
  
  public emit (eventName: string, data?: any) {
    const myListeners = this.events.get(eventName);
    if (Array.isArray(myListeners) && myListeners.length) {
      myListeners.forEach(event => event(data))
    }
  }

  public remove(eventName: string, data?: any){
    this.events.delete(eventName)
  }
}


// EventEmitter.on('USUARIO_SALVO', (data: any) => console.log(`Salvando um novo usuário: ${JSON.stringify(data)}`));