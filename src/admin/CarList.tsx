import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Select, Delete } from '../api/cars-api';
import { Search, RefreshCw } from 'react-feather';
import type { CarData } from '../types/cars';
import "./Carstyle.css";

const CarList = ({loginUser} : {loginUser : string | null}) => {
    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const curPage = Number(searchParams.get("page")) || 1;
    const curSubject = searchParams.get("subject") || '';
    const limit = 5;

    const [carList, setCarList] = useState<CarData[]>([]);
    const [totalCount, setTotalCount] = useState<number>(1); 
    const [searchSubject, setSearchSubject] = useState<string>(curSubject);

    const DeleteCar = async(id : string) => {
        try{
            const ckDelete = confirm('해당 차량을 삭제하시겠습니까? \n복구는 불가능 합니다.');
            if(ckDelete){
                await Delete(id);
                alert('차량이 정상적으로 삭제 되었습니다.');
            }
        }catch{
            alert('올바른 접근이 아닙니다.');
        }
    }

    const pageGroup = Math.ceil(curPage / 10);
    const startPage = (pageGroup - 1) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalCount);

    const ChangePage = (page : string) => {
        setSearchParams({page : page});
    }

    const SearchSubject = () => {
        setSearchParams({subject : searchSubject, page : "1"});
    }

    const Refresh = () => {
        setSearchParams({});
        setSearchSubject('');
    }

    useEffect(() => {
        const load = async() => {
            try{
                const result = await Select({page : curPage, limit : limit, carname : searchSubject});
                setCarList(result.data);
                setTotalCount(result.totalCount / limit);
            }catch{
                alert('올바른 접근이 아닙니다.');
            }
        }
        load()
    }, [searchParams])

    const pagingArr = Array.from({length : (endPage - startPage + 1)}, (_, i) => startPage + i);

    const prevGroup = () => {
        if(startPage > 1){
            ChangePage(String(startPage - 1));
        }
    }
    const nextGroup = () => {
        if (endPage < totalCount) {
            ChangePage(String(endPage + 1));
        }
    };

    useEffect(() => {
        if(!loginUser || loginUser !== '관리자'){
            nav("/");
        }
    }, [])
    
    return(
        <div id="Board-list" className="board">
            <div className="search"> 
                <div className="search-wrap">
                    <input type="text" value={searchSubject} placeholder='차량명을 입력해 주세요.' onChange={(e : React.ChangeEvent<HTMLInputElement>) => setSearchSubject(e.target.value)}  onKeyDown={(e) => {if (e.key === 'Enter') {SearchSubject();}}}/>
                    <button onClick={SearchSubject}><Search size={20}/></button>
                </div>
                <button className="refresh-btn" onClick={Refresh}><RefreshCw size={20}/></button>
            </div>
            <table className="car-table">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>차량이미지</th>
                        <th>브랜드</th>
                        <th>차량명</th>
                        <th>차량연식</th>
                        <th>차종</th>
                        <th>차량색상</th>
                        <th>차량모델</th>
                        <th>차량옵션</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {carList.map((val, index) => {
                        return(
                            <tr key={val.id}>
                                <td>{index + 1}</td>
                                <td className="car-image"><img src={`/img/cars/${val.carname}_${val.carcolor[0].name}.png`} alt="" onError={(e) => e.currentTarget.replaceWith(document.createTextNode("이미지 준비중입니다"))}/></td>
                                <td className="car-brand">{val.carbrand}</td>
                                <td className="car-name">{val.carname}</td>
                                <td className="car-year">{val.caryear}</td>
                                <td className="car-type">{val.cartype}</td>
                                <td className="car-color">
                                    <ul>
                                        {val.carcolor.map((val, index) => {
                                            return(
                                                <li key={index}>{val.name}</li>
                                            )
                                        })}
                                    </ul>
                                </td>
                                <td className="car-model">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>모델명</th>
                                                <th>가격</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {val.carmodel.map((val, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>{val.name}</td>
                                                    <td>{Number(val.price).toLocaleString()}원</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </td>
                                <td className="car-option">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>옵션명</th>
                                                <th>가격</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {val.caroption.map((val, index) => {
                                                return(
                                                    <tr key={index}>
                                                        <td>{val.name ? val.name : '옵션없음'}</td>
                                                        <td>{Number(val.price).toLocaleString()}원</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </td>
                                <td className="admin-btn">
                                    <ul>
                                        <li><Link to={`/admin/cars/write/${val.id}`}><button className="modeify-btn">수정</button></Link></li>
                                        <li><button className="delete-btn" onClick={() => DeleteCar(val.id)}>삭제</button></li>
                                    </ul>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
                <div className="pagination">
                {startPage > 1 && (
                    <button onClick={prevGroup}>이전</button>
                )}
                {pagingArr.map((val) => (
                    <button key={val} type="button" onClick={() => ChangePage(String(val))} className={val === curPage ? 'active' : ''}>{val}</button>
                ))}
                {endPage < totalCount && (
                    <button onClick={nextGroup}>다음</button>
                )}
            </div>
        </div>
    )
}

export default CarList;