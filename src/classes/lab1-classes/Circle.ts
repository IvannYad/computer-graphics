class Circle{
    private _x: number;
    private _y: number;
    private _radius;
    private _color: string;
    private _canvasCtx: CanvasRenderingContext2D;

    constructor(canvasContext: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string){
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._color = color;
        this._canvasCtx = canvasContext;
        this.drawCircle();
    }

    public updateColor(newColor: string){
        this._color = newColor;
        this.clearCircle();
        this.drawCircle();
    }

    private drawCircle(){
        this._canvasCtx.fillStyle = this._color;
        this._canvasCtx.beginPath();
        this._canvasCtx.arc(this._x, this._y, this._radius, 0, Math.PI * 2); // Outer circle
        this._canvasCtx.stroke();
        this._canvasCtx.closePath();
    }

    public clearCircle(){
        // Clear circle.
        this._canvasCtx.save();
        this._canvasCtx.globalCompositeOperation = 'destination-out';
        this._canvasCtx.beginPath();
        this._canvasCtx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
        this._canvasCtx.fill();
        this._canvasCtx.restore();
    }
}

export default Circle;