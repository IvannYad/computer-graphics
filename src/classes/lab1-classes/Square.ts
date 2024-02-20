class Square{
    private _topLeft_X: number;
    private _topLeft_Y: number;
    private _side: number;
    private _color: string;
    
    constructor(topLeft_X: number, topLeft_Y: number, side: number, color: string){
        this._topLeft_X = topLeft_X;
        this._topLeft_Y = topLeft_Y;
        this._side = side;
        this._color = color;
    }

    public updateColor(newColor: string){
        this._color = newColor;
    }

    public drawSquare(canvasContext: CanvasRenderingContext2D){
        canvasContext.strokeStyle = this._color;
        canvasContext.lineWidth = 1;
        canvasContext.strokeRect(this._topLeft_X, this._topLeft_Y, this._side, this._side);
    }
}

export default Square;