import "./Lab1Page.scss"
import Canvas from "./canvas/Canvas"
import Lab1Form from "./lab1-form/Lab1Form"

export default function Lab1Page(){
    return (
        <div className="page lab1-page">
            <div className="lab1-page-flex-grid">
                <div className="lab1-page-grid-element lab1-page-grid-element-canvas">
                    <Canvas></Canvas>
                </div>
                <div className="lab1-page-grid-element lab1-page-grid-element-form">
                    <Lab1Form></Lab1Form>
                </div>
            </div>
        </div>
    )   
}