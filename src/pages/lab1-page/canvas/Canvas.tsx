import { useContext, useEffect } from "react";
import FigureComplex from "../../../classes/lab1-classes/FigureComplex"
import "./Canvas.scss"
import { CanvasIdContext } from "../Lab1Page";
import FigureListElement from "./figure-list-element/FigureListElement";
import { GridDrawer } from "../../../classes/canvas/GridDrawer";
import getCanvasContext from "../../../classes/canvas/getCanvasContext";
type CanvasProps = {
    figures: FigureComplex[];
}

export default function Canvas({ figures }: CanvasProps){
    const canvasId = useContext(CanvasIdContext);
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

        figures && figures.length > 0 && figures.map((figure) => {
            figure.drawFigureComplex(canvasContext);
        });
    }, [figures])

    return (
        <div className="canvas-holder">
            <div>
                <div className="figuresListHolder">
                    {figures && figures.length > 0 && figures.map((figure, index) => {
                        return (
                            <FigureListElement key={index} figureKey={index} figureName={figure.getName()} figureColor={figure.getColor()}></FigureListElement>
                        )
                    })}
                </div>
                <canvas id={canvasId} className="canvas" width="400" height="200"></canvas>
            </div>
        </div>
    )   
}
