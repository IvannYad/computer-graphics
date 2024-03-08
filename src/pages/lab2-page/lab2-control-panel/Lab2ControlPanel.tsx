import { Button } from "antd";
import BezierCurveFigureComplex from "../../../classes/lab2-classes/BezierCurveFigureComplex";
import "./Lab2ControlPanel.scss"
import Lab2MainInputForm from "./lab2-main-input-form/Lab2MainInputForm"
import BezierCurveMatrixFormulaInfoModal from "../../../app/common/components/modals/bezier-curve-matrix-formula-info-modal/BezierCurveMatrixFormulaInfoModal";
import { useState } from "react";
import BezierCurveMatrixFormulaProcessor from "../../../classes/lab2-classes/BezierCurveMatrixFormulaProcessor";

type Lab2ControlPanelProps = {
    setBezierCurve: React.Dispatch<React.SetStateAction<BezierCurveFigureComplex | undefined>>;
    bezierCurve: BezierCurveFigureComplex | undefined;
}

export default function Lab2ControlPanel({ setBezierCurve, bezierCurve }: Lab2ControlPanelProps){
    const [isModalOpen, setIsModalOpen] = useState(false);
    let coefMatrix: number[][] | null = null;
    if(bezierCurve){
        coefMatrix = BezierCurveMatrixFormulaProcessor.GetMatrixOfCoeficients(bezierCurve.GetControlPoints().length);
    }
    return (
        <div>
            <h2 className="lab2-title">Lab2</h2>
            <Lab2MainInputForm setBezierCurve={setBezierCurve}/>
            <Button className="show-matrix-info-button" onClick={() => setIsModalOpen(true)}>Show matrix info</Button>
            <BezierCurveMatrixFormulaInfoModal isModalOpen={isModalOpen} coefMatrix={coefMatrix} setIsModalOpen={setIsModalOpen}/>
        </div>
    )   
}