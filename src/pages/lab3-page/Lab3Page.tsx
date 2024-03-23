import { useEffect } from "react";
import "./Lab3Page.scss"
import getCanvasContext from "../../classes/canvas/getCanvasContext";
import Lab3ControlPanel from "./lab3-control-panel/Lab3ControlPanel";
import FractalsDrawersContext from "../../classes/lab3-classes/FractalDrawersContext";
import SerpinskiyTriangleDrawer from "../../classes/lab3-classes/SerpinskiyTriangleDrawer";
import ResetCanvas from "../../classes/canvas/ResetCanvas";
import SerpinskiyCarpetDrawer from "../../classes/lab3-classes/SerpinskiyCarpetDrawer";


export default function Lab3Page(){
    const canvasId = "lab3-canvas";
    
    useEffect(() => {
        console.log("fff");
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
        ResetCanvas(ctx, canvasId);
    }, [])

    const fractalsDrawersContextValues = {
        serpinskiyTriangleDrawer: new SerpinskiyTriangleDrawer(),
        serpinskiyCarpetDrawer: new SerpinskiyCarpetDrawer(),
    }

    return (
        <FractalsDrawersContext.Provider value={fractalsDrawersContextValues}>
            <div className="page lab3-page">
                <div className="lab3-page-flex-grid">
                    <div className="lab3-page-grid-element lab3-page-grid-element-canvas">
                        <canvas id={canvasId} className="canvas" width="400" height="200"></canvas>
                    </div>
                    <div className="lab3-page-grid-element lab3-page-grid-control-panel">
                        <Lab3ControlPanel></Lab3ControlPanel>
                    </div>
                </div>
            </div>
        </FractalsDrawersContext.Provider>
    )   
}