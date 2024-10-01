import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GetInvoice, GetInvoiceBody } from "../models/getInvoice.model";
import { BehaviorSubject, finalize, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class PaymentService extends ApiService { 
    private urlPath = 'payment' as const;
    
    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor(http: HttpClient) {
        super(http);
    }

    getInvoice(amount: number, currency: 'XTR' | 'USD' | "RUB"): Observable<GetInvoice>{
        const url = `${this.urlPath}/getInvoice`;
        this.loadingSubject.next(true);
        return this.post<GetInvoice, GetInvoiceBody>(url, {amount, currency}).pipe(
            finalize(() => {
                this.loadingSubject.next(false);
            })
        );
    }
}