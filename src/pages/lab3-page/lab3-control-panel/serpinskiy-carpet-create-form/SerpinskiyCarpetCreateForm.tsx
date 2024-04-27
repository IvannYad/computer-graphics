import { Button, Form } from "antd";
import "./SerpinskiyCarpetCreateForm.scss"
import NumberInput from "../../../../app/common/components/number-input/NumberInput";
import useFractalsDrawersContext from "../../../../hooks/useFractalsDrawersContext";
import ResetCanvas from "../../../../classes/canvas/ResetCanvas";
import { RectangleCoordinatesSimplified } from "../../../../classes/lab3-classes/RectangleCoordinates";
import getCanvasContext from "../../../../classes/canvas/getCanvasContext";

type SerpinskiyCarpetCreateFormProps = {
    isOpen: boolean;
}

export default function SerpinskiyCarpetCreateForm({ isOpen }: SerpinskiyCarpetCreateFormProps){
    const [form] = Form.useForm();
    const { serpinskiyCarpetDrawer } = useFractalsDrawersContext();
    async function onFormSubmit(){
        const canvasId = "lab3-canvas";
        form.validateFields();

        const context = getCanvasContext(canvasId);

        const coordinates: RectangleCoordinatesSimplified = {
            TopLeft: {
                x: form.getFieldValue("x") * 20,
                y: form.getFieldValue("y") * -20,
            },
            xSide: form.getFieldValue("xSide") * 20,
            ySide: form.getFieldValue("ySide") * 20,
        };

        console.log(coordinates);
        ResetCanvas(context, canvasId);
        serpinskiyCarpetDrawer.SetParameters(context, coordinates, form.getFieldValue("depth"));
        await serpinskiyCarpetDrawer.DrawAsync();
    }

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
                className="serpinskiy-triangle-create-form"
                onFinish={() => onFormSubmit()}
                form={form}
            >
                <div className="input-row">
                    <NumberInput name="x" label="Top left X" min={-20.00} max={20.00}/>
                    <NumberInput name="y" label="Top left Y" min={-10.00} max={10.00}/>
                </div>
                <div className="input-row">
                    <NumberInput name="xSide" label="X side" min={1} max={40.00}/>
                    <NumberInput name="ySide" label="Y side" min={1} max={20.00}/>
                </div>
                <div className="input-row">
                    <NumberInput name="depth" label="Depth" min={1} max={20.00}/>
                </div>
                <div className="input-row">
                    <Button htmlType="submit" className="form-submit-button">Draw</Button>
                </div>
            </Form>
        </>
    )   
}