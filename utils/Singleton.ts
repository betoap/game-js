type Constructor = new (...args: any[]) => {};

export class Singleton {

  private static instance: Singleton;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
  */
  private constructor() { }

  /**
   * The static method that controls access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
  */
  public static get getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
