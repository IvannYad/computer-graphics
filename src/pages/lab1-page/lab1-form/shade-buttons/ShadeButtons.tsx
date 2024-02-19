import { Button } from "antd";
import "./ShadeButtons.scss"

export default function ShadeButtons(){
    return (
        <>
            <div className="shade-buttons-row">
                <div className="lab1-shade-button-holder">
                    <Button className="shade-button">
                        Shade |
                    </Button>
                </div>
                <div className="lab1-shade-button-holder">
                    <Button className="shade-button">
                        Shade -
                    </Button>
                </div>
            </div>
            
        </>
    )   
}
