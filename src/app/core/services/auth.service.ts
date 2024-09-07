import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { TelegramService } from "./telegram.service";
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environments";
import { User } from "../models/user.mode";
import { Router } from "@angular/router";

interface AuthData {
    "token": string,
    "user": User
}
@Injectable({
    providedIn: 'root',
})

export class AuthService extends ApiService {
    private urlPath = '' as const;
    telegramService = inject(TelegramService);
    router = inject(Router);

    private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getToken());
    private userDataSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    loading$: Observable<boolean> = this.loadingSubject.asObservable();
    token$: Observable<string | null> = this.tokenSubject.asObservable();
    user$: Observable<User | null> = this.userDataSubject.asObservable();

    constructor(http: HttpClient) {
        super(http);
    }

    setToken(token: string): void {
        localStorage.setItem("token", token);
        this.tokenSubject.next(token);
    }
    getToken(): string | null {
        return localStorage.getItem("token");
    }
    setUserData(userData: User | null): void {
        this.userDataSubject.next(userData);
    }

    isLoggin(): boolean {
        return !!this.getToken();
    }

    auth(): Observable<AuthData> {
        const url = `${this.urlPath}auth`;
        let params;
        if (!environment.production) {
            params = {
                "initData": environment.initData
            }
        } else {
            params = {
                "initData": this.telegramService.initData()
            }
        }
        this.loadingSubject.next(true);
        return this.post<AuthData, any>(url, params).pipe(
            tap(response => {
                if (response) {
                    this.setToken(response.token);
                    this.setUserData(response.user);
                }
            }),
            finalize(() => {
                this.loadingSubject.next(false);
                this.router.navigate(['/welcome']);
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        )
    }

    deauth(): void {
        localStorage.removeItem("token");
        this.tokenSubject.next(null);
        this.userDataSubject.next(null);
      }
}