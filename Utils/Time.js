export class Time {
    static get DeltaTime() {
        const now = Date.now();
        const deltaTime = now - this.lastUpdate;
        this.lastUpdate = now;
        return deltaTime;
    }
}
Time.lastUpdate = 0;
//# sourceMappingURL=Time.js.map