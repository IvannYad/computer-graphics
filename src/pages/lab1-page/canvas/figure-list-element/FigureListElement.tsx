import { useContext, useEffect } from "react";
import "./FigureListElement.scss"
import { Button } from "antd";
import { CurrentIndexContext, FigureComplexesContext } from "../../Lab1Page";

type FigureListElementProps = {
    figureName: string;
    figureColor: string;
    figureKey: number;
}

export default function FigureListElement({ figureName, figureColor, figureKey }: FigureListElementProps){
    console.log(figureKey);
    const figureComplexesState = useContext(FigureComplexesContext);
    const currentIndexState = useContext(CurrentIndexContext);

    useEffect(() => {
        console.log(`color-display-${figureName}`);
        const colorDisplay = document.getElementById(`color-display-${figureName}`)!;
        console.log(figureColor);
        colorDisplay.style.backgroundColor = figureColor;
    }, [figureColor])

    function onDeleteButtonClick(){
        let figures = figureComplexesState?.figureComplexes;
        figures = figures?.filter((_, index) => index !== figureKey);
        console.log(figureKey);
        console.log(figures);
        figureComplexesState?.setFigureComplexes([
            ...figures!
        ])
        currentIndexState?.setCurrentIndex(() => figures!.length - 1);
    }

    return (
      <div className="figure-list-element">
        <div className="info-holder">
            <div className="figure-name-holder">{figureName}</div>
            <div id={`color-display-${figureName}`} className="color-display"></div>
        </div>
        <Button className="delete-button" onClick={() => onDeleteButtonClick()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>
        </Button>
      </div>  
    );   
}
