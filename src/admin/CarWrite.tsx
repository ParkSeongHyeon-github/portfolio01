import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CarWriteData, CarOption } from "../types/cars";
import OptionInput from '../components/OptionInput';
import { Insert, SelectOne, Update } from '../api/cars-api';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import dayjs from 'dayjs';
import "./Carstyle.css";

registerLocale('ko', ko);

const CarWrite = () => {
    const {carid} = useParams();
    const nav = useNavigate();
    const [carYear, setCarYear] = useState<Date | null>(null);
    const [formData, setFormData] = useState<CarWriteData>({
        carmade : '',
        carbrand : '',
        carname : '',
        caryear : '',
        cartype : '',
        carfuel : '',
        carcolor : [{
            name : '',
            color : ''
        }],
        carmodel :[{
            name : '',
            price : ''
        }],
        caroption :[{
            name : '',
            price : ''
        }],
        carimage : []
    })

    const writing = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name] : value}));
    }

    const changeDate = (date : Date | null) => {
        setCarYear(date);
        if(date){
            setFormData(prev => ({ ...prev, caryear: dayjs(date).format('YYYY-MM-DD') }));
        }
    }

    const ChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files) return;
        const names = Array.from(files).map(file => file.name);
        setFormData(prev => ({...prev, carimage: names}));
    }

    const AddInput = (key : string) => {
        const newItem = key === 'carcolor' ? {name : '', color : ''} 
        : {name : '', price : ''}
        setFormData(prev => ({...prev, [key] : [...(prev[key as keyof CarWriteData] as CarOption[]), newItem]}))
    }

    const RemoveInput = (index : number, key : string) => {
        setFormData(prev => ({...prev, [key] : (prev[key as keyof CarWriteData] as CarOption[]).filter((_, i) => i !== index)}));
    }   

    const ChangeInput = (field : string | null, value : string, index : number, key : string) => {
        let newValue : string = value;
        if(field === 'price'){
            newValue = value.replace(/[^0-9]/g, '');
        }
        setFormData(prev => {
            const copy : CarOption[] = [...prev[key as keyof CarWriteData] as CarOption[]];
            copy[index] = {...copy[index], [field as keyof CarOption] : newValue}
            return {...prev, [key] : copy}
        })
    }

    const Upload = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            if(!carid){
                await Insert(formData);
                alert('차량이 정상적으로 등록되었습니다.');
                nav('/admin/cars/list');
            }else{
                await Update(formData, carid);
                alert('차량이 정상적으로 수정되었습니다.');
                nav('/admin/cars/list');
            }
        }catch{
            alert('올바른 접근이 아닙니다.');
        }
    }

    useEffect(() => {
        if(carid){
            const load = async() => {
                try{
                    const result = await SelectOne(carid);
                    setFormData(result);
                }catch{
                    alert('올바른 접근이 아닙니다.');
                }
            }
            load();
        }
    }, [carid])

    return(
        <div id="Board-write" className="board">
            <form onSubmit={Upload}>
                <div className="item">
                    <label htmlFor="carmade">제조국</label>
                    <select name="carmade" id="carmade" className="input" value={formData.carmade} onChange={writing}>
                        <option value="">제조국을 선택해주세요.</option>
                        <option value="국산차">국산차</option>
                        <option value="수입차">수입차</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="carbrand">브랜드</label>
                    <input type="text" name="carbrand" value={formData.carbrand} id="carbrand" className="input" onChange={writing}/>
                </div>
                <div className="item">
                    <label htmlFor="carname">차량명</label>
                    <input type="text" name="carname" value={formData.carname} id="carname" className="input" onChange={writing}/>
                </div>
                <div className="item">
                    <label htmlFor="caryear">차량연식</label>
                    <DatePicker className="input"  value={formData.caryear} selected={carYear} onChange={changeDate} dateFormat="yyyy-MM-dd" locale="ko"/>
                </div>
                <div className="item">
                    <label htmlFor="cartype">차종</label>
                    <input type="text" name="cartype" value={formData.cartype} id="cartype" className="input" onChange={writing}/>
                </div>
                <div className="item">
                    <label htmlFor="carfuel">연료</label>
                    <input type="text" name="carfuel" value={formData.carfuel} id="carfuel" className="input" onChange={writing}/>
                </div>
                <div className="item">
                    <label htmlFor="carcolor">차량색상</label>
                    <OptionInput values={formData.carcolor} datakey={'carcolor'} AddInput={AddInput} RemoveInput={RemoveInput} ChangeInput={ChangeInput}/>
                </div>
                <div className="item">
                    <label htmlFor="carmodel">차량모델</label>
                    <OptionInput values={formData.carmodel} datakey={'carmodel'} AddInput={AddInput} RemoveInput={RemoveInput} ChangeInput={ChangeInput}/>
                </div>
                <div className="item">
                    <label htmlFor="caroption">차량옵션</label>
                    <OptionInput values={formData.caroption} datakey={'caroption'} AddInput={AddInput} RemoveInput={RemoveInput} ChangeInput={ChangeInput}/>
                </div>
                <div className="item">
                    <label htmlFor="carimage">차량이미지</label>
                    <input type="file" name="carimage" id="carimage" className="input image" multiple onChange={ChangeImage}/>
                </div>
                <button type="submit" className="submitbtn">차량 등록</button>
            </form>
        </div>
    )
}

export default CarWrite;