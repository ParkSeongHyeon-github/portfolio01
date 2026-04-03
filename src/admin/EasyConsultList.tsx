import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CarInquery } from '../types/consult';
import ConsultList from '../components/ConsultList';
import { useSelect } from '../hooks/ConsultListHook';
import "./Consult.css";

const EasyConsultList = ({loginUser} : {loginUser : string | null}) => {
    const theadTd : string[] = ['브랜드', '차량명', '색상', '모델', '옵션', '성명', '전화번호'];
    const tbodyTd : (keyof CarInquery)[] = ['carbrand', 'carname', 'carcolor', 'carmodel', 'caroption', 'username', 'userphone']
    const leaseData = useSelect<CarInquery>('consult');

    const nav = useNavigate();

    useEffect(() => {
        if(!loginUser || loginUser !== '관리자'){
            nav("/");
        }
    }, [])

    return(
        <ConsultList type={'easy'} data={leaseData} theadValue={theadTd} tbodyValue={tbodyTd} />
    )
}

export default EasyConsultList;