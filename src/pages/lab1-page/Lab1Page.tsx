import { createContext, useState } from "react"
import "./Lab1Page.scss"
import Canvas from "./canvas/Canvas"
import Lab1Form from "./lab1-form/Lab1Form"
import FigureComplex from "../../classes/lab1-classes/FigureComplex"

export type FigureComplexesState = {
    figureComplexes: FigureComplex[];
    setFigureComplexes: React.Dispatch<React.SetStateAction<FigureComplex[]>>;
}

export type CurrentIndexState = {
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const CanvasIdContext = createContext<string>('');
export const FigureComplexesContext = createContext<FigureComplexesState | null>(null);
export const CurrentIndexContext = createContext<CurrentIndexState | null>(null);

export default function Lab1Page(){
    const [figureComplexes, setFigureComplexes] = useState<FigureComplex[]>([ new FigureComplex("bob", 100, 100, 140, "red")]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const canvasId = "lab1-canvas";

    return (
        <CanvasIdContext.Provider value={canvasId}>
            <FigureComplexesContext.Provider value={
                {
                    figureComplexes: figureComplexes,
                    setFigureComplexes: setFigureComplexes
                }
            }>
                <CurrentIndexContext.Provider value={
                    {
                        currentIndex: currentIndex,
                        setCurrentIndex: setCurrentIndex
                    }
                }>
                    <div className="page lab1-page">
                        <div className="lab1-page-flex-grid">
                            <div className="lab1-page-grid-element lab1-page-grid-element-canvas">
                                <Canvas figures={figureComplexes}></Canvas>
                            </div>
                            <div className="lab1-page-grid-element lab1-page-grid-element-form">
                                <Lab1Form></Lab1Form>
                            </div>
                        </div>
                    </div>
                </CurrentIndexContext.Provider>
            </FigureComplexesContext.Provider>
        </CanvasIdContext.Provider>
    )   
}