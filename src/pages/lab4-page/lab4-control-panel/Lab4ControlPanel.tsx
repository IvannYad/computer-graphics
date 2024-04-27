import { Button, Form, Slider } from "antd";
import getCanvasContext from "../../../classes/canvas/getCanvasContext";
import RGBtoXYZ from "../../../functions/ConvertRGBtoXYZ";
import XYZtoRGB from "../../../functions/ConvertXYZtoRGB";
import "./Lab4ControlPanel.scss"
import { useState } from "react";
import RGBtoHSV from "../../../functions/ConvertRGBtoHSV";
import HSVtoRGB from "../../../functions/ConvertHSVtoRGB";
import { saveAs } from 'file-saver';
import Round from "../../../functions/Round";
import NumberInput from "../../../app/common/components/number-input/NumberInput";

// type Lab3ControlPanelProps = {
//    hello: string 
// };
export type coordinates = {
    x: number,
    y: number,
}

type Lab4ControlPanelProps = {
    coordOne: coordinates | null;
    widthHeight: coordinates | null;
    setCoordOne: React.Dispatch<React.SetStateAction<coordinates | null>>;
    setWidthHeight: React.Dispatch<React.SetStateAction<coordinates | null>>;
}
export default function Lab4ControlPanel({ coordOne, widthHeight, setCoordOne, setWidthHeight}: Lab4ControlPanelProps){
    const canvasId = "lab4-canvas";
    const [form] = Form.useForm();
    const [value, setValue] = useState(0);

    const handleDisplayInXYZ = () => {
        const img = new Image(); // Create new img element
        img.onload = function(){
            const canvasContext = getCanvasContext(canvasId);
            canvasContext.canvas.width = img.width;
            canvasContext.canvas.height = img.height;
            canvasContext.drawImage(img, 0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            const imgData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                const [X, Y, Z] = RGBtoXYZ([imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]]);
                const [R, G, B] = XYZtoRGB([X, Y, Z]);
                imgData.data[i] = R;
                imgData.data[i + 1] = G;
                imgData.data[i + 2] = B;
            }
            canvasContext.putImageData(imgData, 0, 0);
            alert("Done");
        };
        img.src = "../../../public/image.png";
    }

    const handleDisplayInCustomXYZ = () => {
        const img = new Image(); // Create new img element
        img.onload = function(){
            const canvasContext = getCanvasContext(canvasId);
            canvasContext.canvas.width = img.width;
            canvasContext.canvas.height = img.height;
            canvasContext.drawImage(img, 0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            const imgData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                const [X, Z] = RGBtoXYZ([imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]]);
                const [R, G, B] = XYZtoRGB([X, 0, Z]);
                imgData.data[i] = R;
                imgData.data[i + 1] = G;
                imgData.data[i + 2] = B;
            }
            canvasContext.putImageData(imgData, 0, 0);
            alert("Done");
        };
        img.src = "../../../public/image.png";
    }

    const handleChangeVforDarkGreen = () => {
        const img = new Image(); // Create new img element
        img.onload = function(){
            const canvasContext = getCanvasContext(canvasId);
            canvasContext.canvas.width = img.width;
            canvasContext.canvas.height = img.height;
            canvasContext.drawImage(img, 0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            const imgData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
            for (let i = 0; i < imgData.data.length; i += 4) {
                if (coordOne && widthHeight) {
                    if ((i / 4) % canvasContext.canvas.width >= coordOne.x && 
                        (i / 4) % canvasContext.canvas.width <= +coordOne.x + +widthHeight.x &&
                        Math.floor((i / 4) / canvasContext.canvas.height) >= coordOne.y && 
                        Math.floor((i / 4) / canvasContext.canvas.height) <= +coordOne.y + +widthHeight.y) {
                        if (imgData.data[i + 1] >= 90 && 
                            imgData.data[i + 1] <= 130 &&
                            imgData.data[i] < 50 &&
                            imgData.data[i + 2] < 50) {
                            const[H, S] = RGBtoHSV([imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]]);
                            const [R, G, B] = HSVtoRGB([H, S, value]);
                            imgData.data[i] = R;
                            imgData.data[i + 1] = G;
                            imgData.data[i + 2] = B;
                        }
                    }
                } else {
                    if (imgData.data[i + 1] >= 90 && 
                        imgData.data[i + 1] <= 130 &&
                        imgData.data[i] < 50 &&
                        imgData.data[i + 2] < 50) {
                        const[H, S] = RGBtoHSV([imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]]);
                        const [R, G, B] = HSVtoRGB([H, S, value]);
                        imgData.data[i] = R;
                        imgData.data[i + 1] = G;
                        imgData.data[i + 2] = B;
                    }
                }
            }

            canvasContext.putImageData(imgData, 0, 0);
            if (coordOne && widthHeight) {
                canvasContext.strokeStyle = 'red';
                canvasContext.rect(coordOne.x, coordOne.y, widthHeight.x, widthHeight.y);
                canvasContext.stroke();
            }
            alert("Done");
        };
        img.src = "../../../public/image.png";
    }

    function handleSave() {
        const canvasId = "lab4-canvas";
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const dataURL = canvas.toDataURL("png", 1);
        
        const a  = document.createElement('a');
        a.href = dataURL;
        a.download = 'image.png';
        a.click();
    }

    function handleSaveCoordinates() {
        const canvasContext = getCanvasContext(canvasId);
        const imgData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
        let rows: string = '';
        console.log(imgData.data.length);
        for (let i = 0; i < imgData.data.length; i += 4) {
            const [R, G, B] = [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]];
            const [X, Y, Z] = RGBtoXYZ([R, G, B]);
            const [H, S, V] = RGBtoHSV([R, G, B]);

            rows += `Pixel №${i / 4} : (R, G, B):(${R}, ${G}, ${B}) --> (X, Y, Z):(${Round(X, 3)}, ${Round(Y, 3)}, ${Round(Z, 3)}) --> (H, S, V):(${Round(H * 360, 3)}°, ${Round(S * 100, 3)}%, ${Round(V * 100, 3)}%)\n`;
        }

        const file = new Blob([rows], { type: 'text/plain;charset=utf-8' });
        saveAs(file, 'colors_coordinates.txt');
    }

    async function onFormSubmit(){
        form.validateFields();

        setCoordOne({
            x: form.getFieldValue('x'),
            y: form.getFieldValue('y'),
        });

        setWidthHeight({
            x: form.getFieldValue('xSide'),
            y: form.getFieldValue('ySide'),
        });
    }

    return (
        <div>
            <h2 className="lab4-title">Lab4</h2>
            <div className="control-panel-element-holder">
                <div className="control-panel-button-holder">
                    <button className="control-panel-button" onClick={handleDisplayInXYZ}>Display in XYZ</button>
                </div>
            </div>
            <div className="control-panel-element-holder">
                <div className="control-panel-button-holder">
                    <button className="control-panel-button" onClick={handleDisplayInCustomXYZ}>Display in custom XYZ</button>
                </div>
            </div>
            <div className="control-panel-element-holder">
                <div className="control-panel-slider-holder">
                <Form
                    layout="vertical"
                    className="serpinskiy-triangle-create-form"
                    onFinish={() => onFormSubmit()}
                    form={form}
                >
                    <div className="input-row">
                        <NumberInput name="x" label="Top left X" min={0} max={620.00}/>
                        <NumberInput name="y" label="Top left Y" min={0} max={620.00}/>
                    </div>
                    <div className="input-row">
                        <NumberInput name="xSide" label="X side" min={1} max={620.00}/>
                        <NumberInput name="ySide" label="Y side" min={1} max={620.00}/>
                    </div>
                    <div className="input-row">
                        <Button htmlType="submit" className="form-submit-button">Select area</Button>
                    </div>
                </Form>
                    <Slider min={0} max={1} step={0.01} value={value} onChange={(newValue) => setValue(newValue)}/>
                    <button className="control-panel-button" onClick={handleChangeVforDarkGreen}>Change V for 'dark green'</button>
                </div>
            </div>
            <div className="control-panel-element-holder">
                <div className="control-panel-button-holder">
                    <Button className="button save-button" onClick={() => handleSave()}>Save</Button>
                </div>
            </div>
            <div className="control-panel-element-holder">
                <div className="control-panel-button-holder">
                    <Button className="button save-button" onClick={() => handleSaveCoordinates()}>Save coordinates</Button>
                </div>
            </div>
        </div>
    )   
}
