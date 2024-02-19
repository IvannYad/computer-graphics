import { Button, Form, Input } from "antd";
import "./MainInputForm.scss"
import CoordinateInput from "./coordinate-input/CoordinateInput";

export default function MainInputForm(){
    const [form] = Form.useForm();
    return (
        <>
            <Form
                    layout="vertical"
                    className="create-figure-form" 
                    onFinish={() => {}}
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
