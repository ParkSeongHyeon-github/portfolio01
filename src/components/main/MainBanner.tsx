import { useState, useEffect } from 'react';
import { Select } from '../../api/cars-api';
import { Insert } from '../../api/consult-api';
import type { CarData } from '../../types/cars';
import type { QuickConsultWriteData } from '../../types/consult';


const MainBanner = () => {
    const initialFormData: QuickConsultWriteData = {
        carbrand : '',
        carname : '',
        carperiod : '',
        username : '',
        userphone : '',
    }
    const [carData, setCarData] = useState<CarData[]>([]);
    const [carBrand, setCarBrand] = useState<string>('');
    const [carModel, setCarModel] = useState<string[]>([]);
    const [formData, setFormData] = useState<QuickConsultWriteData>(initialFormData);

    const changeInput = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        let newValue : string = value;
        if(name === 'userphone'){
            newValue = value.replace(/[^0-9]/g, '');
        }
        if(name === 'carbrand'){setCarBrand(e.target.value)};
        setFormData(prev => ({...prev, [name] : newValue}));
    }
    
    useEffect(() => {
        const load = async() => {
            try{
                const result = await Select({});
                const brandAndModel = result.data.map((car : CarData) => ({
                    carbrand : car.carbrand,
                    carname : car.carname
                }))
                setCarData(brandAndModel);
            }catch{
                alert('올바른 접근이 아닙니다.');
            }
        }
        load()
    }, [])

    useEffect(() => {
        if(carBrand){
            const filtermodel = carData.filter((val) => val.carbrand === carBrand).map((val) => val.carname);
            setCarModel(filtermodel);
        }
    }, [carBrand])

    const Upload = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await Insert("quickconsult", formData);
            alert('실시간 견적 문의가 완료되었습니다. \n관리자 확인 후 안내 드리겠습니다.');
            setFormData(initialFormData);
            setCarBrand('');
            setCarModel([]);
        }catch{
            alert('올바른 접근이 아닙니다.');
        }
    }
    
    return(
        <div id="mainbanner">
            <form onSubmit={Upload}>
                <h2>실시간 견적 문의</h2>
                <div className="select-car">
                    <div className="select brand">
                        <select name="carbrand" id="carbrand" value={formData.carbrand} onChange={changeInput}>
                            <option value="">제조사 선택</option>
                            {[...new Set(carData.map(v => v.carbrand))].map((brand) => {
                                return(
                                    <option key={brand} value={brand}>{brand}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="select model">
                        <select name="carname" id="carname" value={formData.carname} onChange={changeInput}>
                            <option value="">차종 선택</option>
                            {carBrand && carModel && carModel.map((val) => {
                                return(
                                    <option key={val} value={val}>{val}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="select-period">
                    <p>계약 기간</p>
                    <ul>
                        <li className={formData.carperiod === "36개월" ? 'on' : ''}>
                            <label htmlFor="carperiod-36">36개월</label>
                            <input type="radio" name="carperiod" value="36개월" id="carperiod-36" onChange={changeInput}/>
                        </li>
                        <li className={formData.carperiod === "48개월" ? 'on' : ''}>
                            <label htmlFor="carperiod-48">48개월</label>
                            <input type="radio" name="carperiod" value="48개월" id="carperiod-48" onChange={changeInput}/>
                        </li>
                        <li className={formData.carperiod === "60개월" ? 'on' : ''}>
                            <label htmlFor="carperiod-60">60개월</label>
                            <input type="radio" name="carperiod" value="60개월" id="carperiod-60" onChange={changeInput}/>
                        </li>
                    </ul>
                    <div className="user-info">
                        <label htmlFor="username" className="sound_only">성함</label>
                        <input type="text" name="username" value={formData.username} id="username" required placeholder='성함' onChange={changeInput}/>
                        <label htmlFor="userphone" className="sound_only">연락처</label>
                        <input type="text" name="userphone" value={formData.userphone} id="userphone" required placeholder='연락처' onChange={changeInput}/>
                    </div>
                    <button className="submit-btn">무료 견적 받기</button>
                </div>
            </form>
        </div>
    )
}

export default MainBanner;