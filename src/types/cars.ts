export interface CarOption {
    name : string,
    price? : string,
    color? : string,
}

export interface CarData {
    id : string,
    carmade : string,
    carbrand : string,
    carname : string,
    caryear : string,
    cartype : string,
    carfuel : string,
    carcolor : CarOption[],
    carmodel : CarOption[],
    caroption : CarOption[],
    carimage : string[] | null
}

export type CarWriteData = Omit<CarData, "id">;