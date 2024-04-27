class Square{
    private _topLeft_X: number;
    private _topLeft_Y: number;
    private _side: number;
    private _color: string;
    private _angle: number;
    
    constructor(topLeft_X: number, topLeft_Y: number, side: number, color: string, angle: number = 0){
        this._topLeft_X = topLeft_X;
        this._topLeft_Y = topLeft_Y;
        this._side = side;
        this._color = color;
        this._angle = angle;
    }

    public updateColor(newColor: string){
        this._color = newColor;
    }

    public drawSquare(canvasContext: CanvasRenderingContext2D){
        canvasContext.strokeStyle = this._color;
        canvasContext.lineWidth = 2;
        canvasContext.strokeRect(this._topLeft_X, this._topLeft_Y, this._side, this._side);
    }

    public getSquareData(): {topLeftX: number, topLeftY: number, side: number, color: string}{
        return {
            topLeftX: this._topLeft_X,
            topLeftY: this._topLeft_Y,
            side: this._side,
            color: this._color
        }
    }
}

export default Square;