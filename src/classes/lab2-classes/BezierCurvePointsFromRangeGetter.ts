import { PointType } from "../figure-primitives/Point";

export default class BezierCurvePointsFromRangeGetter{
    public static GetPoints(lower: number, upper: number, count: number, curvePoints: PointType[]): PointType[]{
        const allCurvePointsInRange = this.GetAllCurvePointsFromRange(lower, upper, curvePoints);
        if(allCurvePointsInRange.length < 1){
            throw new Error("No points are in selected range");
        }

        if(allCurvePointsInRange.length === 1){
            const pointToReturn: PointType = {
                x: allCurvePointsInRange[allCurvePointsInRange.length / 2].x,
                y: allCurvePointsInRange[allCurvePointsInRange.length / 2].y,
            }

            return [
                pointToReturn
            ]
        }

        const step = (allCurvePointsInRange.length - 1) * 1.0 / (count - 1);
        const resultPoints: PointType[] = [];
        for(let i = 0; Math.floor(i + 0.5) <= allCurvePointsInRange.length; i += step){
            resultPoints.push(allCurvePointsInRange[Math.floor(i + 0.5)]);
        }

        return resultPoints;
    }

    private static GetAllCurvePointsFromRange(lower: number, upper: number, curvePoints: PointType[]): PointType[]{
        const curvePointsInRange: PointType[] = [];
        for(let i = 0; i < curvePoints.length; i++){
            if(curvePoints[i].x >= lower && curvePoints[i].x <= upper){
                curvePointsInRange.push(curvePoints[i]);
            }
        }

        return curvePointsInRange;
    }
}