import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { GetInvoice, GetInvoiceBody } from "../models/getInvoice.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Price } from "../models/price.model";
import { environment } from "src/environments/environments";

interface PricesResponse {
    data: Price[],
    meta: any,
}

@Injectable({
    providedIn: 'root',
})

export class PriceService extends ApiService {
    private urlPath = 'prices' as const;

    private pricesSubject: BehaviorSubject<Price[]> = new BehaviorSubject<Price[]>([]);

    prices$ = this.pricesSubject.asObservable();

    constructor(http: HttpClient) {
        super(http);
    }

    getPrice(currency: "XTR"): Price {
        const price = this.pricesSubject.value.find(item => item.attributes.currency === currency) || environment.defaultPrice as Price;
        return price;
    }


    getPrices(): Observable<PricesResponse> {
        return this.get<PricesResponse>(this.urlPath).pipe(
            tap((response) => {
                this.pricesSubject.next(response.data);
            })
        )
    }
}