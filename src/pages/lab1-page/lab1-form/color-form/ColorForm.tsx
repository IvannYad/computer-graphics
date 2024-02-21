import { Button, Form, Input } from "antd"
import "./ColorForm.scss"
import { useContext } from "react";
import { CurrentIndexContext, FigureComplexesContext } from "../../Lab1Page";

export default function ColorForm(){
    const [form] = Form.useForm();
    const figureComplexesState = useContext(FigureComplexesContext);
    const currentIndexState = useContext(CurrentIndexContext);


    function onFormSubmit(){
        const newColor = form.getFieldValue("borderColor");
        const figures = figureComplexesState?.figureComplexes;
        if(!figures || figures.length === 0){
            alert("You don`t add any figures on canvas");
            return;
        }
        const currentIndex = currentIndexState?.currentIndex;
        figures![currentIndex!].updateColor(newColor);
        figureComplexesState?.setFigureComplexes([
            ...figures!
        ])
    }

    return (
        <>
            <Form
            layout="vertical"
            className="apply-color-form" 
            onFinish={() => onFormSubmit()}
            form={form}
            >
                <div className="color-form-row">
                    <Form.Item
                        className="color-form-element-holder"
                        name="borderColor"
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
