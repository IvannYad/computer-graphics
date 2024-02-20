import { Button } from "antd";
import "./ShadeButtons.scss"
import { useContext } from "react";
import { CurrentIndexContext, FigureComplexesContext } from "../../Lab1Page";

export default function ShadeButtons(){
    const figureComplexesState = useContext(FigureComplexesContext);
    const currentIndexState = useContext(CurrentIndexContext);
    
    function onVerticalShadeButtonClick(){
        const figures = figureComplexesState?.figureComplexes;
        if(!figures || figures.length === 0){
            alert("You don`t add any gigures on canvas");
            return;
        }
        const currentIndex = currentIndexState?.currentIndex;
        figures![currentIndex!].drawVerticalShades();
        figureComplexesState?.setFigureComplexes([
            ...figures!
        ])
    }

    function onHorizontalShadeButtonClick(){
        const figures = figureComplexesState?.figureComplexes;
        if(!figures || figures.length === 0){
            alert("You don`t add any gigures on canvas");
            return;
        }
        const currentIndex = currentIndexState?.currentIndex;
        figures![currentIndex!].drawHorizontalShades();
        figureComplexesState?.setFigureComplexes([
            ...figures!
        ])
    }

    return (
        <>
            <div className="shade-buttons-row">
                <div className="lab1-shade-button-holder">
                    <Button className="shade-button" onClick={() => onVerticalShadeButtonClick()}>
                        Shade |
                    </Button>
                </div>
                <div className="lab1-shade-button-holder">
                    <Button className="shade-button" onClick={() => onHorizontalShadeButtonClick()}>
                        Shade -
                    </Button>
                </div>
            </div>
            
        </>
    )   
}
