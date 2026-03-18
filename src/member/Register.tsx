import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { MemberData } from '../types/member.ts';
import {Insert} from '../api/member-api.ts';
import "./style.css";

const Register = () => {
    const nav = useNavigate();
    const [ckpassword , setCkpassword] = useState<string>('');
    const [ckid, setCkid] = useState<boolean>(false);
    const [formData, setFormData] = useState<MemberData>({
        mb_id : '',
        mb_password : '',
        mb_email : '',
        mb_name : '',
        mb_phone : '',
    })

    const writing = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        let newValue = value;

        if(name === 'mb_id'){
            newValue = value.replace(/[^a-zA-Z0-9]/g, '');
        }

        if(name === 'mb_phone'){
            newValue = value.replace(/[^0-9]/g, '');
        }

        setFormData(prev => ({...prev, [name] : newValue}));
    }

    const checkId = async() => {
        const res = await fetch(`http://localhost:4000/member?mb_id=${formData.mb_id}`);
        const result = await res.json();

        if(result.length > 0){
            alert('이미 사용중인 아이디입니다.');
        }else{
            alert('사용 가능한 아이디입니다.');
            setCkid(true);
        }
    }

    const Upload = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!ckid){
            alert('아이디 중복확인 검사가 필요합니다.');
            return false;
        }else{
            try{
                await Insert(formData);
                alert("정상적으로 회원가입이 되었습니다");
                nav('/login');
            }catch{
                alert('올바른 접근이 아닙니다.');
            }
        }
    }

    return(
        <div id="register" className="page">
            <h1>SIGN UP <span>회원가입 정보입력</span></h1>
            <form onSubmit={Upload}>
                <div className="mb info">
                    <h2>사이트 이용정보 입력</h2>
                    <div className="member-id">
                        <label htmlFor="mb_id" className="sound_only">아이디</label>
                        <input type="text" name="mb_id" value={formData.mb_id} id="mb_id" required placeholder="아이디" onChange={writing} />
                        <button type="button" onClick={checkId}>중복확인</button>
                    </div>
                    
                    <label htmlFor="mb_password" className="sound_only">비밀번호</label>
                    <input type="password" name="mb_password" value={formData.mb_password} id="mb_password" required placeholder="비밀번호" onChange={writing}/>
                    
                    <label htmlFor="mb_password_ck" className="sound_only">비밀번호 확인</label>
                    <input type="password" name="mb_password_ck" id="mb_password_ck" value={ckpassword} required placeholder="비밀번호 확인" onChange={(e : React.ChangeEvent<HTMLInputElement>) => setCkpassword(e.target.value)}/>
                </div>
                <div className="user info">
                    <h2>개인정보 입력</h2>
                    <label htmlFor="mb_email" className="sound_only">E-mail</label>
                    <input type="text" name="mb_email" value={formData.mb_email} id="mb_email" required placeholder="E-mail" onChange={writing}/>

                    <label htmlFor="mb_name" className="sound_only">성함</label>
                    <input type="text" name="mb_name" value={formData.mb_name} id="mb_name" required placeholder="성함" onChange={writing}/>

                    <label htmlFor="mb_phone" className="sound_only">연락처</label>
                    <input type="text" name="mb_phone" value={formData.mb_phone} id="mb_phone" required placeholder="연락처" onChange={writing}/>
                </div>
                <div className="btn-container">
                    <Link to='/'>취소</Link>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    )
}

export default Register;