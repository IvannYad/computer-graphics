import { PointType } from "../figure-primitives/Point";

export default class BezierCurveParametricFormulaProcessor{
    public static GetCurvePoints(numberOfIntervals: number, controlPoints: PointType[]): PointType[]{
        const n = controlPoints.length - 1;
        const step = 1.0 / numberOfIntervals;
        const steps: number[] = new Array(numberOfIntervals + 1)
            .fill(0)
            .map((_, index) => 0 + index * step);
        
        const curvePoints = steps.map((t) => {
                let sumX: number = 0;
                let sumY: number = 0;
                for(let i = 0; i < controlPoints.length; i++){
                    const multiplyCoef = this.GetMultiplicationCoeficient(t, n, i);
                    sumX += controlPoints[i].x * multiplyCoef;
                    sumY += controlPoints[i].y * multiplyCoef;
                }

                const point: PointType = {
                    x: sumX,
                    y: sumY,
                };

                return point;
        })

        return curvePoints;
    }

    private static GetMultiplicationCoeficient(t: number, n: number, i: number){
        let result = this.Factorial(n) / (this.Factorial(i) * this.Factorial(n - i));
        result *= Math.pow(t, i);
        result *= Math.pow((1 - t), n - i);
        return result;
    }

    private static Factorial(n: number): number{
        if(n <= 1){
            return 1;
        }

        return n * this.Factorial(n - 1);
    }
}