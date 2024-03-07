import LABS_CONSTANTS from "../../app/common/constants/labs-constants";
import Circle from "./Circle";
import Line from "./Line";
import Square from "./Square";

class FigureComplex{
    private _name: string;
    private _color: string;
    private _square: Square;
    private _circle: Circle | null = null;
    private _horizonralShades: Line[] = [];
    private _verticalShades: Line[] = [];
    private _isHorizontallyShaded = false;
    private _isVerticallyShaded = false;
    private _isCircleDrawn = false;

    constructor(name: string, topLeft_X: number, topLeft_Y: number, side: number, color: string){
        this._name = name;
        this._color = color;
        this._square = new Square(topLeft_X, topLeft_Y, side, color);
    }

    public getName(){
        return this._name;
    }

    public getColor(){
        return this._color;
    }

    public drawCircle(){
        if(!this._isCircleDrawn){
            const { topLeftX, topLeftY, side, color } = this._square.getSquareData();
            const circleX = topLeftX + (side / 2);
            const circleY = topLeftY + (side / 2);
            const radius = side / 2;
            this._circle = new Circle(circleX, circleY, radius, color);
            this._isCircleDrawn = true;
        }
        
    }

    public drawHorizontalShades(){
        if(!this._isHorizontallyShaded){
            const { topLeftX, topLeftY, side, color } = this._square.getSquareData();
            let currentY = topLeftY;
            while(currentY <= topLeftY + side){
                const line = new Line(topLeftX, currentY, topLeftX + side, currentY, color);
                this._horizonralShades?.push(line);
                currentY += LABS_CONSTANTS.LAB1.SINGLE_SEGMENT / 2;
            }

            this._isHorizontallyShaded = true;
        }
    }

    public drawVerticalShades(){
        if(!this._isVerticallyShaded){
            const { topLeftX, topLeftY, side, color } = this._square.getSquareData();
            let currentX = topLeftX;
            while(currentX <= topLeftX + side){
                const line = new Line(currentX, topLeftY, currentX, topLeftY + side, color);
                this._verticalShades?.push(line);
                currentX += LABS_CONSTANTS.LAB1.SINGLE_SEGMENT / 2;
            }

            this._isVerticallyShaded = true;
        }
    }
    
    public updateColor(newColor: string){
        this._color = newColor;
        this._square.updateColor(newColor);
        if(this._isCircleDrawn){
            this._circle?.updateColor(newColor);
        }

        if(this._isVerticallyShaded){
            this._verticalShades?.map(line => {
                line.updateColor(newColor);
            });
        }

        if(this._isHorizontallyShaded){
            this._horizonralShades?.map(line => {
                line.updateColor(newColor);
            });
        }
    }

    public drawFigureComplex(canvasContext: CanvasRenderingContext2D){
        this._square.drawSquare(canvasContext);
        if(this._isCircleDrawn){
            this._circle?.drawCircle(canvasContext);
        }

        if(this._isVerticallyShaded){
            this._verticalShades?.map(line => {
                line.drawLine(canvasContext);
            });
        }

        if(this._isHorizontallyShaded){
            this._horizonralShades?.map(line => {
                line.drawLine(canvasContext);
            });
        }
    }
}

export default FigureComplex;