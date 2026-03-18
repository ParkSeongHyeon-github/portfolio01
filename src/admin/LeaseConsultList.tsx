import type { LeaseCar } from '../types/consult';
import ConsultList from '../components/ConsultList';
import { useSelect } from '../hooks/ConsultListHook';
import "./Consult.css";

const LeaseConsultList = () => {
    const theadTd : string[] = ['브랜드', '차량명', '모델', '성명', '전화번호'];
    const tbodyTd : (keyof LeaseCar)[] = ['carbrand', 'carname', 'carmodel', 'username', 'userphone']
    const leaseData = useSelect<LeaseCar>('leaseconsult');

    return(
        <ConsultList type={'lease'} data={leaseData} theadValue={theadTd} tbodyValue={tbodyTd} />
    )
}

export default LeaseConsultList;