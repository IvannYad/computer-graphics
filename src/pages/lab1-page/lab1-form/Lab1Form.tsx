import { Button } from "antd"
import "./Lab1Form.scss"
import ColorForm from "./color-form/ColorForm"
import MainInputForm from "./main-input-form/MainInputForm"
import ShadeButtons from "./shade-buttons/ShadeButtons"


export default function Lab1Form(){
    return (
        <div>
            <MainInputForm></MainInputForm>
            <ShadeButtons></ShadeButtons>
            <ColorForm></ColorForm>
            <Button className="draw-circle-button">
                Draw Circle
            </Button>
        </div>
    )   
}
