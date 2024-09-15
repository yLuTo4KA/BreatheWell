import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GetInvoice, GetInvoiceBody } from "../models/getInvoice.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class PaymentService extends ApiService { 
    private urlPath = 'payment' as const;

    constructor(http: HttpClient) {
        super(http);
    }

    getInvoice(amount: number, currency: 'XTR' | 'USD'): Observable<GetInvoice>{
        const url = `${this.urlPath}/getInvoice`;

        return this.post<GetInvoice, GetInvoiceBody>(url, {amount, currency}).pipe();
    }
}