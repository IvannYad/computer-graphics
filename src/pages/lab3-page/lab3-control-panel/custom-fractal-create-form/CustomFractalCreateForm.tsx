import { Button, Form } from "antd";
import "./CustomFractalCreateForm.scss"
import useFractalsDrawersContext from "../../../../hooks/useFractalsDrawersContext";
import getCanvasContext from "../../../../classes/canvas/getCanvasContext";
import NumberInput from "../../../../app/common/components/number-input/NumberInput";
import { useEffect, useState } from "react";
type CustomFractalCreateFormProps = {
    isOpen: boolean;
}

export default function CustomFractalCreateForm({ isOpen }: CustomFractalCreateFormProps){
    const [form] = Form.useForm();
    const { customFractalDrawer } = useFractalsDrawersContext();
    const [zoom, setZoom] = useState(1);
    const [moveX, setMoveX] = useState(0);
    const [moveY, setMoveY] = useState(0);
    async function onFormSubmit(){
        form.validateFields();

        const canvasId = "lab3-canvas";
        
        setZoom(1);
        setMoveX(0);
        setMoveY(0);
        const context = getCanvasContext(canvasId);
        customFractalDrawer.SetParameters(context,
            +form.getFieldValue("maxIterations"),
            +form.getFieldValue("bound"), {
                real: +form.getFieldValue("cRe"),
                imag: +form.getFieldValue("cIm"),
            }, zoom, moveX, moveY);

        customFractalDrawer.Draw();
    }

    useEffect(() => {
        const canvasId = "lab3-canvas";
        form.validateFields();

        const context = getCanvasContext(canvasId);
        customFractalDrawer.SetParameters(context,
            +form.getFieldValue("maxIterations"),
            +form.getFieldValue("bound"), {
                real: +form.getFieldValue("cRe"),
                imag: +form.getFieldValue("cIm"),
            }, zoom, moveX, moveY);

        customFractalDrawer.Draw();
    }, [zoom, moveX, moveY]);

    if (!isOpen) {
        return (
            <>
            </>
        )
    }

    return (
        <>

            <Form
                layout="vertical"
                className="custom-fractal-create-form"
                onFinish={() => onFormSubmit()}
                form={form}
            >
                <div className="input-row">
                    <NumberInput name="cRe" label="Const real" min={-1} max={1}/>
                    <NumberInput name="cIm" label="Const imag part" min={-1} max={1}/>
                </div>
                <div className="input-row">
                    <NumberInput name="maxIterations" label="Max Iterations" min={1} max={500}/>
                    <NumberInput name="bound" label="Bound" min={0} max={100}/>
                </div>
                <div className="input-row">
                    <Button htmlType="submit" className="form-submit-button">Draw</Button>
                </div>
            </Form>
            <div className="navigate-buttons-holder">
                <div className="input-row navigate-buttons-holder">
                        <Button className="button navigate-button" onClick={() => {
                            setMoveY(moveY - 0.5 / zoom);
                        }}>{"↑"}</Button>
                    </div>
                    <div className="input-row navigate-buttons-holder">
                        <Button className="button navigate-button" onClick={() => {
                                setMoveX(moveX - 0.5 / zoom);
                            }}>{"←"}</Button>
                            <Button className="button navigate-button" onClick={() => {
                                setMoveY(moveY + 0.5 / zoom);
                            }}>{"↓"}</Button>
                            <Button className="button navigate-button" onClick={() => {
                                setMoveX(moveX + 0.5 / zoom);
                            }}>{"→"}</Button>
                </div>
                <div className="input-row navigate-buttons-holder">
                    <Button className="button zoom-button" onClick={() => {
                        setZoom(zoom * 1.3);
                    }}>+</Button>
                    <Button className="button zoom-button" onClick={() => {
                        setZoom(zoom / 1.3);
                    }}>-</Button>
                </div>
            </div>
        </>
    )   
}