import { Button, Form, Input, Modal } from "antd";
import "./BezierCurveMatrixFormulaInfoModal.scss"
import { useState } from "react";

type BezierCurveMatrixFormulaInfoModalProps = {
    isModalOpen: boolean;
    coefMatrix: number[][] | null;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BezierCurveMatrixFormulaInfoModal({ isModalOpen, coefMatrix, setIsModalOpen }: BezierCurveMatrixFormulaInfoModalProps){
    const [form] = Form.useForm();
    const [numberZeros, setnumberZeros] = useState(-1);
    const [chosenColumn, setChosenColumn] = useState(-1);
    
    function onChoseCOlumnFormSubmitHandler(){
        form.validateFields();
        setChosenColumn(() => form.getFieldValue("column"));
    }

    return (
        <Modal 
            title="Matrix info"
            open={isModalOpen} 
            centered={true}
            onCancel={() => {
                form.resetFields();
                setIsModalOpen(false);
                setChosenColumn(-1);
                setnumberZeros(-1);
            }}
            className="bezier-curve-matrix-info-modal"
            footer={() => (
                <></>
            )}
        >
            {!coefMatrix ? <div className="empty-matrix-message-holder">Empty matrix</div> : 
                <>
                    <div className="coef-matrix-holder">
                        <table>
                            <thead></thead>
                            <tbody>
                                {coefMatrix.map(row => {
                                    return (
                                        <tr key={row[0]}>
                                            {
                                                row.map((cell, index) => {
                                                    return (
                                                        <td key={index} className={`matr-element ${index + 1 == chosenColumn ? "red" : ""}`}>{cell}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="matr-info-form-holder">
                        <Form
                        layout="vertical"
                        className="matr-info-form"
                        onFinish={() => onChoseCOlumnFormSubmitHandler()}
                        form={form}
                        >
                            <Form.Item
                                    className="column-input-holder"
                                    name="column"
                                    label="Column"
                                    initialValue={""}
                                    rules={
                                        [
                                            { 
                                                required: true, message: 'Please the column !' 
                                            },
                                        ]
                                    }
                                >
                                    <Input 
                                        className="input"
                                        type="number"
                                        min={1}
                                        max={coefMatrix.length}
                                        step={1}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit" className="choose-column-submit-button">
                                        Display
                                    </Button>
                                </Form.Item>
                        </Form>
                        <div className="number-zeros-info-holder">
                            <div className="zero-count-display">{numberZeros === -1 ? "" : numberZeros}</div>
                            <Button className="count-zeros-button" onClick={() => setnumberZeros((coefMatrix.length * (coefMatrix.length - 1)) / 2)}>Count '0'</Button>
                        </div>
                    </div>
                </>
            }
        </Modal>
    )   
}