import "./Lab3ControlPanel.scss"

// type Lab3ControlPanelProps = {
//    hello: string 
// };

export default function Lab3ControlPanel(){
    return (
        <div>
            <h2 className="lab3-title">Lab3</h2>
            <div className="control-panel-element-holder">
                <button className="control-panel-button">Serpinskiy triangle</button>
            </div>
            <div className="control-panel-element-holder">
                <button className="control-panel-button">Serpinskiy carpet</button>
            </div>
            <div className="control-panel-element-holder">
                <button className="control-panel-button">Serpinskiy triangle</button>
            </div>
        </div>
    )   
}
