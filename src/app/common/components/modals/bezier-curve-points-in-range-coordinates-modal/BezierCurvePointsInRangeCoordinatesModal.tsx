import "./BezierCurvePointsInRangeCoordinatesModal.scss"
import { PointType } from "../../../../../classes/figure-primitives/Point";
import Round from "../../../../../functions/Round";
import { Modal } from "antd";

type BezierCurvePointsInRangeCoordinatesModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    points: PointType[] | undefined;
}

export default function BezierCurvePointsInRangeCoordinatesModal({ isModalOpen, setIsModalOpen, points }: BezierCurvePointsInRangeCoordinatesModalProps){
    if(!points){
        return <></>;
    }
    
    return (
        <Modal 
            title={`Points in selected range`}
            open={isModalOpen} 
            centered={true}
            onCancel={() => {
                setIsModalOpen(false);
            }}
            className="bezier-curve-points-in-range-modal"
            footer={() => (
                <></>
            )}
        >
            <div className="points-list-holder">
                <ul className="points-list">
                    {
                        points.map((point, index) => {
                            return <li key={index}>{`Point #${index + 1} : ( ${Round(point.x, 3)} ; ${Round(point.y, 3)} )`}</li>;
                        })
                    }
                </ul>
            </div>
        </Modal>
    )   
}