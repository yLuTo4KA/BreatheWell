import { Injectable } from '@angular/core';
import { boolean } from '@telegram-apps/sdk';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor() { }

    set loading(value: boolean) {
        this.loadingSubject.next(value);
    }

    startLoading(): void {
        this.loading = true;
    }

    stopLoading(): void {
        this.loading = false;
    }
}
