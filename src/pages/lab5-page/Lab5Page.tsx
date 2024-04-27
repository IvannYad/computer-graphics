import { useEffect } from "react";
import "./Lab5Page.scss"
import FractalsDrawersContext from "../../classes/lab3-classes/FractalDrawersContext";
import SerpinskiyTriangleDrawer from "../../classes/lab3-classes/SerpinskiyTriangleDrawer";
import ResetCanvas from "../../classes/canvas/ResetCanvas";
import SerpinskiyCarpetDrawer from "../../classes/lab3-classes/SerpinskiyCarpetDrawer";
import getCanvasContext from "../../classes/canvas/getCanvasContext";
import CustomFractalDrawer from "../../classes/lab3-classes/CustomFractalDrawer";
import Lab5ControlPanel from "./lab5-control-panel/Lab5ControlPanel";


export default function Lab5Page(){
    const canvasId = "lab5-canvas";
    
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
            <div className="page lab5-page">
                <div className="lab5-page-flex-grid">
                    <div className="lab5-page-grid-element lab5-page-grid-element-canvas">
                        <canvas id={canvasId} className="canvas" width="400" height="200"></canvas>
                    </div>
                    <div className="lab5-page-grid-element lab5-page-grid-control-panel">
                        <Lab5ControlPanel></Lab5ControlPanel>
                    </div>
                </div>
            </div>
        </FractalsDrawersContext.Provider>
    )   
}