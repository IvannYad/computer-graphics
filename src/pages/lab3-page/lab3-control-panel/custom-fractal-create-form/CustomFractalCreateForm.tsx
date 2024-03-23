import { Button, Form } from "antd";
import "./CustomFractalCreateForm.scss"
import useFractalsDrawersContext from "../../../../hooks/useFractalsDrawersContext";
import getCanvasContext from "../../../../classes/canvas/getCanvasContext";
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
        customFractalDrawer.SetParameters(context, 200, {
            real: 1,
            imag: 1
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
                    <Button htmlType="submit" className="form-submit-button">Draw</Button>
                </div>
            </Form>
        </>
    )   
}