export interface User {
    _id: string,
    id: number | string,
    username: string,
    first_name: string,
    last_name: string,
    language_code: string,
    avatar: string | null,
    ref_ket: string,
    invited: boolean,
    subscription: boolean,
    last_visit: Date
}