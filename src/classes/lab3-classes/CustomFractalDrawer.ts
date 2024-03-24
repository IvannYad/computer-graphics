import { ComplexPoint } from "../figure-primitives/Point";

export default class CustomFractalDrawer {

    private _context: CanvasRenderingContext2D | null = null;
    private _maxIterations: number | null = null;
    private _initialPoint: ComplexPoint | null = null;
    private _bound: number | null = null;
    private _zoom = 1; 
    private _moveX = 0;
    private _moveY = 0;
    

    public SetParameters (context: CanvasRenderingContext2D,
        maxIterations: number,
        bound: number,
        initialPoint: ComplexPoint,
        zoom: number,
        moveX: number,
        moveY: number) {
        this._context = context;
        this._maxIterations = maxIterations;
        this._initialPoint = initialPoint;
        this._bound = bound;
        this._zoom = zoom;
        this._moveX = moveX;
        this._moveY = moveY;
    }

    public Draw(){
        if (!this._context || !this._maxIterations || !this._initialPoint) {
            return;
        }

        const cRe = this._initialPoint.real;
        const cIm = this._initialPoint.imag;
        //const cRe = -0.1380;
        //const cIm = 0.418;

        this.DrawFractalPart(cRe, cIm);
    }

    private DrawFractalPart(cRe: number, cIm: number){
        if (!this._context || !this._maxIterations || !this._initialPoint) {
            return;
        }

        for (let y = 0; y < this._context.canvas.height; y++) {
            setTimeout(() => {
                for (let x = 0; x < this._context!.canvas.width; x++) {
                    if (!this._context || !this._maxIterations || !this._initialPoint || !this._bound) {
                        return;
                    }
    
                    let newRe = 1.5 * (x - this._context.canvas.width / 2) / (0.5 * this._zoom * this._context.canvas.width) + this._moveX;
                    let newIm = (y - this._context.canvas.height / 2) / (0.5 * this._zoom * this._context.canvas.height) + this._moveY;
    
                    let i: number;
                    let oldRe;
                    let oldIm;
                    for (i = 0; i < this._maxIterations; i++) {
                        oldRe = newRe;
                        oldIm = newIm;
                        
                        newRe = Math.cosh(oldRe) * Math.cos(oldIm) + cRe;
                        newIm = Math.sinh(oldRe) * Math.sin(oldIm) + cIm;
    
                        if((newRe * newRe + newIm * newIm) > this._bound) break;
                        
                    }
    
                    const rgbColor = this.HSVtoRGB( i / this._maxIterations, 1, (+(i < this._maxIterations)));
                    this.drawPoint(x, y, `rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`);
                }
            }, 0)
            
        }
    }

    private drawPoint(x: number, y: number, color: string){
        if (!this._context) {
            return;
        }

        this._context.fillStyle = color;
        this._context.fillRect(x, y, 1, 1);
    }

    private HSVtoRGB(h: number, s: number, v: number) {
        let r, g, b;
    
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return {
            r: Math.round(r! * 255),
            g: Math.round(g! * 255),
            b: Math.round(b! * 255)
        };
    }

}