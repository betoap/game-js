export abstract class Helper {
  public static objectToEqual(object1:any, object2:any): boolean{
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      const value1 = object1[key];
      const value2 = object2[key];
      const isObjects = this.isObject(value1) && this.isObject(value2);
      if (
        (isObjects && !this.objectToEqual( value1, value2 )) ||
        (!isObjects && value1 !== value2)
      ) {
        return false;
      }
    }
    return true;
  }

  public static isObject(object: any): boolean{
    return object != null && typeof object === 'object';
  }

  public static waitForSeconds(time: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
    
  }

  public static UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }

  public static async loadImage(src): Promise<{ url: string, width: number, height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({url: src, width: img.width, height: img.height});
      img.onerror = reject;
      img.crossOrigin = "anonymous";
      img.src = src;
    });
  }
}
