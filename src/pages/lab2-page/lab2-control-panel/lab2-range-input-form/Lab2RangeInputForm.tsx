import { Button, Form, Input } from "antd";
import "./Lab2RangeInputForm.scss"
import RangeBoundInput from "./range-bound-input/RangeBoundInput";
import BezierCurveFigureComplex from "../../../../classes/lab2-classes/BezierCurveFigureComplex";
import BezierCurvePointsFromRangeGetter from "../../../../classes/lab2-classes/BezierCurvePointsFromRangeGetter";
import { PointType } from "../../../../classes/figure-primitives/Point";
import { useState } from "react";
import BezierCurvePointsInRangeCoordinatesModal from "../../../../app/common/components/modals/bezier-curve-points-in-range-coordinates-modal/BezierCurvePointsInRangeCoordinatesModal";


type Lab2RangeInputFormProps = {
    bezierCurve: BezierCurveFigureComplex | undefined;
}

export default function Lab2RangeInputtForm({ bezierCurve }: Lab2RangeInputFormProps){
    const [form] = Form.useForm();
    const [pointsInRange, setPointsInRange] = useState<PointType[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function onFormSubmit(){
        if(!bezierCurve){
            alert("You haven't entered curve!");
            return;
        }
        form.validateFields();
        const {
            lowerBound,
            upperBound,
            pointsCount,
        } = form.getFieldsValue();
        if(form.getFieldValue("lowerBound") >= form.getFieldValue("upperBound")){
            alert("Lower bound cannot be greater than upper bound");
            return;
        }

        try {
            const points = BezierCurvePointsFromRangeGetter
                .GetPoints(lowerBound, upperBound, pointsCount, bezierCurve.GetCurvePointTypes());
            setPointsInRange(() => points);
            setIsModalOpen(true);
        } catch (error) {
            alert(error);
            return;
        }
    }

    return (
        <>
            <Form
                layout="vertical"
                className="range-bounds-form"
                onFinish={() => onFormSubmit()}
                form={form}
                >
                <div className="range-bounds-input-form-row">
                    <div className="range-bounds-input-holder">
                        <RangeBoundInput name="lowerBound" label="Lower bound" initialValue={null} ></RangeBoundInput>
                    </div>
                    <div className="range-bounds-input-holder">
                        <RangeBoundInput name="upperBound" label="Upper bound" initialValue={null} ></RangeBoundInput>
                    </div>
                </div>
                <div className="range-bounds-input-form-row">
                <Form.Item
                    className="range-bounds-input-holder"
                    name={"pointsCount"}
                    label={"Number of points"}
                    initialValue={0.00}
                    rules={
                        [
                            { 
                                required: true, message: 'Please input the bound!' 
                            }
                        ]
                    }
                >
                    <Input 
                        className="input"
                        type="number"
                        step={0.01}
                        min={1}
                        max={100}
                    />
                </Form.Item>
                    <Button htmlType="submit" className="range-bounds-input-holder range-form-submit-button">
                        Calculate
                    </Button>
                </div>
            </Form>
            < BezierCurvePointsInRangeCoordinatesModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} points={pointsInRange}/>
        </>
    )   
}
