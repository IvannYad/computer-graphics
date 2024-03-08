import Line from "../figure-primitives/Line";
import Point, { PointType } from "../figure-primitives/Point";

export default class BezierCurveFigureComplex{
    private _controlPoints: Point[];
    private _controlLines: Line[];
    private _curveLines: Line[];
    
    constructor(controlPoints: PointType[], curvePoints: PointType[]){
        controlPoints = this.PerformCoordinatesTransition(controlPoints);
        this._controlPoints = controlPoints
            .map(point => new Point(point.x, point.y, "#E37316"));

        this._controlLines = this.GetLinesFromPoints(controlPoints, "black");
        this._controlLines[0].updateColor("#0974AA");
        this._controlLines[this._controlLines.length - 1].updateColor("#0974AA");
        this._curveLines = this.GetLinesFromPoints(this.PerformCoordinatesTransition(curvePoints), "red");
    }

    public DrawBezierFigureComplex(canvasContext: CanvasRenderingContext2D){
        this.DrawControlLines(canvasContext);
        this.DrawCurveLines(canvasContext);
        this.DrawControlPoints(canvasContext);
    }

    public GetControlPoints(): Point[]{
        return this._controlPoints;
    }

    private DrawControlPoints(canvasContext: CanvasRenderingContext2D){
        this._controlPoints.map(point => point.drawPoint(canvasContext));
    }

    private DrawControlLines(canvasContext: CanvasRenderingContext2D){
        this._controlLines.map(line => line.drawLine(canvasContext));
    }

    private DrawCurveLines(canvasContext: CanvasRenderingContext2D){
        this._curveLines.map(line => line.drawLine(canvasContext));
    }

    private GetLinesFromPoints(points: PointType[], color: string): Line[]{
        const lines: Line[] = [];
        for (let i = 0; i < points.length - 1; i++) {
            const line = new Line(
                points[i].x,
                points[i].y,
                points[i + 1].x,
                points[i + 1].y,
                color)
            lines.push(line);
        }

        return lines;
    }

    private PerformCoordinatesTransition(coordinates: PointType[]){
        coordinates = coordinates.map(point => {
            const newPoint: PointType = {
                x: point.x * 20,
                y: point.y * -20,
            }

            return newPoint;
        })

        return coordinates;
    }
}