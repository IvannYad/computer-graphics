import { useEffect, useState } from "react";
import "./Lab3ControlPanel.scss"
import SerpinskiyTriangleCreateForm from "./serpinskiy-triangle-create-form/SerpinskiyTriangleCreateForm"
import SerpinskiyCarpetCreateForm from "./serpinskiy-carpet-create-form/SerpinskiyCarpetCreateForm";
import CustomFractalCreateForm from "./custom-fractal-create-form/CustomFractalCreateForm";
import getCanvasContext from "../../../classes/canvas/getCanvasContext";
import ResetCanvas, { CreateCanvasForCutomFractal } from "../../../classes/canvas/ResetCanvas";

// type Lab3ControlPanelProps = {
//    hello: string 
// };

export default function Lab3ControlPanel(){
    const canvasId = "lab3-canvas";
    const [isSerpTriangleFormOpen, setIsSerpTriangleFormOpen] = useState(false);
    const [isSerpCarpetFormOpen, setIsSerpCarpetFormOpen] = useState(false);
    const [isCutomFractalFormOpen, setIsCutomFractalFormOpen] = useState(false);

    useEffect(() => {
        if (isCutomFractalFormOpen) {
            const canvas = document.getElementById(canvasId);
            canvas!.style.height = "500px";
            canvas!.style.width = "500px";
            CreateCanvasForCutomFractal(getCanvasContext(canvasId));
        }
        else {
            ResetCanvas(getCanvasContext(canvasId), canvasId);
        }
    }, [isCutomFractalFormOpen])

    return (
        <div>
            <h2 className="lab3-title">Lab3</h2>
            <div className="control-panel-element-holder">
                <div className="control-panel-button-holder">
                    <button className="control-panel-button" onClick={() => {
                        setIsCutomFractalFormOpen(false);
                        setIsSerpCarpetFormOpen(false);
                        setIsSerpTriangleFormOpen(!isSerpTriangleFormOpen);
                    }}>Serpinskiy triangle</button>
                </div>
                <SerpinskiyTriangleCreateForm isOpen={isSerpTriangleFormOpen}/>
            </div>
            <div className="control-panel-element-holder">
                <div className="control-panel-button-holder">
                    <button className="control-panel-button" onClick={() => {
                        setIsCutomFractalFormOpen(false);
                        setIsSerpTriangleFormOpen(false);
                        setIsSerpCarpetFormOpen(!isSerpCarpetFormOpen);
                    }}>Serpinskiy carpet</button>
                </div>
                <SerpinskiyCarpetCreateForm isOpen={isSerpCarpetFormOpen}/>
            </div>
            <div className="control-panel-element-holder">
                <div className="control-panel-button-holder">
                    <button className="control-panel-button" onClick={() => {
                        setIsSerpTriangleFormOpen(false);
                        setIsSerpCarpetFormOpen(false);
                        setIsCutomFractalFormOpen(!isCutomFractalFormOpen);
                    }}>Serpinskiy triangle</button>
                </div>
                <CustomFractalCreateForm isOpen={isCutomFractalFormOpen}/>
            </div>
        </div>
    )   
}
