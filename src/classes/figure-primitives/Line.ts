class Line{
    private _startX: number;
    private _startY: number;
    private _endX: number;
    private _endY: number;
    private _color: string;
    
    constructor(startX: number, startY: number, endX: number, endY: number, color: string){
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;
        this._color = color;
    }

    public updateColor(newColor: string){
        this._color = newColor;
    }

    public drawLine(canvasContext: CanvasRenderingContext2D){
        canvasContext.strokeStyle = this._color;
        canvasContext.beginPath();
        canvasContext.moveTo(this._startX, this._startY);
        canvasContext.lineTo(this._endX, this._endY);
        canvasContext.stroke();
        canvasContext.closePath();
    }
}

export default Line;