import type {CarWriteData} from '../types/cars';

export const Insert = async(data : CarWriteData) => {
    const res = await fetch("http://localhost:4000/cars", {
        method :'post',
        body : JSON.stringify(data)
    })

    if(!res.ok){
        throw new Error('서버 접속 실패')
    }

    return true;
}

export const Update = async(data : CarWriteData, id : string) => {
    const res = await fetch(`http://localhost:4000/cars/${id}`, {
        method :'put',
        body : JSON.stringify(data)
    })

    if(!res.ok){
        throw new Error('서버 접속 실패')
    }

    return true;
}

export const Select = async(limit?: number) => {
    let url = "http://localhost:4000/cars";

    if (limit) {
        url += `?_page=1&_per_page=${limit}`;
    }
    const res = await fetch(url);
    if(!res.ok){
        throw new Error('서버 접속 실패')
    }
    return await res.json();
}

export const SelectOne = async(id : string) => {
    const res = await fetch(`http://localhost:4000/cars/${id}`);
    if(!res.ok){
        throw new Error('서버 접속 실패')
    }

    return await res.json();
}

export const Delete = async(id : string) => {
    const res = await fetch(`
        http://localhost:4000/cars/${id}`, {
        method: 'delete'
    })

    if(!res.ok){
        throw new Error('서버 접속 실패')
    }

    return true;
}