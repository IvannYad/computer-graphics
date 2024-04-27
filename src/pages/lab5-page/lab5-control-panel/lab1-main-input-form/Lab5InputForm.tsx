import { Button, Form } from "antd";
import "./Lab5InputForm.scss"
import CoordinateInput from "./coordinate-input/CoordinateInput";
import NumberInput from "../../../../app/common/components/number-input/NumberInput";
import Lab5Square from "../../../../classes/figure-primitives/Lab5Square";
import LABS_CONSTANTS from "../../../../app/common/constants/labs-constants";
import ResetCanvas from "../../../../classes/canvas/ResetCanvas";

type Lab5InputFormProps = {
    canvasId: string;
    setSquare: React.Dispatch<React.SetStateAction<Lab5Square | null>>;
    canvasContext: CanvasRenderingContext2D | null;
};

export default function Lab5InputForm({ canvasId, setSquare, canvasContext }: Lab5InputFormProps){
    const [form] = Form.useForm();
    function onFormSubmit(){
        if (canvasContext) {
            ResetCanvas(canvasContext, canvasId);
            const centralX = form.getFieldValue("centralX");
            const centralY = form.getFieldValue("centralY");
            const side = form.getFieldValue("side");
            const angle = form.getFieldValue("angle");
            const anchorPoint = +form.getFieldValue("anchorPoint");
            const scale = form.getFieldValue("scale");
            
            const newSquare = new Lab5Square(LABS_CONSTANTS.LAB1.SINGLE_SEGMENT, +centralX, +centralY, +side, +angle, anchorPoint - 1, +scale);
            setSquare(newSquare);
        }
    }

    return (
        <>
            <Form
                    layout="vertical"
                    className="create-figure-form" 
                    onFinish={() => onFormSubmit()}
                    form={form}
                    >
                    <div className="coordinate-input-row">
                        <div className="coordinate-input-holder">
                            <CoordinateInput name="centralX" label="X center" initialValue={null} axis="x"></CoordinateInput>
                        </div>
                        <div className="coordinate-input-holder">
                            <CoordinateInput name="centralY" label="Y center" initialValue={null} axis="y"></CoordinateInput>
                        </div>
                    </div>
                    <div className="coordinate-input-row">
                        <div className="coordinate-input-holder">
                            <NumberInput name="side" label="Side" min={0} max={10}></NumberInput>
                        </div>
                        <div className="coordinate-input-holder">
                            <NumberInput name="angle" label="Angle" min={0} max={360}></NumberInput>
                        </div>
                    </div>
                    <div className="input-row">
                        <NumberInput name="anchorPoint" label="Anchor Point" min={1} max={4} />
                        <NumberInput name="scale" label="Scale" min={-10} max={10} />
                    </div>
                    <Form.Item className="lab1-create-button-holder">
                        <Button htmlType="submit" className="lab1-create-button">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
        </>
    )   
}
