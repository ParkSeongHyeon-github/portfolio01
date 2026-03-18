import { useParams } from "react-router-dom";

const ConsultHeader = () => {
    const {carid} = useParams();
    return(
        <div className="consult-header">
            <div className="txt">
                <h2>간편견적 <span>신청</span></h2>
                <p>원하는 차량에 맞춰 견적신청까지!</p>
            </div>
            <ul className="step">
                <li className={!carid ? 'on' : ''}><span>01 Step</span> 차량선택</li>
                <li className={carid ? 'on' : ''}><span>02 Step</span> 옵션 및 이용조건</li>
                <li><span>03 Step</span> 선택사항 및 고객정보</li>
            </ul>
        </div>
    )
}

export default ConsultHeader;