import { useEffect, useState } from "react";
import "./Lab4Page.scss"
import Lab4ControlPanel, { coordinates } from "./lab4-control-panel/Lab4ControlPanel";
import getCanvasContext from "../../classes/canvas/getCanvasContext";

export default function Lab4Page(){
    const canvasId = "lab4-canvas";
    const [coordOne, setCoordOne] = useState<coordinates | null>(null);
    const [widthHeight, setWidthHeight] = useState<coordinates | null>(null);
    
    useEffect(() => {
        const canvasContext = getCanvasContext(canvasId);
        const img = new Image(); // Create new img element
        img.onload = function(){
            canvasContext.canvas.width = img.width;
            canvasContext.canvas.height = img.height;
            canvasContext.drawImage(img, 0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            const imgData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            canvasContext.putImageData(imgData, 0, 0);
            if (coordOne && widthHeight) {
                const canvasContext = getCanvasContext(canvasId);
                canvasContext.strokeStyle = 'red';
                canvasContext.rect(coordOne.x, coordOne.y, widthHeight.x, widthHeight.y);
                canvasContext.stroke();
            }
        };
        img.src = "../../../public/image.png";
    }, [coordOne, widthHeight])
    return (
        <div className="page lab4-page">
            <div className="lab4-page-flex-grid">
                <div className="lab4-page-grid-element lab4-page-grid-element-canvas">
                    <canvas id={canvasId} className="canvas" width="400" height="200"></canvas>
                </div>
                <div className="lab4-page-grid-element lab4-page-grid-control-panel">
                    <Lab4ControlPanel coordOne={coordOne} setCoordOne={setCoordOne} widthHeight={widthHeight} setWidthHeight={setWidthHeight}></Lab4ControlPanel>
                </div>
            </div>
        </div>
    )   
}