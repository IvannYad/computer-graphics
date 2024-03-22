import { Button, Form } from "antd";
import "./SerpinskiyTriangleCreateForm.scss"
import NumberInput from "../../../../app/common/components/number-input/NumberInput";

type SerpinskiyTriangleCreateFormProps = {
    isOpen: boolean;
}

export default function SerpinskiyTriangleCreateForm({ isOpen }: SerpinskiyTriangleCreateFormProps){
    const [form] = Form.useForm();
    function onFormSubmit(){
        form.validateFields();
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
                    <NumberInput name="x1" label="X1" min={-20.00} max={20.00}/>
                    <NumberInput name="y1" label="Y1" min={-10.00} max={10.00}/>
                </div>
                <div className="input-row">
                    <NumberInput name="x2" label="X2" min={-20.00} max={20.00}/>
                    <NumberInput name="y2" label="Y2" min={-10.00} max={10.00}/>
                </div>
                <div className="input-row">
                    <NumberInput name="x3" label="X3" min={-20.00} max={20.00}/>
                    <NumberInput name="y3" label="Y3" min={-10.00} max={10.00}/>
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