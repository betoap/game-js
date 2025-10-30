"use strict";
class NDPoint {
    constructor(xOrPoint, y, z) {
        this.values = [];
        console.log(this.values);
        if (typeof xOrPoint === 'undefined' || xOrPoint === null) {
            this.values = [];
        }
        else if (xOrPoint instanceof Array) {
            this.values = xOrPoint;
        }
        else if (typeof xOrPoint === 'number') {
            if (typeof y !== 'undefined') {
                if (typeof z !== 'undefined') {
                    this.values = [xOrPoint, y, z];
                }
                else {
                    this.values = [xOrPoint, y];
                }
            }
            else {
                this.values = [xOrPoint];
            }
        }
        else {
        }
    }
    coordinates() {
        return this.values;
    }
}
new NDPoint();
new NDPoint(new NDPoint());
new NDPoint(10);
new NDPoint(10, 10);
new NDPoint(10, 10, 10);
new NDPoint(10, 10, 10);
new NDPoint([10, 10, 10]);
//# sourceMappingURL=teste.js.map