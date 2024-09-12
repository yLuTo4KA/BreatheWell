export interface User {
    activeDays: number,
    blocked: boolean,
    lastActiveDate: Date | null,
    id: number | string,
    username: string,
    language_code: string,
    avatar: string | null,
    premium: boolean,
    lastVisit: Date,
    tg_id: string,
    todayActive: boolean,
}