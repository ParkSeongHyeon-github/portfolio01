import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelectOne } from '../hooks/ConsultListHook';
import ConsultView from "../components/ConsultView";
import type { QuickConsult } from '../types/consult';
import "./Consult.css";

const QuickConsultView = ({loginUser} : {loginUser : string | null}) => {
    const infodata : string[] = ["이름", "전화번호", "브랜드", "차량명", "이용기간", ];
    const infokey: (keyof QuickConsult)[] = ["username","userphone","carbrand","carname", "carperiod"];
    const {consultid} = useParams();
    const quickData = useSelectOne<QuickConsult>('quickconsult', consultid!);

    const nav = useNavigate();

    useEffect(() => {
        if(!loginUser || loginUser !== '관리자'){
            nav("/");
        }
    }, [])

    if (!quickData || !consultid) {
        return <div>loading...</div>
    }
    return(
        <ConsultView type={'quick'} data={quickData} info={infodata} infokey={infokey}/>

    )
}

export default QuickConsultView;