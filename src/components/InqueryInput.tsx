interface Inquery{
    data : string[],
    formData : string,
    nameValue : string,
    changeInput : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InqueryInput = ({data, formData, nameValue, changeInput} : Inquery) => {
    return(
        <ul className="type-select">
            {data.map((val, index) => {
                return(
                    <li key={val} className={formData === val ? 'on' : ''}>
                        <label htmlFor={`${nameValue}${index}`}>{val}</label>
                        <input type="radio" name={nameValue} value={val} id={`${nameValue}${index}`} onChange={changeInput}/>
                    </li>
                )
            })}
        </ul>
    )
}

export default InqueryInput;