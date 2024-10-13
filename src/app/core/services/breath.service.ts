import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap, throwError } from "rxjs";
import { Sound } from "../models/sound.model";
import { Practice } from "../models/practice.model";
import { Breath } from "../models/breath.model";

interface SoundResponse {
    data: Sound[],
    meta?: any
}
interface PracticeResponse {
    data: Practice[],
    meta?: any
}

@Injectable({
    providedIn: 'root',
})

export class BreathService extends ApiService {
    private urlPath: string = '' as const;


    private soundsSubject: BehaviorSubject<Sound[] | null> = new BehaviorSubject<Sound[] | null>(null);
    private practicesSubject: BehaviorSubject<Practice[] | null> = new BehaviorSubject<Practice[] | null>(null);
    private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    sounds$: Observable<Sound[] | null> = this.soundsSubject.asObservable();
    practices$: Observable<Practice[] | null> = this.practicesSubject.asObservable();
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    private breathSettingModel: Breath = {
        id: 0,
        breathDuration: 4,
        exhaleDuration: 4,
        breathHold: 3,
        exhaleHold: 3,
        duration: 3 * 60,
        sound: null,
        breath_type: "Nose",
        exhale_type: "Mouth",
        breathText: null,
        exhaleText: null
    }
    private noSound: Sound = {
        id: -1,
        title: "Без звука",
        free: false,
        soundMedia: {
            id: -1,
            url: "",
            name: "",
            alternativeText: null
        },
        iconMedia: {
            id: -1,
            url: "assets/icons/no-sound.svg",
            name: "",
            alternativeText: null
        }
    }

    breathSetting$: BehaviorSubject<Breath> = new BehaviorSubject<Breath>(this.breathSettingModel);

    constructor(http: HttpClient) {
        super(http);
    }

    getSounds(): Observable<Sound[]> {
        const url = `${this.urlPath}sounds?populate[iconMedia]=url&populate[soundMedia]=url`;
        const cachedData = this.soundsSubject.value;

        if (cachedData) {
            return of(cachedData);
        }

        return this.get<SoundResponse>(url).pipe(
            map(response => response.data),
            tap(sounds => {
                this.soundsSubject.next(sounds);
            }),
            finalize(() => {
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }

    getPractice(): Observable<Practice[]> {
        const url = `${this.urlPath}practices?populate[sound]=url`;
        const cachedData = this.practicesSubject.value;

        if (cachedData) {
            return of(cachedData);
        }

        return this.get<PracticeResponse>(url).pipe(
            map(response => response.data),
            tap(practices => {
                this.practicesSubject.next(practices);
                this.updatePractice(practices[0], 3);
            }),
            finalize(() => {
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        )
    }

    updateSound(sound: Sound | null): void {
        const updatedBreathSettings = this.breathSetting$.getValue();

        updatedBreathSettings['sound'] = sound == null ? this.noSound : sound;

        this.breathSetting$.next(updatedBreathSettings);
    }

    updateDuration(duration: number): void {
        const updatedBreathSettings = this.breathSetting$.getValue();

        updatedBreathSettings['duration'] = duration * 60;

        this.breathSetting$.next(updatedBreathSettings);
    }

    updatePractice(practice: Practice, duration?: number): void {
        // Получаем массив звуков из soundsSubject
        const sounds = this.soundsSubject.getValue();
        const practiceDuration = duration ? duration : practice.duration;
    
        // Находим звук, если он существует
        const sound = practice.sound && practice.sound.id
            ? sounds?.find(item => item.id === practice.sound.id) ?? null
            : null;
    
        // Создаем объект для обновления
        const updateData: Breath = {
            sound,
            id: practice.id,
            breathDuration: practice.breathDuration,
            exhaleDuration: practice.exhaleDuration,
            breathHold: practice.breathHold,
            exhaleHold: practice.exhaleHold,
            duration: practiceDuration * 60,
            breath_type: practice.breath_type,
            exhale_type: practice.exhale_type,
            breathText: practice.breathText,
            exhaleText: practice.exhaleText
        };
    
        // Отправляем данные обновления
        this.breathSetting$.next(updateData);
    }
    


}