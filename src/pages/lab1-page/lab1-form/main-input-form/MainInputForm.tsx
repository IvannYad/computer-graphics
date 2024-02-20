import { Button, Form, Input } from "antd";
import "./MainInputForm.scss"
import CoordinateInput from "./coordinate-input/CoordinateInput";
import FigureComplex from "../../../../classes/lab1-classes/FigureComplex";
import { FigureComplexesContext } from "../../Lab1Page";
import { useContext } from "react";

export default function MainInputForm(){
    const [form] = Form.useForm();
    const figureComplexesState = useContext(FigureComplexesContext);
    function onFormSubmit(){
        const figureName = form.getFieldValue("figureName");
        const topLeftX = form.getFieldValue("topLeftX");
        const topLeftY = form.getFieldValue("topLeftY");
        const bottomRightX = form.getFieldValue("bottomRightX");
        const bottomRightY = form.getFieldValue("bottomRightY");

        const sideX = bottomRightX - topLeftX;
        const sideY = bottomRightY - topLeftY;
        if(sideX !== sideY){
            alert("Your figure is not a square! Try again");
            return;
        }
        
        const newFigure = new FigureComplex(figureName, topLeftX, topLeftY, sideX, "black");
        console.log(newFigure);
        figureComplexesState?.setFigureComplexes([
            ...figureComplexesState.figureComplexes,
            newFigure
        ]);
    }

    return (
        <>
            <Form
                    layout="vertical"
                    className="create-figure-form" 
                    onFinish={() => onFormSubmit()}
                    form={form}
                    >
                    <Form.Item
                        className="figure-name-input-holder"
                        name="figureName"
                        label="Figure Name"
                        initialValue={""}
                        rules={
                            [
                                { 
                                    required: true, message: 'Please input the figure name!' 
                                },
                            ]
                        }
                    >
                        <Input 
                            className="input"
                            placeholder="bob..."
                        />
                    </Form.Item>
                    <div className="coordinate-input-row">
                        <div className="coordinate-input-holder">
                            <CoordinateInput name="topLeftX" label="Top-left corner( X )" initialValue={null}></CoordinateInput>
                        </div>
                        <div className="coordinate-input-holder">
                            <CoordinateInput name="topLeftY" label="Top-left corner( Y )" initialValue={null}></CoordinateInput>
                        </div>
                    </div>
                    <div className="coordinate-input-row">
                        <div className="coordinate-input-holder">
                            <CoordinateInput name="bottomRightX" label="Bottom-right corner( X )" initialValue={null}></CoordinateInput>
                        </div>
                        <div className="coordinate-input-holder">
                            <CoordinateInput name="bottomRightY" label="Bottom-right corner( Y )" initialValue={null}></CoordinateInput>
                        </div>
                    </div>
                    <Form.Item className="lab1-create-button-holder">
                        <Button htmlType="submit" className="lab1-create-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
        </>
    )   
}
