import { Button, Form } from "antd";
import "./CustomFractalCreateForm.scss"
import useFractalsDrawersContext from "../../../../hooks/useFractalsDrawersContext";
import getCanvasContext from "../../../../classes/canvas/getCanvasContext";
import NumberInput from "../../../../app/common/components/number-input/NumberInput";
type CustomFractalCreateFormProps = {
    isOpen: boolean;
}

export default function CustomFractalCreateForm({ isOpen }: CustomFractalCreateFormProps){
    const [form] = Form.useForm();
    const { customFractalDrawer } = useFractalsDrawersContext();
    async function onFormSubmit(){
        const canvasId = "lab3-canvas";
        form.validateFields();

        const context = getCanvasContext(canvasId);
        customFractalDrawer.SetParameters(context, +form.getFieldValue("maxIterations"), +form.getFieldValue("bound"), {
            real: +form.getFieldValue("cRe"),
            imag: +form.getFieldValue("cIm")
        });

        customFractalDrawer.Draw();
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
        </>
    )   
}