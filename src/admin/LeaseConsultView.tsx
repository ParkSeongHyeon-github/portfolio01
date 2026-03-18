import { useParams } from 'react-router-dom';
import { useSelectOne } from '../hooks/ConsultListHook';
import ConsultView from "../components/ConsultView";
import type { LeaseCar } from '../types/consult';
import "./Consult.css";

const LeaseConsultView = () => {
    const infodata : string[] = ["이름", "전화번호", "브랜드", "차량명", "차량모델", "월 렌트료", "이용기간", "선납금"];
    const infokey: (keyof LeaseCar)[] = ["username","userphone","carbrand","carname", "carmodel", "monthprice", "useperiod", "advance"];
    const {consultid} = useParams();
    const leaseData = useSelectOne<LeaseCar>('leaseconsult', consultid!);

    if (!leaseData || !consultid) {
        return <div>loading...</div>
    }

    return(
        <ConsultView type={'lease'} data={leaseData} info={infodata} infokey={infokey} consultId={consultid}/>
    )
}

export default LeaseConsultView;