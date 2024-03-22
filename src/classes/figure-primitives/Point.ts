export type PointType = {
    x: number;
    y: number;
}

class Point{
    private _x: number;
    private _y: number;
    private _color: string;
    
    constructor(x: number, y: number, color: string){
        this._x = x;
        this._y = y;
        this._color = color;
    }

    public drawPoint(canvasContext: CanvasRenderingContext2D){
        canvasContext.fillStyle = this._color;
        canvasContext.beginPath();
        canvasContext.arc(this._x, this._y, 2, 0, Math.PI * 2); // Outer circle
        canvasContext.fill();
        canvasContext.closePath();
    }
}

export default Point;

