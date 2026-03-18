export interface MemberData {
    mb_id : string,
    mb_password : string,
    mb_email : string,
    mb_name : string,
    mb_phone : string,
}

export type LoginData = Pick<MemberData, 'mb_id' | 'mb_password'>