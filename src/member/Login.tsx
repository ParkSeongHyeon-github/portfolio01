import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginData } from '../types/member';
import { SelectLogin } from '../api/member-api';

const Login = ({setLoginUser} : {setLoginUser : (user : string | null) => void}) => {
    const nav = useNavigate();
    const [formData, setFormData] = useState<LoginData>({
        mb_id : '',
        mb_password : '',
    })

    const writing = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name] : value}));
    }

    const loginsubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const result = await SelectLogin(formData.mb_id);
            if(formData.mb_password === result[0].mb_password){
                const role = result[0].mb_id === 'admin' ? '관리자' : '회원';
                localStorage.setItem('login', role);
                setLoginUser(role);
                alert(`${role}님 로그인이 완료 되었습니다.`);
                nav('/');
            }else{
                alert('비밀번호가 틀렸습니다.');
                return false;
            }
        }catch{
            alert('올바른 접근이 아닙니다.');
        }
    }


    return(
        <div id="login" className="page">
            <h1>MEMBER LOGIN</h1>
            <form onSubmit={loginsubmit}>
                <label htmlFor="login_id" className="sound_only">아이디</label>
                <input type="text" name="mb_id" id="login_id" required placeholder="아이디" onChange={writing}/>
                <label htmlFor="login_password" className="sound_only">비밀번호</label>
                <input type="password" name="mb_password" id="login_password" required placeholder="비밀번호" onChange={writing}/>
                <button type="submit">로그인</button>
            </form>
        </div>
    )
}

export default Login;