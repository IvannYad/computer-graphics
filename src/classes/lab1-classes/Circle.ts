class Circle{
    private _x: number;
    private _y: number;
    private _radius;
    private _color: string;

    constructor(x: number, y: number, radius: number, color: string){
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._color = color;
    }

    public updateColor(newColor: string){
        this._color = newColor;
    }

    public drawCircle(canvasContext: CanvasRenderingContext2D){
        canvasContext.fillStyle = this._color;
        canvasContext.beginPath();
        canvasContext.arc(this._x, this._y, this._radius, 0, Math.PI * 2); // Outer circle
        canvasContext.stroke();
        canvasContext.closePath();
    }
}

export default Circle;