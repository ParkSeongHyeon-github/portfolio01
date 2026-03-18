import type { QuickConsult } from '../types/consult';
import ConsultList from '../components/ConsultList';
import { useSelect } from '../hooks/ConsultListHook';
import "./Consult.css";

const QuickConsultList = () => {
    const theadTd : string[] = ['브랜드', '차량명', '기간', '성명', '전화번호'];
    const tbodyTd : (keyof QuickConsult)[] = ['carbrand', 'carname', 'carperiod', 'username', 'userphone']
    const quickData = useSelect<QuickConsult>('quickconsult');

    return(
        <ConsultList type={'quick'} data={quickData} theadValue={theadTd} tbodyValue={tbodyTd} />
    )
}

export default QuickConsultList;