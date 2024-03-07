import { Form, Input } from "antd";

type CoordinateInputProps = {
    name: string;
    label: string;
    initialValue: number | null;
    axis: "x" | "y";
}

export default function CoordinateInput({name, label, initialValue, axis}: CoordinateInputProps){
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
                            if(axis === "x"){
                                if(!value || (getFieldValue(name) >= -20.00 && getFieldValue(name) <= 20.00)){
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("X Coordinate must be in [-20.00; 20.00]"));
                            }

                            if(!value || (getFieldValue(name) >= -10.00 && getFieldValue(name) <= 10.00)){
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("Y Coordinate must be in [-10.00; 10.00]"));
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