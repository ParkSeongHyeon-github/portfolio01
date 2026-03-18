import { useState } from 'react';
import { X } from 'react-feather';
import { Insert } from '../api/consult-api';
import type { CarData } from '../types/cars';
import type { LeaseCarWriteData } from '../types/consult';
import "../css/consult.css"

interface SubmitBtnProps {
    data : CarData,
    setUserInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const SubmitBtn = ({data, setUserInfo} : SubmitBtnProps) => {

    const [formData, setFormData] = useState<LeaseCarWriteData>({
            carbrand : data.carbrand,
            carname :  data.carname,
            carmodel : {name : data.carmodel[0].name, price : data.carmodel[0].price!},
            monthprice : String(Math.ceil(Number(data.carmodel[0].price) / 48)),
            useperiod : '48개월',
            advance : '30%',
            username : '',
            userphone : ''
    })

    const changeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        let newValue = value;
        if(name === 'userphone'){
            newValue = value.replace(/[^0-9]/g, '');
        }
        setFormData(prev => ({...prev, [name] : newValue}));
    }

    const Upload = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await Insert("leaseconsult", formData);
            alert('특판차량 상담신청이 완료 되었습니다 \n관리자 확인 후 안내드리겠습니다.');
            setFormData({
                carbrand : '',
                carname : '',
                carmodel : {name : '', price : ''},
                monthprice : '',
                useperiod : '',
                advance : '',
                username : '',
                userphone : '',
            })
            setUserInfo(false);
        }catch{
            alert('올바른 접근이 아닙니다.');
        }
    }
    
    return(
         <div className="userinfo-wrap">
            <form onSubmit={Upload} className="userinfo">
                <input type="hidden" name="carbrand" />
                <input type="hidden" name="carname" />
                <input type="hidden" name="carmodel" />
                <input type="hidden" name="monthprice" />
                <input type="hidden" name="useperiod" />
                <input type="hidden" name="advance" />
                <h3>간편 상담신청</h3>
                <button type="button" className="close-btn" onClick={() => setUserInfo(false)}><X /></button>
                <div className="user-input">
                    <label htmlFor="username" className="sound_only">성함</label>
                    <input type="text" name="username" value={formData.username} id="username" placeholder="성함 또는 회사명을 입력해주세요." required onChange={changeInput}/>
                    <label htmlFor="userphone" className="sound_only">연락처</label>
                    <input type="text" name="userphone" value={formData.userphone} id="userphone" placeholder="연락처를 입력해주세요." required onChange={changeInput}/>
                </div>
                <button type="submit" className="submit-btn">상담 신청 완료</button>
            </form>
        </div>
    )
}

export default SubmitBtn;