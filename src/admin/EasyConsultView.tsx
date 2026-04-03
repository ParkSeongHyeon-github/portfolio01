import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelectOne } from '../hooks/ConsultListHook';
import ConsultView from "../components/ConsultView";
import type { CarInquery } from '../types/consult';
import "./Consult.css";

const EasyConsultView = ({loginUser} : {loginUser : string | null}) => {
    const infodata : string[] = ["이름", "전화번호", "브랜드", "차량명", "차량연식", "차종", "연료", "차량색상", "차량모델", "차량옵션", "이용방법", "이용기간", "보증금", "선납금", "보험연령", "연간주행거리", "총 금액"];
    const infokey: (keyof CarInquery)[] = ["username","userphone","carbrand","carname","caryear","cartype","carfuel","carcolor","carmodel","caroption","usetype","useperiod","security","advance","Insuranceage","mileage","totalprice"];
    const {consultid} = useParams();
    const easyData = useSelectOne<CarInquery>('consult', consultid!);

    const nav = useNavigate();

    useEffect(() => {
        if(!loginUser || loginUser !== '관리자'){
            nav("/");
        }
    }, [])

    if (!easyData || !consultid) {
        return <div>loading...</div>
    }

    return(
        <ConsultView type={'easy'} data={easyData} info={infodata} infokey={infokey}/>
    )
}

export default EasyConsultView;