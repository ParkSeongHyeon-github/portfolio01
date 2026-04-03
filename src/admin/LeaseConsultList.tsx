import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LeaseCar } from '../types/consult';
import ConsultList from '../components/ConsultList';
import { useSelect } from '../hooks/ConsultListHook';
import "./Consult.css";

const LeaseConsultList = ({loginUser} : {loginUser : string | null}) => {
    const theadTd : string[] = ['브랜드', '차량명', '모델', '성명', '전화번호'];
    const tbodyTd : (keyof LeaseCar)[] = ['carbrand', 'carname', 'carmodel', 'username', 'userphone']
    const leaseData = useSelect<LeaseCar>('leaseconsult');

    const nav = useNavigate();

    useEffect(() => {
        if(!loginUser || loginUser !== '관리자'){
            nav("/");
        }
    }, [])

    return(
        <ConsultList type={'lease'} data={leaseData} theadValue={theadTd} tbodyValue={tbodyTd} />
    )
}

export default LeaseConsultList;