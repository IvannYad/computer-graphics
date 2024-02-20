import { Button } from "antd"
import "./Lab1Form.scss"
import ColorForm from "./color-form/ColorForm"
import MainInputForm from "./main-input-form/MainInputForm"
import ShadeButtons from "./shade-buttons/ShadeButtons"
import { useContext } from "react"
import { CurrentIndexContext, FigureComplexesContext } from "../Lab1Page"


export default function Lab1Form(){
    const figureComplexesState = useContext(FigureComplexesContext);
    const currentIndexState = useContext(CurrentIndexContext);

    function onDrawCircleClickHandler(){
        const figures = figureComplexesState?.figureComplexes;
        if(!figures || figures.length === 0){
            alert("You don`t add any gigures on canvas");
            return;
        }
        const currentIndex = currentIndexState?.currentIndex;
        figures![currentIndex!].drawCircle();
        figureComplexesState?.setFigureComplexes([
            ...figures!
        ])
    }

    return (
        <div>
            <MainInputForm></MainInputForm>
            <ShadeButtons></ShadeButtons>
            <ColorForm></ColorForm>
            <Button className="draw-circle-button" onClick={() => onDrawCircleClickHandler()}>
                Draw Circle
            </Button>
        </div>
    )   
}
