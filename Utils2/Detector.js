export class Detector {
    canvas() {
        return !!window.CanvasRenderingContext2D;
    }
    webgl() {
        try {
            const context = document.createElement('canvas').getContext('experimental-webgl') || document.createElement('canvas').getContext('webgl');
            const support = context.getSupportedExtensions();
            return !!window.WebGLRenderingContext &&
                !!context &&
                !!this.canvas() &&
                !!support;
        }
        catch (e) {
            return false;
        }
    }
    auto() {
    }
}
//# sourceMappingURL=Detector.js.map