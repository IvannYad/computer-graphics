import "./Lab2Page.scss"
import { createContext, useEffect, useState } from "react";
import getCanvasContext from "../../classes/canvas/getCanvasContext";
import { GridDrawer } from "../../classes/canvas/GridDrawer";
import Lab2ControlPanel from "./lab2-control-panel/Lab2ControlPanel";
import BezierCurveFigureComplex from "../../classes/lab2-classes/BezierCurveFigureComplex";

export const CanvasIdContext = createContext<string>('');

export default function Lab2Page(){
    const [bezierCurve, setBezierCurve] = useState<BezierCurveFigureComplex>();

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

        if(bezierCurve){
            bezierCurve.DrawBezierFigureComplex(canvasContext);
        }
    }, [bezierCurve])

    return (
        <div className="page lab2-page">
            <div className="lab2-page-flex-grid">
                <div className="lab2-page-grid-element lab2-page-grid-element-canvas">
                    <canvas id={canvasId} className="canvas" width="400" height="200"></canvas>
                </div>
                <div className="lab2-page-grid-element lab2-page-grid-element-form">
                    <Lab2ControlPanel setBezierCurve={setBezierCurve}></Lab2ControlPanel>
                </div>
            </div>
        </div>
    )   
}