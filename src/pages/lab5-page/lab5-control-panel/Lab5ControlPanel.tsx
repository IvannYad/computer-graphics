import { useEffect, useState } from "react";
import "./Lab5ControlPanel.scss"
import Lab5InputForm from "./lab1-main-input-form/Lab5InputForm";
import Lab5Square from "../../../classes/figure-primitives/Lab5Square";
import getCanvasContext from "../../../classes/canvas/getCanvasContext";
import { CgPlayButtonO } from "react-icons/cg";
import { FaPause } from "react-icons/fa6";
import { Button, Slider, Switch } from "antd";
import saveAs from "file-saver";

// type Lab3ControlPanelProps = {
//    hello: string 
// };

export default function Lab5ControlPanel(){
    const canvasId = "lab5-canvas";
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [square, setSquare] = useState<Lab5Square | null>(null);
    const [animationPlaying, setAnimationPlaying] = useState<boolean>(false);
    const [singleSegment, setSingleSegment] = useState(1);

    useEffect(() => {
        setContext(getCanvasContext(canvasId));
    }, []);

    useEffect(() => {
        if (context) {
            square?.drawSquare(context);
        }
    }, [square]);

    const handleTransformation = () => {
        if (square) {
            const squareWithTransformation = Object.create(square);
            squareWithTransformation.performTransformation();
            setSquare(squareWithTransformation);
        }
    }

    const handleChangeSIgnleSegment = () => {
        if (square) {
            const squareWithTransformation = Object.create(square) as Lab5Square;
            squareWithTransformation.setSingleSegment(singleSegment);
            setSquare(squareWithTransformation);
        }
    };

    const handlePlayAnimation = () => {
        if (animationPlaying) {
            if (square) {
                square.stopAnimation(context);
                setAnimationPlaying(false);
            }

            return;
        }

        if (square && context) {
            square.playAnimation(context);
            setAnimationPlaying(true);
        }
    }

    const handleSwitchChange = (checked: boolean) => {
        if (square) {
            const squareWithTransformation = Object.create(square) as Lab5Square;
            square.setIsBackwardAnimationPlay(checked);
            setSquare(squareWithTransformation);
        }
    }

    const handleSaveMatrix = () => {
        if (square) {
            const matrix = square.getMatrixString();
            const file = new Blob([matrix], { type: 'text/plain;charset=utf-8' });
            saveAs(file, 'affine_matrix.txt');
        }
    }

    const handleSave = () => {
        const canvasId = "lab5-canvas";
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const dataURL = canvas.toDataURL("png", 1);
        
        const a  = document.createElement('a');
        a.href = dataURL;
        a.download = 'lab5Image.png';
        a.click();
    }

    return (
        <div>
            <h2 className="lab5-title">Lab5</h2>
            <Lab5InputForm canvasId={canvasId} setSquare={setSquare} canvasContext={context}/>
            <Button className="button perform-transformation-button" onClick={handleTransformation}>Perform transformation</Button>
            <div className="play-animation-holder">
                Normal<Switch onChange={handleSwitchChange}></Switch>Reverse
                <Button className="button play-animation-button perform-transformation-button" onClick={handlePlayAnimation}>{
                    !animationPlaying ? <CgPlayButtonO size={24}/> : <FaPause size={24}/>
                }</Button>
            </div>
            <div className="control-panel-slider-holder">
                <Slider min={0} max={10} step={0.1} value={singleSegment} onChange={(newValue) => setSingleSegment(newValue)}/>
                <button className="control-panel-button" onClick={handleChangeSIgnleSegment}>Change signle segment</button>
            </div>
            <Button className="button perform-transformation-button" onClick={handleSaveMatrix}>Save matrix</Button>
            <Button className="button perform-transformation-button" onClick={() => handleSave()}>Save</Button>
        </div>
    )   
}
