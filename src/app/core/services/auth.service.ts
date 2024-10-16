import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { TelegramService } from "./telegram.service";
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from "rxjs";
import { environment } from "src/environments/environments";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

interface AuthData {
    "jwt": string,
    "user": User,
    "newUser": boolean
}
interface DayliData {
    user: User,
    success: boolean
}
@Injectable({
    providedIn: 'root',
})

export class AuthService extends ApiService {
    private urlPath = '' as const;
    telegramService = inject(TelegramService);
    router = inject(Router);

    private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getToken());
    private userDataSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private newUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    token$: Observable<string | null> = this.tokenSubject.asObservable();
    user$: Observable<User | null> = this.userDataSubject.asObservable();
    newUser$: Observable<boolean> = this.newUserSubject.asObservable();

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
    isGetDayli(): boolean {
        return !this.userDataSubject.value!.todayActive;
    }
    isPremium(): boolean {
        return !this.userDataSubject.value!.premium;
    }

    auth(): Observable<AuthData> {
        const url = `${this.urlPath}auth/local/register`;
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
        return this.post<AuthData, any>(url, params).pipe(
            tap(response => {
                if (response) {
                    this.setToken(response.jwt);
                    this.setUserData(response.user);
                    this.newUserSubject.next(response.newUser);
                }
            }),
            finalize(() => {
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        )
    }

    getProfile(): Observable<User> {
        const url = `${this.urlPath}users/me`;
        console.log(url);
        return this.get<User>(url).pipe(
            tap(response => {
                this.setUserData(response);
                console.log(response);
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }


    dayliCheck(): Observable<DayliData> {
        const url = `${this.urlPath}auth/dayli-check`;

        return this.get<DayliData>(url).pipe(
            tap(response => {
                this.setUserData(response.user);
            }),
            finalize(() => {

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