import Circle from "./Circle";
import Square from "./Square";

class FigureComplex{
    private _canvasCtx: CanvasRenderingContext2D;
    private _square: Square;
    private _circle: Circle | null = null;
    private _isHorizontallyShaded = false;
    private _isVerticallyShaded = false;
    private _isCircleDrawn = false;

    constructor(canvasContext: CanvasRenderingContext2D, topLeft_X: number, topLeft_Y: number, side: number, color: string){
        this._canvasCtx = canvasContext;
        this._square = new Square(this._canvasCtx, topLeft_X, topLeft_Y, side, color);
    }

    public drawCircle(x: number, y: number, radius: number, color: string){
        if(!this._isCircleDrawn){
            this._circle = new Circle(this._canvasCtx, x, y, radius, color);
            this._isCircleDrawn = true;
        }
    }

    public updateColor(newColor: string){
        this._square.updateColor(newColor);
        if(this._isCircleDrawn){
            this._circle?.updateColor(newColor);
        }
    }

    public clearFigureComplex(){
        this._square.clearSquare();
        if(this._isCircleDrawn){
            this._circle?.clearCircle();
        }
    }
}

export default FigureComplex;