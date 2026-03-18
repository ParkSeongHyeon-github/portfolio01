import type {CarOption} from '../types/cars';
import { Plus, Minus } from "react-feather";

interface OptionInput {
    values : CarOption[],
    datakey : string,
    AddInput : (key : string) => void,
    RemoveInput : (index : number, key : string) => void,
    ChangeInput : (field : string | null,  value : string, index : number, key : string) => void
}

const OptionInput = ({values, datakey, AddInput, RemoveInput, ChangeInput} : OptionInput) => {
    return(
        <div className="multi">
            {values.map((val, index) => {
                let keyplace : string = '';
                let valueplace : string = '';
                let data : string = '';
                if(datakey === 'carmodel'){
                    keyplace = '모델명';
                    valueplace = '가격';
                    data = 'price';
                }else if(datakey === 'caroption'){
                    keyplace = '옵션명';
                    valueplace = '가격';
                    data = 'price';

                }else if(datakey === 'carcolor'){
                    keyplace = '색상명';
                    valueplace = 'RGB';
                    data = 'color';
                }
                return(
                    <div key={index}>
                        <input type="text" value={val.name} className="input" placeholder={keyplace} onChange={(e : React.ChangeEvent<HTMLInputElement>) => ChangeInput('name', e.target.value, index, datakey)}/>

                        <input type="text" value={datakey === 'carmodel' || datakey === 'caroption' ? val.price : val.color} className="input" placeholder={valueplace} onChange={(e : React.ChangeEvent<HTMLInputElement>) => ChangeInput(data, e.target.value, index, datakey)}/>

                        {values.length > 1 && (
                            <button type="button" className="minusbtn" onClick={() => RemoveInput(index, datakey)}><Minus size={14}/></button>
                        )}
                    </div>
                )
            })}
            <button type="button" className="plusbtn" onClick={() => AddInput(datakey)}><Plus size={14}/></button>
        </div>
    )
}

export default OptionInput