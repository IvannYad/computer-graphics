import { GridDrawer } from "./GridDrawer";

export default function ResetCanvas(canvasContext: CanvasRenderingContext2D, canvasId: string){
    canvasContext.canvas.width = 1600;
    canvasContext.canvas.height = 800;
    canvasContext.scale(2, 2);
    const transX = 400;
    const transY = 200;
    console.log(transX);
    console.log(transY);
    canvasContext.translate(transX, transY);
    canvasContext.clearRect(-400, -200, canvasContext.canvas.width, canvasContext.canvas.height);
    const gridDrawer = new GridDrawer(canvasId);
    gridDrawer.drawGrid();
}

export function CreateCanvasForCutomFractal(canvasContext: CanvasRenderingContext2D) {
    canvasContext.canvas.width = 400;
    canvasContext.canvas.height = 400;
    canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    canvasContext.fillStyle = "#DDDCDD";
    canvasContext.fillRect(0, 0,canvasContext.canvas.width, canvasContext.canvas.height);
}