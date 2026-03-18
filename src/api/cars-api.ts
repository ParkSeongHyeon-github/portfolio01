const BASE_URL = "https://portfolio01-zuj0.onrender.com/api";
import type {CarWriteData} from '../types/cars';

export const Insert = async(data : CarWriteData) => {
    const res = await fetch(`${BASE_URL}/cars`, {
        method :'post',
        headers: { 'content-type': 'application/json' },
        body : JSON.stringify(data)
    })
    if(!res.ok) throw new Error('서버 접속 실패');
    return true;
}

export const Select = async(limit?: number) => {
    let url = `${BASE_URL}/cars`;
    if(limit) url += `?_page=1&_per_page=${limit}`;
    const res = await fetch(url);
    if(!res.ok) throw new Error('서버 접속 실패');
    return await res.json();
}

export const SelectOne = async(id : string) => {
    const res = await fetch(`${BASE_URL}/cars/${id}`);
    if(!res.ok) throw new Error('서버 접속 실패');
    return await res.json();
}

export const Update = async(data : CarWriteData, id : string) => {
    const res = await fetch(`${BASE_URL}/cars/${id}`, {
        method :'put',
        headers: { 'content-type': 'application/json' },
        body : JSON.stringify(data)
    });
    if(!res.ok) throw new Error('서버 접속 실패');
    return true;
}

export const Delete = async(id : string) => {
    const res = await fetch(`${BASE_URL}/cars/${id}`, { method: 'delete' });
    if(!res.ok) throw new Error('서버 접속 실패');
    return true;
}