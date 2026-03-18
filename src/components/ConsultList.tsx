import { Link } from 'react-router-dom';
import type { QuickConsult } from '../types/consult';
import type { LeaseCar } from '../types/consult';
import type { CarInquery } from '../types/consult';
import type { CarModel } from '../types/consult';

interface ConsultProps{
    type : string,
    data : LeaseCar[] | QuickConsult[] | CarInquery[],
    theadValue : string[],
    tbodyValue : (keyof LeaseCar)[] | (keyof QuickConsult)[] | (keyof CarInquery)[];
}

const ConsultList = ({type, data, theadValue, tbodyValue} : ConsultProps) => {
    let typeName : string = '';
    if(type === 'lease'){
        typeName = 'lease';
    }else if(type === 'quick'){
        typeName = 'quick';
    }else {
        typeName = 'easy';
    }
    return(
        <div id="ConsultList">
            <div className="notice">* 각 차량명을 클릭시 상세페이지로 이동합니다</div>
            <table>
                <thead className={`top ${typeName}`}>
                    <tr>
                        {theadValue.map((val) => {
                            return(
                                <th key={val}>{val}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody className={`bottom ${typeName}`}>
                    {data.map((row) => (
                    <tr key={row.id}>
                        {tbodyValue.map((key) => {
                            if(type === 'lease'){
                                const leaseRow = row as LeaseCar
                                const value = leaseRow[key as keyof LeaseCar]

                                if (key === 'carmodel' && typeof value === 'object') {
                                return (
                                    <td key={key}>
                                    <table className="model-table">
                                        <thead>
                                        <tr>
                                            <th>모델</th>
                                            <th>가격</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{value.name}</td>
                                            <td>{Number(value.price).toLocaleString()}원</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                )
                                }else if (key === 'carname'){
                                    return <td key={key}><Link to={`/admin/consult/lease/view/${row.id}`}>{String(value)}</Link></td>
                                }

                                return <td key={key}>{String(value)}</td>
                            }
                            if(type === 'quick'){
                                const quickRow = row as QuickConsult
                                const value = quickRow[key as keyof QuickConsult]

                                if(key === 'carname'){
                                    return <td key={key}><Link to={`/admin/consult/quick/view/${row.id}`}>{String(value)}</Link></td>
                                }

                                return <td key={key}>{String(value)}</td>
                            }
                            if(type === 'easy'){
                                const easyRow = row as CarInquery;
                                const value = easyRow[key as keyof CarInquery];

                                if((key === 'carmodel') && typeof value === 'object'){
                                    const model = value as CarModel;
                                    return (
                                        <td key={key}>
                                        <table className="model-table">
                                            <thead>
                                            <tr>
                                                <th>모델</th>
                                                <th>가격</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{model.name}</td>
                                                <td>{model.price}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        </td>
                                    )
                                }else if((key === 'caroption') && typeof value === 'object'){
                                    const option = value as CarModel[];
                                    return (
                                        <td key={key}>
                                        <table className="model-table">
                                            <thead>
                                            <tr>
                                                <th>옵션</th>
                                                <th>가격</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {option.map((val) => {
                                                return(
                                                    <tr>
                                                        <td>{val.name}</td>
                                                        <td>{val.price}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                        </td>
                                    )
                                }else if(key === 'carname'){
                                    return <td key={key}><Link to={`/admin/consult/easy/view/${row.id}`}>{String(value)}</Link></td>
                                }

                                return <td key={key}>{String(value)}</td>
                            }
                        })}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ConsultList;