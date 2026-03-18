import type {MemberData} from '../types/member';

export const Insert = async(data : MemberData) => {
    const res = await fetch("http://localhost:4000/member", {
        method : 'post',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify(data)
    })

    if(!res.ok){
        throw new Error('서버 접속 실패');
    }

    return true;
}

export const SelectLogin = async(id : string) => {
    const res = await fetch(`http://localhost:4000/member?mb_id=${id}`);
    if(!res.ok){
        throw new Error('서버 접속 실패');
    }

    return await res.json();
}