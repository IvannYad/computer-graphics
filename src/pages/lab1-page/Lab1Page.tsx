import { createContext, useState } from "react"
import "./Lab1Page.scss"
import Canvas from "./canvas/Canvas"
import Lab1Form from "./lab1-form/Lab1Form"
import FigureComplex from "../../classes/lab1-classes/FigureComplex"

export const CanvasIdContext = createContext<string>('');

export default function Lab1Page(){
    const [figureComplexes, setfigureComplexes] = useState<FigureComplex[]>([
        new FigureComplex(100, 100, 70, "green"),
        new FigureComplex(50, 50, 40, "yellow"),
        new FigureComplex(300, 0, 40, "red"),
    ]);
    const canvasId = "lab1-canvas";
    return (
        <CanvasIdContext.Provider value={canvasId}>
            <div className="page lab1-page">
                <div className="lab1-page-flex-grid">
                    <div className="lab1-page-grid-element lab1-page-grid-element-canvas">
                        <Canvas figures={figureComplexes}></Canvas>
                    </div>
                    <div className="lab1-page-grid-element lab1-page-grid-element-form">
                        <Lab1Form ></Lab1Form>
                    </div>
                </div>
            </div>
        </CanvasIdContext.Provider>
    )   
}