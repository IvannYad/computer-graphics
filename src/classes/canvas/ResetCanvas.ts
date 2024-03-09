import { GridDrawer } from "./GridDrawer";

export default function ResetCanvas(canvasContext: CanvasRenderingContext2D, canvasId: string){
    canvasContext.clearRect(-400, -200, canvasContext.canvas.width, canvasContext.canvas.height);
    const gridDrawer = new GridDrawer(canvasId);
    gridDrawer.drawGrid();
}