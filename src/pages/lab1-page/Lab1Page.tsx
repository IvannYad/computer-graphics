import { createContext, useState } from "react"
import "./Lab1Page.scss"
import Canvas from "./canvas/Canvas"
import Lab1Form from "./lab1-form/Lab1Form"
import FigureComplex from "../../classes/lab1-classes/FigureComplex"

export type FigureComplexesState = {
    figureComplexes: FigureComplex[];
    setFigureComplexes: React.Dispatch<React.SetStateAction<FigureComplex[]>>;
}

export const CanvasIdContext = createContext<string>('');
export const FigureComplexesContext = createContext<FigureComplexesState | null>(null);

export default function Lab1Page(){
    const [figureComplexes, setFigureComplexes] = useState<FigureComplex[]>([
        new FigureComplex("Bob", 100, 100, 70, "green"),
        new FigureComplex("Sam", 50, 50, 40, "yellow"),
        new FigureComplex("Any", 300, 0, 40, "red"),
    ]);
    const canvasId = "lab1-canvas";
    console.log("gegegegegegege");
    return (
        <CanvasIdContext.Provider value={canvasId}>
            <FigureComplexesContext.Provider value={
                {
                    figureComplexes: figureComplexes,
                    setFigureComplexes: setFigureComplexes
                }
            }>
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
            </FigureComplexesContext.Provider>
        </CanvasIdContext.Provider>
    )   
}