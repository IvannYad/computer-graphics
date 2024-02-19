class Square{
    private _topLeft_X: number;
    private _topLeft_Y: number;
    private _side: number;
    private _color: string;
    private _canvasCtx: CanvasRenderingContext2D;

    constructor(canvasContext: CanvasRenderingContext2D, topLeft_X: number, topLeft_Y: number, side: number, color: string){
        this._topLeft_X = topLeft_X;
        this._topLeft_Y = topLeft_Y;
        this._side = side;
        this._color = color;
        this._canvasCtx = canvasContext;
        this.drawSquare();
    }

    public updateColor(newColor: string){
        this._color = newColor;
        this.drawSquare();
    }

    private drawSquare(){
        this._canvasCtx.fillStyle = this._color;
        this._canvasCtx.strokeRect(this._topLeft_X, this._topLeft_Y, this._side, this._side);
    }

    public clearSquare(){
        
    }
}

export default Square;