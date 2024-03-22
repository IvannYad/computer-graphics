import { useState } from "react";
import "./Lab3ControlPanel.scss"
import SerpinskiyTriangleCreateForm from "./serpinskiy-triangle-create-form/SerpinskiyTriangleCreateForm"

// type Lab3ControlPanelProps = {
//    hello: string 
// };

export default function Lab3ControlPanel(){
    const [isSerpTriangleFormOpen, setIsSerpTriangleFormOpen] = useState(false);

    return (
        <div>
            <h2 className="lab3-title">Lab3</h2>
            <div className="control-panel-element-holder">
                <div className="control-panel-button-holder">
                    <button className="control-panel-button" onClick={() => setIsSerpTriangleFormOpen(!isSerpTriangleFormOpen)}>Serpinskiy triangle</button>
                </div>
                <SerpinskiyTriangleCreateForm isOpen={isSerpTriangleFormOpen}/>
            </div>
            <div className="control-panel-element-holder">
                <div className="control-panel-button-holder">
                    <button className="control-panel-button">Serpinskiy triangle</button>
                </div>
            </div>
            <div className="control-panel-element-holder">
                <div className="control-panel-button-holder">
                    <button className="control-panel-button">Serpinskiy triangle</button>
                </div>
            </div>
        </div>
    )   
}
