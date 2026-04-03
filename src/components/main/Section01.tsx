import { useState, useEffect } from 'react';
import SubmitBtn from '../SubmitBtn';
import { Select } from "../../api/cars-api";
import type { CarData } from '../../types/cars';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import 'swiper/swiper.css';

const Section01 = () => {
    const [userInfo, setUserInfo] = useState<boolean>(false);
    const [curCar, setCurCar] = useState<string>('');
    const [leaseData, setLeaseData] = useState<CarData[]>([]);

    const clickBtn = (name : string) => {
        setUserInfo(true);
        setCurCar(name);
    }

    useEffect(() => {
        const load = async() => {
            try{
                const result = await Select({limit : 8});
                setLeaseData(result.data);
            }catch{
                alert('올바른 접근이 아닙니다.');
            }
        }
        load()
    }, [])

    const filterData = leaseData.find(val => val.carname === curCar) ?? null;

    return(
        <div id="Section01">
            <h2>특판차량</h2>
            <Swiper 
                modules={[Autoplay]}
                loop={true}
                speed={1000}
                slidesPerView={1} 
                spaceBetween={10} 
                autoplay={{ delay: 4000, disableOnInteraction: false }} 
                breakpoints={{
                    1025 : {slidesPerView:4, spaceBetween:30},
                    769 : {slidesPerView:3 ,spaceBetween:20},
                    481 : {slidesPerView:2 ,spaceBetween:20},
                }}
            >
            {leaseData.map((val) => {
                return(
                    <SwiperSlide key={val.id}>
                        <div className="img">
                            <img src={`/img/cars/${val.carname}_${val.carcolor?.[0]?.name || 'default'}.png`} alt={val.carname} />
                        </div>
                        <div className="tit">
                            <p>{val.carbrand} {val.carname}</p>
                            <img src={`/img/brand/${val.carbrand}.jpg`} alt={val.carbrand} />
                        </div>
                        <p className="car-model">차량 모델 : {val.carmodel?.[0]?.name || '-'}</p>
                        <ul className="car-price">
                            <li className="price"><span>차량가격</span><span>{Number(val.carmodel?.[0]?.price || 0).toLocaleString()}원</span></li>
                            <li className="month-price"><span>월 렌탈료</span><span>{Math.ceil(Number(val.carmodel?.[0]?.price || 0) / 48).toLocaleString()}원</span></li>
                        </ul>
                        <ul className="use-type">
                            <li>48개월</li>
                            <li>선납금 30%</li>
                        </ul>
                        <button type="button" className="info-btn" onClick={() => clickBtn(val.carname)}>최저가 견적 확인</button>
                    </SwiperSlide>
                )
            })}
            </Swiper>
            {userInfo && filterData && (
            <SubmitBtn data={filterData} setUserInfo={setUserInfo}/>
            )}
        </div>
    )
}

export default Section01;