export interface QuickConsult {
    id : string,
    carbrand : string,
    carname : string,
    carperiod : string,
    username : string,
    userphone : string
}

export interface CarModel {
    name : string,
    price : string
}

export interface CarInquery{
    id : string,
    carmade : string,
    carbrand : string,
    carname : string,
    caryear : string,
    cartype : string,
    carfuel : string,
    carcolor : string,
    carmodel : CarModel,
    caroption : CarModel[],
    usetype : string,
    useperiod : string,
    security : string,
    securitypay : string | null,
    advance : string,
    advancepay : string | null,
    Insuranceage : string,
    mileage : string,
    totalprice : string,
    username : string,
    userphone : string
}

export interface LeaseCar{
    id : string,
    carbrand : string,
    carname : string,
    carmodel : CarModel,
    monthprice : string,
    useperiod : string,
    advance : string,
    username : string,
    userphone : string
}

export type QuickConsultWriteData = Omit<QuickConsult, "id">;
export type CarInqueryWriteData = Omit<CarInquery, "id">;
export type LeaseCarWriteData = Omit<LeaseCar, "id">;
