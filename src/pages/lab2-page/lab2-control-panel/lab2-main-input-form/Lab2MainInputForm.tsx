import { Button, Form, Switch } from "antd";
import "./Lab2MainInputForm.scss"
import TextArea from "antd/es/input/TextArea";
import { PointType } from "../../../../classes/figure-primitives/Point";
import BezierCurveFigureComplex from "../../../../classes/lab2-classes/BezierCurveFigureComplex";
import BezierCurveMatrixFormulaProcessor from "../../../../classes/lab2-classes/BezierCurveMatrixFormulaProcessor";

type Lab2MainInputFormProps = {
    setBezierCurve: React.Dispatch<React.SetStateAction<BezierCurveFigureComplex | undefined>>;
}

export default function Lab2MainInputForm({ setBezierCurve }: Lab2MainInputFormProps){
    const [form] = Form.useForm();
    function onFormSubmit(){
        form.validateFields();
        console.log(form.getFieldsValue());
        let controlPoints: PointType[];

        try {
            controlPoints = (form.getFieldValue("coordinates") as string)
            .split("\n")
            .map(elem => {
                const stringX = elem.split(";")[0];
                const stringY = elem.split(";")[1];
                if(!stringX || !stringY){
                    throw new Error("You entered wrong data. TRY AGAIN!");
                }

                const x = Number(stringX);
                const y = Number(stringY);
                if((x !== x) || (y !== y)){
                    throw new Error("You entered wrong data. TRY AGAIN!");
                }

                const point: PointType = {
                    x: Number(elem.split(";")[0]),
                    y: Number(elem.split(";")[1]),
                }
                return point;
            });
        } catch (error) {
            alert(error);
            return;
        }
        
        if(controlPoints.length < 2){
            alert("You must enter minimum 2 coordinates");
            return;
        }

        if(controlPoints.find(point => point.x > 20 || point.x < -20)){
            alert("X must be [ -20 ; 20 ]");
            return;
        }

        if(controlPoints.find(point => point.y > 10 || point.y < -10)){
            alert("Y must be [ -10 ; 10 ]");
            return;
        }

        const curvePoints = BezierCurveMatrixFormulaProcessor.GetCurvePoints(40, controlPoints);
        const bezierCurve = new BezierCurveFigureComplex(controlPoints, curvePoints);
        console.log(controlPoints);
        setBezierCurve(bezierCurve);
    }

    return (
        <>
            <Form
                layout="vertical"
                className="create-curve-form"
                onFinish={() => onFormSubmit()}
                form={form}
                >
                <Form.Item
                    className="coordinates-input-holder"
                    name="coordinates"
                    label="Coordinates"
                    initialValue={""}
                    rules={
                        [
                            { 
                                required: true, message: 'Please input the coordinates!' 
                            }
                        ]
                    }
                >
                    <TextArea
                        rows={7}
                        className="coordinate-input input"
                        placeholder="12;2"
                    />
                </Form.Item>
                <div className="lab2-create-button-holder">
                    <div className="lab2-switch-holder">
                        Parameter
                        <Form.Item name="sw" initialValue={false}>
                            <Switch onChange={() => console.log(form.getFieldsValue())}></Switch>
                        </Form.Item>
                        Matrix
                    </div>
                    <Button htmlType="submit" className="lab2-create-button">
                        Create
                    </Button>
                </div>
            </Form>
        </>
    )   
}
