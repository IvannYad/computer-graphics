import { Form, Input } from "antd";

type CoordinateInputProps = {
    name: "lowerBound" | "upperBound";
    label: string;
    initialValue: number | null;
}

export default function RangeBoundInput({name, label, initialValue }: CoordinateInputProps){
    return (
        <Form.Item
            className="range-bound-input-holder"
            name={name}
            label={label}
            initialValue={initialValue ?? 0.00}
            rules={
                [
                    { 
                        required: true, message: 'Please input the bound!' 
                    },
                    () =>({
                        validator(_, value){
                            if(!value){
                                return Promise.resolve();
                            }
                        
                            if(value < -20.00 || value >= 20.00){
                                return Promise.reject(new Error("X Coordinate must be in [-20.00; 20.00]"));
                            }

                            return Promise.resolve();
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