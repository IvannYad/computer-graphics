import { useEffect } from "react";
import "./Lab3Page.scss"
import Lab3ControlPanel from "./lab3-control-panel/Lab3ControlPanel";
import FractalsDrawersContext from "../../classes/lab3-classes/FractalDrawersContext";
import SerpinskiyTriangleDrawer from "../../classes/lab3-classes/SerpinskiyTriangleDrawer";
import ResetCanvas from "../../classes/canvas/ResetCanvas";
import SerpinskiyCarpetDrawer from "../../classes/lab3-classes/SerpinskiyCarpetDrawer";
import getCanvasContext from "../../classes/canvas/getCanvasContext";
import CustomFractalDrawer from "../../classes/lab3-classes/CustomFractalDrawer";


export default function Lab3Page(){
    const canvasId = "lab3-canvas";
    
    useEffect(() => {
        ResetCanvas(getCanvasContext(canvasId), canvasId);
    }, [])

    const fractalsDrawersContextValues = {
        serpinskiyTriangleDrawer: new SerpinskiyTriangleDrawer(),
        serpinskiyCarpetDrawer: new SerpinskiyCarpetDrawer(),
        customFractalDrawer: new CustomFractalDrawer(),
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