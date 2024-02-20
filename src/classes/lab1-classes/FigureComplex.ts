import Circle from "./Circle";
import Square from "./Square";

class FigureComplex{
    private _name: string;
    private _square: Square;
    private _circle: Circle | null = null;
    private _isHorizontallyShaded = false;
    private _isVerticallyShaded = false;
    private _isCircleDrawn = false;

    constructor(name: string, topLeft_X: number, topLeft_Y: number, side: number, color: string){
        this._name = name;
        this._square = new Square(topLeft_X, topLeft_Y, side, color);
    }

    public drawCircle(x: number, y: number, radius: number, color: string){
        if(!this._isCircleDrawn){
            this._circle = new Circle(x, y, radius, color);
            this._isCircleDrawn = true;
        }
    }

    public updateColor(newColor: string){
        this._square.updateColor(newColor);
        if(this._isCircleDrawn){
            this._circle?.updateColor(newColor);
        }
    }

    public drawFigureComplex(canvasContext: CanvasRenderingContext2D){
        this._square.drawSquare(canvasContext);
        if(this._isCircleDrawn){
            this._circle?.drawCircle(canvasContext);
        }
    }
}

export default FigureComplex;