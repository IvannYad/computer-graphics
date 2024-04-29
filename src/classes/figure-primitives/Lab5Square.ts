import LABS_CONSTANTS from "../../app/common/constants/labs-constants";
import Round from "../../functions/Round";
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
    private shiftMatrix: number[][] | null = null;
    private scaleMatrix: number[][] | null = null;
    private shiftMatrixReverse: number[][] | null = null;
    private resultAfinnyMatrix: number[][];
    
    constructor(singleSegment: number,
        center_X: number,
        center_Y: number,
        side: number,
        angle: number = 0,
        anchorPointNumber: number = 1,
        scale: number = 1){
        this.singleSegment = singleSegment;
        this.points = this.GetRotatedPoints(center_X, center_Y, side, angle);
        this.anchorPointNumber = anchorPointNumber;
        this.scale = scale;

        if (Lab5Square.intervalId) {
            clearInterval(Lab5Square.intervalId);
            Lab5Square.intervalId = null;
        }

        this.shiftMatrixReverse = this.GetShiftMatrix(true, this.points[anchorPointNumber].x, this.points[anchorPointNumber].y);
        this.shiftMatrix = this.GetShiftMatrix(false,  this.points[anchorPointNumber].x, this.points[anchorPointNumber].y);
        this.scaleMatrix = this.GetScaleMatrix(this.scale);
        this.resultAfinnyMatrix = this.GetAffinyMatrix(this.shiftMatrixReverse, this.scaleMatrix, this.shiftMatrix);
        console.log(this.shiftMatrix);
        console.log(this.shiftMatrixReverse);
        console.log(this.resultAfinnyMatrix);
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
        
        this.transformedPoints = [];
        for (let i = 0; i < 4; i++) {
            if (i === this.anchorPointNumber){
                this.transformedPoints.push(this.points[i]); 
                continue;
            }

            const newX = this.resultAfinnyMatrix[0][0] * this.points[i].x + 
                this.resultAfinnyMatrix[0][1] * this.points[i].y + 
                this.resultAfinnyMatrix[0][2];
            const newY = this.resultAfinnyMatrix[1][0] * this.points[i].x + 
                this.resultAfinnyMatrix[1][1] * this.points[i].y + 
                this.resultAfinnyMatrix[1][2];
            this.transformedPoints.push({ x:newX, y:newY });
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
        if (this.resultAfinnyMatrix) {
            let matrixStringified = `[${Round(this.resultAfinnyMatrix[0][0], 2)}\t ${Round(this.resultAfinnyMatrix[0][1], 2)}\t ${Round(this.resultAfinnyMatrix[0][2], 2)}\t]\n`;
            matrixStringified += `[${Round(this.resultAfinnyMatrix[1][0], 2)}\t ${Round(this.resultAfinnyMatrix[1][1], 2)}\t ${Round(this.resultAfinnyMatrix[1][2], 2)}\t]\n`;
            matrixStringified += `[${Round(this.resultAfinnyMatrix[2][0], 2)}\t ${Round(this.resultAfinnyMatrix[2][1], 2)}\t ${Round(this.resultAfinnyMatrix[2][2], 2)}\t]\n`;
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

    private GetShiftMatrix(isReverse: boolean, xShift: number, yShift: number){
        const matrix: number[][] = [];
        matrix.push([1, 0, isReverse ? -xShift : xShift]);
        matrix.push([0, 1, isReverse ? -yShift : yShift]);
        matrix.push([0, 0, 1]);

        return matrix;
    }

    private GetScaleMatrix(scale: number){
        const matrix: number[][] = [];
        matrix.push([scale, 0, 0]);
        matrix.push([0, scale, 0]);
        matrix.push([0, 0, 1]);

        return matrix;
    }

    private GetAffinyMatrix(shiftReverseMatrix: number[][], scaleMatrix: number[][], shiftMatrix: number[][]){
        let result: number[][] = this.multiplyMatrices(shiftMatrix, scaleMatrix);
        result = this.multiplyMatrices(result, shiftReverseMatrix);
        return result;
    }

    private multiplyMatrices(matrix1: number[][], matrix2: number[][]): number[][] {
        const result: number[][] = [];
        const rows1 = matrix1.length;
        const cols1 = matrix1[0].length;
        const rows2 = matrix2.length;
        const cols2 = matrix2[0].length;
    
        if (cols1 !== rows2) {
            throw new Error("Number of columns in the first matrix must be equal to the number of rows in the second matrix.");
        }
    
        for (let i = 0; i < rows1; i++) {
            result[i] = [];
            for (let j = 0; j < cols2; j++) {
                result[i][j] = 0;
                for (let k = 0; k < cols1; k++) {
                    result[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
    
        return result;
    }
}

export default Lab5Square;