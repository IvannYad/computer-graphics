import { Button, Form, Input } from "antd"
import "./ColorForm.scss"

export default function ColorForm(){
    const [form] = Form.useForm();

    return (
        <>
            <Form
            layout="vertical"
            className="apply-color-form" 
            onFinish={() => {}}
            form={form}
            >
                <div className="color-form-row">
                    <Form.Item
                        className="color-form-element-holder"
                        name="botderColor"
                        label="Border color"
                        initialValue="#0000000"
                    >
                        <Input 
                            className="input"
                            type="color"
                        />
                    </Form.Item>
                    <div className="color-form-element-holder">
                        <div className="ant-col ant-form-item-label css-dev-only-do-not-override-1xg9z9n"></div>
                        <Button htmlType="submit" className="apply-color-button">
                            Apply color
                        </Button>
                    </div>    
                </div>    
            </Form>
            
        </>
    )   
}
