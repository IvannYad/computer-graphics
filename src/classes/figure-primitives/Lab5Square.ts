import LABS_CONSTANTS from "../../app/common/constants/labs-constants";
import ResetCanvas from "../canvas/ResetCanvas";
import { PointType } from "./Point";

class Lab5Square{
    private singleSegment: number = 0;
    private anchorPointNumber: number;
    private scale: number;
    private points: PointType[] = [];
    private transformedPoints: PointType[] | null = null;
    private animationStep: PointType[] | null = null;
    private animationSquareSteps: PointType[][] | null = null;
    private static intervalId: NodeJS.Timeout | null = null;
    private currentStep: number = 0;
    private isBackwardAnimationPlay: boolean = false;
    private matrix: number[][] | null = null;
    
    constructor(singleSegment: number,
        center_X: number,
        center_Y: number,
        side: number,
        angle: number = 0,
        anchorPointNumber: number = 1,
        scale: number = 1){
        this.singleSegment = singleSegment;
        this.points = this.GetRotatedPoints(center_X, center_Y, side, angle);
        this.matrix = this.GetMatrix(scale);
        this.anchorPointNumber = anchorPointNumber;
        this.scale = scale;

        if (Lab5Square.intervalId) {
            clearInterval(Lab5Square.intervalId);
            Lab5Square.intervalId = null;
        }
    }

    public drawSquare(canvasContext: CanvasRenderingContext2D){
        ResetCanvas(canvasContext, 'lab5-canvas');
        
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = Lab5Square.intervalId ? '#856f6f6e' : 'black';
        if (Lab5Square.intervalId) {
            canvasContext.setLineDash([10, 5]);
        }

        for (let i = 0; i < 4; i++) {
            canvasContext.moveTo(this.points[i].x * this.singleSegment, this.points[i].y * -this.singleSegment);
            canvasContext.lineTo(this.points[(i + 1) % 4].x * this.singleSegment, this.points[(i + 1) % 4].y * -this.singleSegment);
            canvasContext.stroke();
        }

        if (this.transformedPoints) {
            for (let i = 0; i < 4; i++) {
                canvasContext.moveTo(this.transformedPoints[i].x * this.singleSegment, this.transformedPoints[i].y * -this.singleSegment);
                canvasContext.lineTo(this.transformedPoints[(i + 1) % 4].x * this.singleSegment, this.transformedPoints[(i + 1) % 4].y * -this.singleSegment);
                canvasContext.stroke();
            }
        }        

        canvasContext.lineWidth = 1;
        if (this.animationSquareSteps) {
            const currentIndex = this.currentStep;
            canvasContext.setLineDash([]);
            canvasContext.fillStyle = '#f05a5a44';
            canvasContext.strokeStyle = 'red';
            canvasContext.beginPath();
            canvasContext.moveTo(this.animationSquareSteps[currentIndex][0].x * this.singleSegment, this.animationSquareSteps[currentIndex][0].y * -this.singleSegment);
            for (let i = 1; i < 4; i++) {
                canvasContext.lineTo(this.animationSquareSteps[currentIndex][i].x * this.singleSegment, this.animationSquareSteps[currentIndex][i].y * -this.singleSegment);
                canvasContext.stroke();
            }

            canvasContext.lineTo(this.animationSquareSteps[currentIndex][0].x * this.singleSegment, this.animationSquareSteps[currentIndex][0].y * -this.singleSegment);
            canvasContext.stroke();
            canvasContext.closePath();
            canvasContext.fill();
        }

        const anchorPoint: PointType = this.points[this.anchorPointNumber];
        canvasContext.fillStyle = 'red';
        canvasContext.beginPath();
        canvasContext.arc(anchorPoint.x * this.singleSegment, anchorPoint.y  * -this.singleSegment, 3, 0, Math.PI * 2); // Outer circle
        canvasContext.fill();
        canvasContext.closePath();
    }

    public performTransformation(){
        if (Lab5Square.intervalId) {
            clearInterval(Lab5Square.intervalId);
            Lab5Square.intervalId = null;
        }
        const anchorPoint: PointType = this.points[this.anchorPointNumber];
        this.transformedPoints = [];
        for (let i = 0; i < 4; i++) {
            if (i === this.anchorPointNumber){
                this.transformedPoints.push(this.points[i]); 
                continue;
            }

            const newX = (this.matrix![0][0] * (this.points[i].x - anchorPoint.x)) +
                (this.matrix![0][1] * (this.points[i].y - anchorPoint.y)) +
                (this.matrix![0][2]);
            const newY = (this.matrix![1][0] * (this.points[i].x - anchorPoint.x)) +
                (this.matrix![1][1] * (this.points[i].y - anchorPoint.y)) +
                (this.matrix![1][2]);
            this.transformedPoints.push({x:newX + anchorPoint.x, y:newY + anchorPoint.y});
        }

        this.animationStep = [];
        for (let i = 0; i < 4; i++) {
            this.animationStep.push({
                x: (this.transformedPoints[i].x - this.points[i].x) / 100,
                y: (this.transformedPoints[i].y - this.points[i].y) / 100,
            });
        }

        this.animationSquareSteps = [];
        for (let i = 0; i < 100; i++) {
            const currentSquare: PointType[] = [];
            for (let j = 0; j < 4; j++) {
                currentSquare.push({
                    x: this.points[j].x + i * this.animationStep[j].x,
                    y: this.points[j].y + i * this.animationStep[j].y,
                });
            }

            this.animationSquareSteps.push(currentSquare);
        }

        console.log(this.animationSquareSteps);
    }

    public playAnimation(canvasContext: CanvasRenderingContext2D) {
        this.stopAnimation(canvasContext);
        Lab5Square.intervalId = setInterval(() => 
        {
            this.currentStep += this.isBackwardAnimationPlay ? -1 : 1;
            this.currentStep = this.currentStep === -1 ? 99 : this.currentStep;
            this.currentStep %= 100;
            this.drawSquare(canvasContext);
        }, 30)
    }

    public stopAnimation(canvasContext: CanvasRenderingContext2D | null) {
        if (Lab5Square.intervalId) {
            clearInterval(Lab5Square.intervalId);
            Lab5Square.intervalId = null;
            if (canvasContext) {
                console.log("asdasdas");
                this.drawSquare(canvasContext);
            }
        }
    }

    public setSingleSegment(newSingleSegment: number){
        this.singleSegment = newSingleSegment * LABS_CONSTANTS.LAB1.SINGLE_SEGMENT;
    }

    public setIsBackwardAnimationPlay(isBackwardAnimationPlay: boolean){
        this.isBackwardAnimationPlay = isBackwardAnimationPlay;
    }

    public getMatrixString(){
        if (this.matrix) {
            let matrixStringified = "[ " + this.matrix[0].toString() + " ]\n";
            matrixStringified += "[ " + this.matrix[1].toString() + " ]\n";
            matrixStringified += "[ " + this.matrix[2].toString() + " ]\n";
            return matrixStringified;
        }

        return "";
    }

    private GetRotatedPoints(center_X: number, center_Y: number, side: number, angle: number){
        const rotatedPoints: PointType[] = [];
        for (let i = 0; i < 4; i++) {
            const computedAngle = ((i * 2) - 1) * 45 - angle;
            const newX = (center_X + Math.SQRT2 / 2 * side * Math.cos(computedAngle * Math.PI / 180));
            const newY = (center_Y + Math.SQRT2 / 2 * side * Math.sin(computedAngle * Math.PI / 180))
            console.log(newX);
            rotatedPoints.push({x:newX, y:newY});
        }

        return rotatedPoints;
    }

    private GetMatrix(scale: number) {
        const matr: number[][] = [];
        matr.push([scale, 0, 0]);
        matr.push([0, scale, 0]);
        matr.push([0, 0, 1]);

        return matr;
    }
}

export default Lab5Square;