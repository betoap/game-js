export abstract class State {
  
  public name!: string;

  public enter(): void { }
  public exit(): void { }
  public update(): void { }
  public render(): void { }
  public fixedUpdate(): void { }
}