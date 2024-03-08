import "./Lab2Page.scss"
import BezierCurveMatrixFormulaProcessor from "../../classes/lab2-classes/BezierCurveMatrixFormulaProcessor"
import { PointType } from "../../classes/figure-primitives/Point";
import { createContext, useEffect, useState } from "react";
import Lab1Form from "../lab1-page/lab1-form/Lab1Form";
import getCanvasContext from "../../classes/canvas/getCanvasContext";
import { GridDrawer } from "../../classes/canvas/GridDrawer";

export const CanvasIdContext = createContext<string>('');

export default function Lab2Page(){
    const [isChanged, setIsChanged] = useState(false);
    const canvasId = "lab2-canvas";
    useEffect(() => {
        const SCALING_FACTOR = 2;
        const ctx = getCanvasContext(canvasId);
        ctx.canvas.width = SCALING_FACTOR * ctx.canvas.width;
        ctx.canvas.height = SCALING_FACTOR * ctx.canvas.height;
        ctx.scale(SCALING_FACTOR, SCALING_FACTOR);
        const transX = 400;
        const transY = 200;
        console.log(transX);
        console.log(transY);
        ctx.translate(transX, transY);
    }, [])

    useEffect(() => {
        const canvasContext = getCanvasContext(canvasId);
        canvasContext.clearRect(-400, -200, canvasContext.canvas.width, canvasContext.canvas.height);
        const gridDrawer = new GridDrawer(canvasId);
        gridDrawer.drawGrid();

        if(isChanged === true){
            setIsChanged(false);
        }
    }, [isChanged])

    function onClick(){
        const controlPoints: PointType[] = [
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
        console.log(BezierCurveMatrixFormulaProcessor.GetCurvePoints(10, controlPoints));
    }
    
    onClick();
    return (
        <CanvasIdContext.Provider value={canvasId}>
            <div className="page lab2-page">
                        <div className="lab2-page-flex-grid">
                            <div className="lab2-page-grid-element lab2-page-grid-element-canvas">
                                <canvas id={canvasId} className="canvas" width="400" height="200"></canvas>
                            </div>
                            <div className="lab2-page-grid-element lab2-page-grid-element-form">
                                <Lab1Form></Lab1Form>
                            </div>
                        </div>
                    </div>
        </CanvasIdContext.Provider>
    )   
}