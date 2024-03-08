import { PointType } from "../figure-primitives/Point";

export default class BezierCurveMatrixFormulaProcessor{
    public static GetCurvePoints(numberOfIntervals: number, controlPoints: PointType[]): PointType[]{
        const formulsCoefs: PointType[] = this.GetFormulaCoeficients(controlPoints);
        const curvePoints = new Array(numberOfIntervals + 1).fill(0);
        const step = 1.0 / numberOfIntervals;
        let t = 0;
        for (let i = 0; i < curvePoints.length; i++) {
            const arrayOfT = this.GetArrayOfT(controlPoints.length - 1, t);
            const elementX = this.MultiplyMatrices(arrayOfT, formulsCoefs.map((point) => new Array(1).fill(point.x)));
            const elementY = this.MultiplyMatrices(arrayOfT, formulsCoefs.map((point) => new Array(1).fill(point.y)));
            const point: PointType = {
                x: elementX[0][0],
                y: elementY[0][0],
            }

            curvePoints[i] = point;
            t += step;
        }

        return curvePoints;
    }

    private static GetArrayOfT(n: number, t: number): number[][]{
        return new Array(1)
        .fill(0).map(() => new Array(n + 1)
        .fill(0).map((_, index) => Math.pow(t, n - index)));
    }

    private static GetFormulaCoeficients(controlPoints: PointType[]): PointType[]{
        const matrixOfCoefs = this.GetMatrixOfCoeficients(controlPoints.length);
        const coefsX = this.MultiplyMatrices(
            matrixOfCoefs, 
            new Array(controlPoints.length).fill(0).map((_, index) => new Array(1).fill(controlPoints[index].x)));
        const coefsY = this.MultiplyMatrices(
            matrixOfCoefs, 
            new Array(controlPoints.length).fill(0).map((_, index) => new Array(1).fill(controlPoints[index].y)));

        return new Array(controlPoints.length).fill(0).map((_, index) => {
            const point: PointType = {
                x: coefsX[index][0],
                y: coefsY[index][0],
            }

            return point;
        });
    } 

    private static GetMatrixOfCoeficients(n: number): number[][]{
        const matrixOfCoefs = new Array(n).fill(0).map(() => new Array(n).fill(0));
        console.log(matrixOfCoefs);
        for (let i = 0; i < n + 1; i++) {
            for (let j = 0; j < (n) - i; j++) {
                matrixOfCoefs[i][j] = this.GetMatrixElement(n - 1, i, j);
            }
        }

        return matrixOfCoefs;
    }

    private static GetMatrixElement(n: number, i: number, j: number){
        let result: number = Math.pow(-1, n - i - j);
        result *= this.Factorial(n) / (this.Factorial(j) * this.Factorial(n - j));
        result *= this.Factorial(n - j) / (this.Factorial(n - i - j) * this.Factorial(i));
        return result;
    }

    private static Factorial(n: number): number{
        if(n <= 1){
            return 1;
        }

        return n * this.Factorial(n - 1);
    }

    private static MultiplyMatrices(matr1: number[][], matr2: number[][]): number[][] 
    {
        const ResN = matr1.length;
        const ResM = matr2[0].length;
        const res = new Array(ResN).fill(0).map(() => new Array(ResM).fill(0));
        let i, j, k; 
        for (i = 0; i < ResN; i++) { 
            for (j = 0; j < ResM; j++) { 
                res[i][j] = 0; 
                for (k = 0; k < matr1[0].length; k++) 
                    res[i][j] += matr1[i][k] * matr2[k][j]; 
            } 
        }

        return res;
    }
}