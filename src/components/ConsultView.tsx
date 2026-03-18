import type { CarInquery } from '../types/consult';
import type { LeaseCar } from '../types/consult';
import type { QuickConsult } from '../types/consult';
import { Link } from 'react-router-dom';

interface ConsultProps {
    type : string,
    data : CarInquery | LeaseCar | QuickConsult,
    info : string[],
    infokey : (keyof CarInquery)[] | (keyof LeaseCar)[] | (keyof QuickConsult)[],
    consultId : string
}

const ConsultView = ({type, data, info, infokey, consultId } : ConsultProps) => {
    return(
        <div id="ConsultView">
            <div className="title">{data['carname']} 상담 신청</div>
            <ul className="user">
                <li><span>작성자</span>{data.username}</li>
            </ul>
            <ul className="info">
                {info.map((row, index) => {
                    if(type === 'easy'){
                        const easyData = data as CarInquery;
                        if(row === '차량모델'){
                            return(
                                <li key={row}>
                                    <span>{row}</span>
                                    <div className="car-model">
                                        <div>
                                            <span>차량명 : </span>
                                            <span>{String(easyData['carmodel']['name'])}</span>
                                        </div>
                                        <div>
                                            <span>가격 : </span>
                                            <span>{Number(easyData['carmodel']['price']).toLocaleString()}원</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        }else if(row === '차량옵션'){
                            return(
                                <li key={row}>
                                    <span>{row}</span>
                                    <ul className="car-option">
                                        {easyData['caroption'].map((val) => {
                                            return(
                                                <li key={val.name}>
                                                    <div><span>옵션명 : </span>{val.name}</div>
                                                    <div><span>가격 : </span>{Number(val.price).toLocaleString()}원</div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            )
                        }else if(row === '총 금액'){
                            return(
                            <li key={row}>
                                <span>{row}</span>
                                {Number(easyData['totalprice']).toLocaleString()}원
                            </li>
                            )
                        }
                        return(
                            <li key={row}>
                                <span>{row}</span>
                                {String(easyData[infokey[index] as keyof CarInquery])}
                            </li>
                        )
                    }else if(type === 'lease'){
                        const leaseData = data as LeaseCar;
                           if(row === '차량모델'){
                            return(
                                <li key={row}>
                                    <span>{row}</span>
                                    <div className="car-model">
                                        <div>
                                            <span>차량명 : </span>
                                            <span>{String(leaseData['carmodel']['name'])}</span>
                                        </div>
                                        <div>
                                            <span>가격 : </span>
                                            <span>{Number(leaseData['carmodel']['price']).toLocaleString()}원</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                        return(
                        <li key={row}>
                            <span>{row}</span>
                            {String(leaseData[infokey[index] as keyof LeaseCar])}
                        </li>
                        )
                    }else if(type === 'quick'){
                        const quickData = data as QuickConsult;
                        return(
                            <li key={row}>
                                <span>{row}</span>
                                {String(quickData[infokey[index] as keyof QuickConsult])}
                            </li>
                        )
                    }
                })}
            </ul>
            <div className="btn">
                <Link to={`/admin/consult/${type}/list`}>글 목록</Link>
            </div>
        </div>
    )
}

export default ConsultView;