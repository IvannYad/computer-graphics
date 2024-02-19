import "./Lab1Page.scss"
import Canvas from "./canvas/Canvas"

export default function Lab1Page(){
    return (
        <div className="page lab1-page">
            <div className="lab1-page-flex-grid">
                <div className="lab1-page-grid-element lab1-page-grid-element-canvas">
                    <Canvas></Canvas>
                </div>
                <div className="lab1-page-grid-element lab1-page-grid-element-form">
                    
                </div>
            </div>
        </div>
    )   
}