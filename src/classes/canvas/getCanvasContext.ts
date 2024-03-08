export default function getCanvasContext(canvasId: string): CanvasRenderingContext2D{
    let canvas = null;
    while(canvas === null){
       canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    }
    const ctx = canvas.getContext("2d")!;
    return ctx;
}