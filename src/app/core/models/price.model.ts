export interface Price {
    id: number,
    attributes: {
        "amount": number,
        "createdAt": string | Date,
        "updatedAt": string | Date,
        "publishedAt": string | Date,
        "sale": number,
        "currency": "XTR" | "RUB",
        "currency_name"?: string,
        "sale_price": number,
    }
}