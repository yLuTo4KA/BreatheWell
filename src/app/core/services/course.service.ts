import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { GetInvoice, GetInvoiceBody } from "../models/getInvoice.model";
import { BehaviorSubject, finalize, Observable, tap } from "rxjs";
import { Progress } from "../models/progress.model";

@Injectable({
    providedIn: 'root',
})

export class CourseService extends ApiService { 
    private urlPath = '' as const;

    private userProgressSubject = new BehaviorSubject<Progress | null>(null);
    
    userProgress$ = this.userProgressSubject.asObservable();

    constructor(http: HttpClient) {
        super(http);
    }

    setUserProgress(data: Progress): void {
        this.userProgressSubject.next(data);
    }

    getUserProgress(): Observable<Progress> {
        const url = `${this.urlPath}course-progresses`;
        return this.get<Progress>(url).pipe(
            tap(response => {
                this.setUserProgress(response);
            })
        );
    }
}