export interface GetInvoice {
    url: string
}

export interface GetInvoiceBody {
    amount: number,
    currency: "XTR" | "USD"
}