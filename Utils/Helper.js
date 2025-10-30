export class Helper {
    static objectToEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (let key of keys1) {
            const value1 = object1[key];
            const value2 = object2[key];
            const isObjects = this.isObject(value1) && this.isObject(value2);
            if ((isObjects && !this.objectToEqual(value1, value2)) ||
                (!isObjects && value1 !== value2)) {
                return false;
            }
        }
        return true;
    }
    static isObject(object) {
        return object != null && typeof object === 'object';
    }
    static waitForSeconds(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    }
    static UUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    static async loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve({ url: src, width: img.width, height: img.height });
            img.onerror = reject;
            img.crossOrigin = "anonymous";
            img.src = src;
        });
    }
}
//# sourceMappingURL=Helper.js.map