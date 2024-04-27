import "./NumberInput.scss";
import { Form, Input } from "antd";

type CoordinateInputProps = {
    name: string;
    label: string;
    min: number;
    max: number;
}

export default function NumberInput({ name, label, min, max }: CoordinateInputProps){
    return (
        <Form.Item
            className="number-input-holder"
            name={name}
            label={label}
            initialValue={0.00}
            rules={
                [
                    { 
                        required: true, message: 'Field is required!' 
                    },
                    () =>({
                        validator(_, value){
                            if(!value || (value >= min && value <= max)){
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(`${label} must be in [${min}; ${max}]`));
                        }
                    })
                ]
            }
        >
            <Input 
                className="input"
                type="number"
                step={0.0001}
                min={min}
                max={max}
            />
        </Form.Item>
    )   
}