import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import ConsultHeader from "../components/ConsultHeader";
import InqueryInput from "../components/InqueryInput";
import { SelectOne } from '../api/cars-api';
import { Insert } from '../api/consult-api';
import type { CarData } from '../types/cars';
import type { CarInqueryWriteData } from '../types/consult';
import { X } from 'react-feather';
import "../css/consult.css";

const ConsultCarInquery = () => {
    const typeArr : string[] = ['장기렌트', '리스'];
    const periodArr : string[] = ['36개월', '48개월', '60개월'];
    const securityArr : string[] = ['없음', '10%', '20%', '30%', '40%'];
    const advancePayArr : string[] = ['없음', '10%', '20%', '30%', '40%'];
    const InsuranceAgeArr : string[] = ['만21세이상', '만26세이상'];
    const mileageArr : string[] = ['연 1만 km', '연 2만 km', '연 3만 km', '무제한'];

    const nav = useNavigate();
    const {carid} = useParams();
    const [curColor, setCurColor] = useState<string>('');
    const [carData, setCarData] = useState<CarData | null>(null);
    const [userInfo, setUserInfo] = useState<boolean>(false);
    const [formData, setFormData] = useState<CarInqueryWriteData>({
        carmade: '',
        carbrand: '',
        carname: '',
        caryear: '',
        cartype: '',
        carfuel: '',
        carcolor: '',
        carmodel: {name : '', price : ''},
        caroption: [],
        usetype: '장기렌트',
        useperiod: '48개월',
        security: '10%',
        securitypay: '',
        advance: '30%',
        advancepay: '',
        Insuranceage: '만21세이상',
        mileage: '연 1만 km',
        totalprice: '',
        username: '',
        userphone: ''
    })

    const changeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked, dataset} = e.target;

        let newValue = value;

        if(name === 'security' || name === 'advance'){
            const Security = name === 'security' ? Number(value.replace('%', '')) : Number(formData.security.replace('%', ''));

            const Advance = name === 'advance' ? Number(value.replace('%', '')) : Number(formData.advance.replace('%', ''));

            if(Security + Advance > 40){
                alert('보증금과 선납금의 합은 최대 40& 까지 가능합니다.');
                return;
            }
        }

        if(name === 'userphone'){
            newValue = value.replace(/[^0-9]/g, '');
        }

        if(name === 'carmodel'){
            setFormData(prev => ({...prev, carmodel : {name : value, price : dataset.price!}}));
        }else if(name === 'caroption'){
            setFormData(prev => {
                if(checked){
                    return {...prev, caroption : [...prev.caroption, {name : value, price : dataset.price!}]}
                }else{
                    return {...prev, caroption : [...prev.caroption.filter(v => v.name !== value)]}
                }
            })
        }else{
            setFormData(prev => ({...prev, [name] : newValue}));
        }

    }

    const optionPrice = formData.caroption.reduce((sum, cur) => {
        return sum + Number(cur.price);
    }, 0)

    const TotalPrice = Number(formData.carmodel.price) + optionPrice;

    const Upload = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const submitData = {
            ...formData,
            totalprice: String(TotalPrice)
        };

        try{
            await Insert("consult", submitData);
            alert('간편견적 신청이 완료 되었습니다. \n관리자 확인 후 안내 드리겠습니다.');
            nav('/');
        }catch{
            alert('올바른 접근이 아닙니다.');
        }
    }

    useEffect(() => {
        if(carid){
            const load = async() => {
                try{
                    const result = await SelectOne(carid);
                    setCarData(result);
                }catch{
                    alert('올바른 접근이 아닙니다.');
                }
            }
            load()
        }
    }, [carid])

    useEffect(() => {
        if(carData){
            setFormData(prev => ({...prev, 
                carmade : carData.carmade, 
                carbrand : carData.carbrand, 
                carname : carData.carname, 
                caryear : carData.caryear, 
                cartype : carData.cartype, 
                carfuel : carData.carfuel,
                carcolor : carData.carcolor[0].name,
                carmodel : {name : carData.carmodel[0].name, price : carData.carmodel[0].price!}
            }))
            setCurColor(carData.carcolor[0].name);
        }
    }, [carData])

    if(!carData){
        return <div>Loading...</div>
    }

    return(
        <div id="Consult">
            <ConsultHeader />
            <form id="Inquery" onSubmit={Upload}>
                <input type="hidden" name="carname" value={carData.carname} />
                <input type="hidden" name="caryear" value={carData.caryear} />
                <input type="hidden" name="cartype" value={carData.cartype} />
                <input type="hidden" name="carfuel" value={carData.carfuel} />
                <div className="top container">
                    <div className="left">
                        <img src={`/img/cars/${carData.carname}_${curColor}.png`} alt={carData.carname} />
                    </div>
                    <div className="right">
                        <h2>{carData.carname}</h2>
                        <ul className="specs">
                            <li>{carData.caryear}</li>
                            <li>{carData.cartype}</li>
                            <li>{carData.carfuel}</li>
                        </ul>
                        <div className="color">
                            <div>
                                <span>외장색상 선택</span>
                                <span>{curColor}</span>
                            </div>
                            <ul>
                                {carData.carcolor.map((val, index) => {
                                    return(
                                        <li key={val.name} className={curColor === val.name ? 'on' : ''}>
                                            <label htmlFor={`carcolor${index}`} style={{ backgroundColor: val.color }}></label>
                                            <input type="radio" name="carcolor" value={val.name} id={`carcolor${index}`} onClick={(e : React.MouseEvent<HTMLInputElement>) => setCurColor(e.currentTarget.value)} onChange={changeInput}/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="middle container">
                    <div className="left">
                        <h3><span>01.</span><span>세부모델 선택</span></h3>
                        <ul>
                            {carData.carmodel.map((val, index) => {
                                return(
                                    <li key={val.name} className={formData.carmodel.name === val.name ? 'on' : ''}>
                                        <label htmlFor={`carmodel${index}`}>
                                            <span>{val.name}</span>
                                            <span>{Number(val.price).toLocaleString()}원</span>
                                        </label>
                                        <input type="radio" name="carmodel" value={val.name} id={`carmodel${index}`} data-price={val.price} onChange={changeInput} />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="right">
                        <h3><span>02.</span><span>추가옵션 선택(중복선택 가능)</span></h3>
                        {carData.caroption.length > 1 && (
                                                    <ul>
                            {carData.caroption.map((val, index) => {
                                return(
                                    <li key={val.name} className={formData.caroption.some(v => v.name === val.name) ? 'on' : ''}>
                                        <label htmlFor={`caroption${index}`}>
                                            <span>{val.name}</span>
                                            <span>{Number(val.price).toLocaleString()}원</span>
                                        </label>
                                        <input type="checkbox" name="caroption" value={val.name} id={`caroption${index}`} data-price={val.price} onChange={changeInput}/>
                                    </li>
                                )
                            })}
                        </ul>
                        )}
                    </div>
                </div>
                <div className="bottom container">
                    <div className="left">
                        <h3><span>03.</span><span>이용조건 선택</span></h3>
                        <div className="item">
                            <p>이용방법</p>
                            <InqueryInput data={typeArr} formData={formData.usetype} nameValue={'usetype'} changeInput={changeInput}/>
                        </div>
                        <div className="item">
                            <p>이용기간</p>
                            <InqueryInput data={periodArr} formData={formData.useperiod} nameValue={'useperiod'} changeInput={changeInput}/>
                        </div>
                        <div className="item">
                            <p>보증금</p>
                            <InqueryInput data={securityArr} formData={formData.security} nameValue={'security'} changeInput={changeInput}/>
                        </div>
                        {formData.security === '없음' && (
                       <div className="item">
                            <p>보증금(원)</p>
                            <label htmlFor="securitypay" className="sound_only">보증금(원)</label>
                            <input type="text" name="securitypay" id="securitypay" className="pay-input" onChange={changeInput}/>
                        </div>
                        )}
                        <div className="item">
                            <p>선납금</p>
                            <InqueryInput data={advancePayArr} formData={formData.advance} nameValue={'advance'} changeInput={changeInput}/>
                        </div>
                        {formData.advance === '없음' && (
                        <div className="item">
                            <p>선납금(원)</p>
                            <label htmlFor="advancepay" className="sound_only">선납금(원)</label>
                            <input type="text" name="advancepay" id="advancepay" className="pay-input" onChange={changeInput}/>
                        </div>
                        )}
                        <div className="item">
                            <p>보험연령</p>
                            <InqueryInput data={InsuranceAgeArr} formData={formData.Insuranceage} nameValue={'Insuranceage'} changeInput={changeInput}/>
                        </div>
                        <div className="item">
                            <p>연간주행거리</p>
                            <InqueryInput data={mileageArr} formData={formData.mileage} nameValue={'mileage'} changeInput={changeInput}/>
                        </div>
                    </div> 
                    <div className="right">
                        <h3><span>04.</span><span>최종 견적</span></h3>
                        <div>
                            <div className="item">
                                <p>이용 조건</p>
                                <ul className="summary">
                                    <li><span>이용방법</span><span>{formData.usetype}</span></li>
                                    <li><span>이용기간</span><span>{formData.useperiod}</span></li>
                                    <li><span>보증금</span><span>{formData.security}</span></li>
                                    <li><span>선납금</span><span>{formData.advance}</span></li>
                                    <li><span>보험연령</span><span>{formData.Insuranceage}</span></li>
                                    <li><span>연간주행거리</span><span>{formData.mileage}</span></li>
                                </ul>
                            </div>
                            <div className="item">
                                <p>기본 가격</p>
                                <div className="basic-price"><span>{formData.carmodel.name}</span><span>{Number(formData.carmodel.price).toLocaleString()}원</span></div>
                            </div>
                            <div className="item">
                                <p>옵션 가격</p>
                                <ul className="option">
                                    <li><span>외장색상 : </span>{formData.carcolor}</li>
                                    {formData.caroption.map((val) => {
                                        return(
                                            <li key={val.name}>
                                                <span>{val.name}</span>
                                                <span>{Number(val.price).toLocaleString()}원</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="total-price">
                                <span>총 가격</span>
                                <span className="price">{TotalPrice.toLocaleString()}원</span>
                            </div>
                            <button type="button" className="info-btn" onClick={() => setUserInfo(true)}>간편견적 신청</button>
                        </div>
                    </div>      
                </div>
                {userInfo && (
                <div className="userinfo-wrap">
                    <div className="userinfo">
                        <h3>간편 상담신청</h3>
                        <button type="button" className="close-btn" onClick={() => setUserInfo(false)}><X /></button>
                        <div className="user-input">
                            <label htmlFor="username" className="sound_only">성함</label>
                            <input type="text" name="username" value={formData.username} id="username" placeholder="성함 또는 회사명을 입력해주세요." required onChange={changeInput}/>
                            <label htmlFor="userphone" className="sound_only">연락처</label>
                            <input type="text" name="userphone" value={formData.userphone} id="userphone" placeholder="연락처를 입력해주세요." required onChange={changeInput}/>
                        </div>
                        <button type="submit" className="submit-btn">상담 신청 완료</button>
                    </div>
                </div>
                )}
            </form>
        </div>
    )
}

export default ConsultCarInquery;