import { Form, Input } from "antd";

type CoordinateInputProps = {
    name: string;
    label: string;
    initialValue: number | null;
}

export default function CoordinateInput({name, label, initialValue}: CoordinateInputProps){
    return (
        <Form.Item
            className="figure-name-input-holder"
            name={name}
            label={label}
            initialValue={initialValue ?? 0.00}
            rules={
                [
                    { 
                        required: true, message: 'Please input the coordinate!' 
                    },
                    ({getFieldValue}) =>({
                        validator(_, value){
                            if(!value || (getFieldValue("topLeftX") >= -10.00 && getFieldValue("topLeftX") <= 100.00)){
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("Coordinate must be in [-10.00; 10.00]"));
                        }
                    })
                ]
            }
        >
            <Input 
                className="input"
                type="number"
                step={0.01}
            />
        </Form.Item>
    )   
}