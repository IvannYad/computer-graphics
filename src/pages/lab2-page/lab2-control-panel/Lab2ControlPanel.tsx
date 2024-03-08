import BezierCurveFigureComplex from "../../../classes/lab2-classes/BezierCurveFigureComplex";
import "./Lab2ControlPanel.scss"
import Lab2MainInputForm from "./lab2-main-input-form/Lab2MainInputForm"

type Lab2ControlPanelProps = {
    setBezierCurve: React.Dispatch<React.SetStateAction<BezierCurveFigureComplex | undefined>>;
}

export default function Lab2ControlPanel({ setBezierCurve }: Lab2ControlPanelProps){
    return (
        <div>
            <h2 className="lab2-title">Lab2</h2>
            <Lab2MainInputForm setBezierCurve={setBezierCurve}/>
        </div>
    )   
}
