import { useEffect, useState } from "react";
import { Select, SelectOne } from "../api/consult-api";

export const useSelect = <Typename>(type : string) => {
    const [data, setData] = useState<Typename[]>([]);

    useEffect(() => {
        const load = async() => {
            try{
                const result = await Select(type);
                setData(result);
            }catch{ 
                alert('올바른 접근이 아닙니다.');
            }
        }
        load()
    }, [type])

    return data;
}

export const useSelectOne = <Typename>(type : string, id : string) => {
    const [data, setData] = useState<Typename>();

    useEffect(() => {
        if(id){
            const load = async() => {
                try{
                    const result = await SelectOne(type, id);
                    setData(result);
                }catch{ 
                    alert('올바른 접근이 아닙니다.');
                }
            }
            load()
        }
    }, [type, id])

    return data;

}