import type { QuickConsultWriteData } from '../types/consult';
import type { CarInqueryWriteData } from '../types/consult';
import type { LeaseCarWriteData } from '../types/consult';

type ApiData = QuickConsultWriteData | CarInqueryWriteData | LeaseCarWriteData;

export const Insert = async<T extends ApiData>(url: string, data: T) => {
    const res = await fetch(`https://portfolio01-zuj0.onrender.com/${url}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error('서버 접속 실패');
    }

    return await res.json();
}

export const Select = async(url : string) => {
    const res = await fetch(`https://portfolio01-zuj0.onrender.com/${url}`);

    if(!res.ok){
        throw new Error('서버 접속 실패');
    }

    return await res.json();
}

export const SelectOne = async(url : string, id : string) => {
    const res = await fetch(`https://portfolio01-zuj0.onrender.com/${url}/${id}`);

    if(!res.ok){
        throw new Error('서버 접속 실패');
    }

    return await res.json();
}