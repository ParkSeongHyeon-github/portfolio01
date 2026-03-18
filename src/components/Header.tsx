import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from "react-feather";
import type { CarData } from '../types/cars';
import { Select } from '../api/cars-api';

interface HeaderProps {
    loginUser : string | null,
    setLoginUser : (user : string | null) => void;
}

const Header = ({ loginUser, setLoginUser} : HeaderProps) => {
    const nav = useNavigate();
    const [carData, setCarData] = useState<CarData[]>([]);
    const [carMade, setCarMade] = useState<string>('국산차');
    const [brandList, setBrandList] = useState<string[]>([]);
    const [curBrand, setCurBrand] = useState<string>('');

    const logout = () => {
        const cklogout = confirm('로그아웃 하시겠습니까?');
        if(cklogout){
            localStorage.removeItem('login');
            setLoginUser(null);
            nav('/');
        }
    }

    const changeMade = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCarMade(e.target.value);
    }

    const changeBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurBrand(e.target.value);
    }

    useEffect(() => {
        const load = async () => {
            try{
                const result = await Select();
                setCarData(result);
            }catch{
                alert('차량 데이터를 불러오지 못했습니다.');
            }
        }
        load();
    }, []);

    useEffect(() => {
        if(carMade){
            const brands = carData.filter(v => v.carmade === carMade).map(v => v.carbrand);
            setBrandList([...new Set(brands)]);
        }
    }, [carMade, carData]);

    return(
        <header>
            <div id="top-menu">
                <div className="logo"><Link to="/">SAMPLE</Link></div>
                <form action="" className="search-car">
                    <select className="select-made" onChange={changeMade} value={carMade}>
                        <option value="국산차">국산</option>
                        <option value="수입차">수입</option>
                    </select>
                    <select className="select-car" onChange={changeBrand}>
                        <option value="">제조사를 선택해주세요.</option>
                          {brandList.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    <Link to={`/consult/carselect?made=${carMade}&brand=${curBrand}`}><Search size={20}/></Link>
                </form>
                <ul className="user">
                    <li>
                        {!loginUser && (
                            <Link to="/login">로그인</Link>
                        )}
                        {loginUser && (
                            <button onClick={logout}>로그아웃</button>
                        )}
                    </li>
                    <li>
                        {!loginUser && (
                            <Link to='/register'>회원가입</Link>
                        )}
                    </li>
                </ul>
            </div>
            <nav id="top-nav">
                <ul>
                    {loginUser !== '관리자' && (
                        <li><Link to="/consult/carselect">간편 견적신청</Link></li>
                    )}
                    {loginUser === '관리자' && (
                        <>
                            <li><Link to="/admin/cars/write">차량 등록</Link></li>
                            <li><Link to="/admin/cars/list">차량 목록</Link></li>
                            <li><Link to="/admin/consult/easy/list">간편 상담 목록</Link></li>
                            <li><Link to="/admin/consult/quick/list">빠른 상담 목록</Link></li>
                            <li><Link to="/admin/consult/lease/list">특판 상담 목록</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;