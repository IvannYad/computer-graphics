import { Button } from "antd"
import "./Lab2Page.scss"
import BezierCurveMatrixFormulaProcessor from "../../classes/lab2-classes/BezierCurveMatrixFormulaProcessor"
import { Point } from "../../classes/lab2-classes/Point";

export default function Lab2Page(){
    function onClick(){
        const controlPoints: Point[] = [
            {
                x: 1,
                y: 1,
            },
            {
                x: 3,
                y: 3,
            },
            // {
            //     x: 4,
            //     y: 3,
            // },
            // {
            //     x: 3,
            //     y: 1,
            // },
        ]
        console.log(BezierCurveMatrixFormulaProcessor.GetCurvePoints(2, controlPoints));
    }
    
    return (
        <>
        <Button onClick={() => onClick()}>
            Click me
        </Button>
        </>
    )   
}