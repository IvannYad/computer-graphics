import "./Lab2Page.scss"
import { createContext, useEffect, useState } from "react";
import getCanvasContext from "../../classes/canvas/getCanvasContext";
import Lab2ControlPanel from "./lab2-control-panel/Lab2ControlPanel";
import BezierCurveFigureComplex from "../../classes/lab2-classes/BezierCurveFigureComplex";
import Point, { PointType } from "../../classes/figure-primitives/Point";
import ResetCanvas from "../../classes/canvas/ResetCanvas";

export const CanvasIdContext = createContext<string>('');

function DrawBezierCurve(canvasId: string, bezierCurve: BezierCurveFigureComplex | undefined){
    const canvasContext = getCanvasContext(canvasId);
    ResetCanvas(canvasContext, canvasId);

    if(bezierCurve){
        bezierCurve.DrawBezierFigureComplex(canvasContext);
    }
}

export default function Lab2Page(){
    const [bezierCurve, setBezierCurve] = useState<BezierCurveFigureComplex>();
    const [rangePoints, setRangePoints] = useState<PointType[]>([]);
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
        DrawBezierCurve(canvasId, bezierCurve);
    }, [bezierCurve])

    useEffect(() => {
        DrawBezierCurve(canvasId, bezierCurve);
        if(rangePoints){
            const canvasContext = getCanvasContext(canvasId);
            rangePoints.map(point => new Point(point.x * 20, point.y * -20, "black").drawPoint(canvasContext)); 
        }
    }, [rangePoints])

    return (
        <CanvasIdContext.Provider value={canvasId}>
            <div className="page lab2-page">
                <div className="lab2-page-flex-grid">
                    <div className="lab2-page-grid-element lab2-page-grid-element-canvas">
                        <canvas id={canvasId} className="canvas" width="400" height="200"></canvas>
                    </div>
                    <div className="lab2-page-grid-element lab2-page-grid-element-form">
                        <Lab2ControlPanel 
                            bezierCurve={bezierCurve} 
                            setBezierCurve={setBezierCurve} 
                            setRangePoints={setRangePoints}
                            rangePoints={rangePoints}
                            ></Lab2ControlPanel>
                            
                    </div>
                </div>
            </div>
        </CanvasIdContext.Provider>
    )   
}