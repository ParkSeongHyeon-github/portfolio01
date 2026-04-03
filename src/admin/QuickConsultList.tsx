import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuickConsult } from '../types/consult';
import ConsultList from '../components/ConsultList';
import { useSelect } from '../hooks/ConsultListHook';
import "./Consult.css";

const QuickConsultList = ({loginUser} : {loginUser : string | null}) => {
    const theadTd : string[] = ['브랜드', '차량명', '기간', '성명', '전화번호'];
    const tbodyTd : (keyof QuickConsult)[] = ['carbrand', 'carname', 'carperiod', 'username', 'userphone']
    const quickData = useSelect<QuickConsult>('quickconsult');

    const nav = useNavigate();

    useEffect(() => {
        if(!loginUser || loginUser !== '관리자'){
            nav("/");
        }
    }, [])

    return(
        <ConsultList type={'quick'} data={quickData} theadValue={theadTd} tbodyValue={tbodyTd} />
    )
}

export default QuickConsultList;