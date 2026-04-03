import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ConsultHeader from "../components/ConsultHeader";
import type { CarData } from '../types/cars';
import { Select } from '../api/cars-api';
import "../css/consult.css";

const ConsultCarSelect = () => {
    const [searchBrand] = useSearchParams();
    const selectMade = searchBrand.get('made');
    const selectBrand = searchBrand.get('brand');

    const [carData, setCarData] = useState<CarData[]>([]);
    const [carMade, setCarMade] = useState<string>('');
    const [carBrand, setCarBrand] = useState<string[]>([]);
    const [currentBrand, setCurrentBrand] = useState<string>('');
    const [currentData, setCurrentData] = useState<CarData[]>([]);

    const changeMade = (e : React.MouseEvent<HTMLButtonElement>) => {
        setCarMade(e.currentTarget.value);
        setCurrentBrand('');
    }

    const changeBrand = (e : React.MouseEvent<HTMLLIElement>) => {
        const brand = e.currentTarget.dataset.brand
        if(brand){
            setCurrentBrand(brand);
        }
    }

    useEffect(() => {
        const load = async() => {
            try{
                const result = await Select({});
                setCarData(result.data);
            }catch{
                alert('올바른 접근이 아닙니다.');
            }
        }
        load()
    }, [])

    useEffect(() => {
        if(selectMade){
            setCarMade(selectMade)
        }
    }, [selectMade])

    useEffect(() => {
        if(selectBrand){
            setCurrentBrand(selectBrand)
        }
    }, [selectBrand])

    useEffect(() => {
        if(!carMade) return;

        const filterBrand = carData.filter((car : CarData) => car.carmade === carMade).map((val) => val.carbrand);

        setCarBrand(filterBrand);
    }, [carMade, carData])

    useEffect(() => {
        if(!currentBrand) return;

        const filterData = carData.filter((car : CarData) => car.carbrand === currentBrand);

        setCurrentData(filterData);

    }, [currentBrand, carData])

    return(
        <div id="Consult">
            <ConsultHeader />
            <ul className="car-made">
                <li className={carMade === '국산차' ? 'on' : '' }><button type="button" value="국산차" onClick={changeMade}>국산차</button></li>
                <li className={carMade === '수입차' ? 'on' : '' }><button type="button" value="수입차" onClick={changeMade}>수입차</button></li>
            </ul>
            <div className="car-brand">
                <p>찾으시는 차량의 브랜드를 선택해주세요.</p>
                <ul className="select-brand">
                    {carBrand && [...new Set(carBrand)].map((val, index) => {
                        return(
                            <li key={index} onClick={changeBrand} data-brand={val} className={currentBrand === val ? 'on' : ''}>
                                <img src={`/img/brand/${val}.jpg`} alt={val} />
                                {val}
                            </li>
                        )
                    })}
                </ul>
                <p>원하시는 차량을 선택해주세요.</p>
                <ul className="select-car">
                    {currentData && currentData.map((val) => {
                        let minPrice = Infinity;
                        let maxPrice = -Infinity;
                        val.carmodel.reduce((_, cur) => {
                            const price = Number(cur.price!.slice(0, 4));
                            minPrice = Math.min(minPrice, price);
                            maxPrice = Math.max(maxPrice, price);
                            return null;
                        }, null)

                        return(
                            <li key={val.id}>
                                <Link to={`/consult/carselect/${val.id}`}>
                                    <div className="car-img">
                                        <img src={`/img/cars/${val.carname}_${val.carcolor[0].name}.png`} alt={val.carname} />
                                    </div>
                                    <div className="car-name">
                                        {val.carname}
                                        <img src={`/img/brand/${val.carbrand}.jpg`} alt={val.carbrand} />
                                    </div>
                                    <div className="car-price">신차가격 <span>{ minPrice.toLocaleString() } ~ { maxPrice.toLocaleString() } 만원</span></div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>

            </div>
        </div>
    )
}

export default ConsultCarSelect;