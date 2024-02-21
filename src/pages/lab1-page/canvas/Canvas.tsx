import { useContext, useEffect } from "react";
import FigureComplex from "../../../classes/lab1-classes/FigureComplex"
import "./Canvas.scss"
import { CanvasIdContext } from "../Lab1Page";
import FigureListElement from "./figure-list-element/FigureListElement";
import { GridDrawer } from "../../../classes/lab1-classes/GridDrawer";
type CanvasProps = {
    figures: FigureComplex[];
}

function getCanvasContext(canvasId: string): CanvasRenderingContext2D{
    let canvas = null;
    while(canvas === null){
       canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    }
    const ctx = canvas.getContext("2d")!;
    return ctx;
}

export default function Canvas({ figures }: CanvasProps){
    const canvasId = useContext(CanvasIdContext);
    useEffect(() => {
        const SCALING_FACTOR = 2;
        const ctx = getCanvasContext(canvasId);
        ctx.canvas.width = SCALING_FACTOR * ctx.canvas.width;
        ctx.canvas.height = SCALING_FACTOR * ctx.canvas.height;
        ctx.scale(SCALING_FACTOR, SCALING_FACTOR);
    }, [])

    useEffect(() => {
        const canvasContext = getCanvasContext(canvasId);
        canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
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
