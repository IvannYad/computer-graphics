import { useContext, useEffect } from "react";
import FigureComplex from "../../../classes/lab1-classes/FigureComplex"
import "./Canvas.scss"
import { CanvasIdContext } from "../Lab1Page";
type CanvasProps = {
    figures: FigureComplex[];
}

function getCanvasContext(canvasId: string): CanvasRenderingContext2D{
    const SCALING_FACTOR = 2;
    const canvas = document.getElementById(canvasId)! as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    ctx.canvas.width = SCALING_FACTOR * canvas.width;
    ctx.canvas.height = SCALING_FACTOR * canvas.height;
    ctx.scale(SCALING_FACTOR, SCALING_FACTOR);
    return ctx;
}

export default function Canvas({ figures }: CanvasProps){
    const canvasId = useContext(CanvasIdContext);
    useEffect(() => {
        console.log("hello");
        console.log(figures);
        const canvasContext = getCanvasContext(canvasId);
        figures && figures.length > 0 && figures.map((figure) => {
            figure.drawFigureComplex(canvasContext);
        });
    }, [])

    return (
        <div className="canvas-holder">
            <canvas id={canvasId} className="canvas" width="400" height="200"></canvas>
        </div>
    )   
}
