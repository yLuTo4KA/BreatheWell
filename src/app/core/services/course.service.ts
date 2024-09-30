import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { GetInvoice, GetInvoiceBody } from "../models/getInvoice.model";
import { BehaviorSubject, finalize, Observable, tap } from "rxjs";
import { Progress } from "../models/progress.model";
import { Lesson, LessonsList } from "../models/lesson.model";
import { AudioLesson } from "../models/audio-lessons.model";
import { Task } from "../models/task.model";
import { LoadingService } from "./loading.service";

@Injectable({
    providedIn: 'root',
})

export class CourseService extends ApiService {
    private loading = inject(LoadingService);
    private urlPath = '' as const;

    private userProgressSubject = new BehaviorSubject<Progress | null>(null);
    private lessonSubject = new BehaviorSubject<Lesson | null>(null);
    private lessonsListSubject = new BehaviorSubject<LessonsList[] | null>(null);
    private audioLessonsListSubject = new BehaviorSubject<AudioLesson[] | null>(null);
    private currentAudioLessonSubject = new BehaviorSubject<AudioLesson | null>(null);
    private currentTaskSubject = new BehaviorSubject<Task | null>(null);


    userProgress$ = this.userProgressSubject.asObservable();
    lesson$ = this.lessonSubject.asObservable();
    lessonsList$ = this.lessonsListSubject.asObservable();
    audioLessonsList$ = this.audioLessonsListSubject.asObservable();
    currentAudioLesson$ = this.currentAudioLessonSubject.asObservable();
    currentTask$ = this.currentTaskSubject.asObservable();

    constructor(http: HttpClient) {
        super(http);
    }

    getLessonsCount(): number {
        const list = this.lessonsListSubject.value;
        if(list) {
            return list.length;
        }
        return 0;
    }

    getCurrentLessonId(): number | null{
        return this.userProgressSubject.value?.todayLesson.id ?? null;
    }

    setUserProgress(data: Progress): void {
        this.userProgressSubject.next(data);
    }

    setLesson(data: Lesson): void {
        this.lessonSubject.next(data);
    }

    setLessonsList(data: LessonsList[]): void {
        this.lessonsListSubject.next(data);
    }

    setAudioLessons(data: AudioLesson[]): void {
        this.audioLessonsListSubject.next(data);
    }

    setCurrentAudioLesson(data: AudioLesson): void {
        this.currentAudioLessonSubject.next(data);
    }

    setCurrentTask(task: Task): void {
        this.currentTaskSubject.next(task);
    }

    getUserProgress(): Observable<Progress> {
        const url = `${this.urlPath}course-progresses`;
        return this.get<Progress>(url).pipe(
            tap(response => {
                this.setUserProgress(response);
            })
        );
    }

    updateTask(completedTasks: number[]): Observable<Progress> {
        const url = `${this.urlPath}complete-task`;
        return this.post<Progress, { completedTasks: number[] }>(url, { completedTasks }).pipe(
            tap(response => {
                this.setUserProgress(response);
            })
        )
    }

    learnLesson(id: number): Observable<Progress> {
        const url = `${this.urlPath}learn-lesson`;
        return this.post<Progress, { lessonId: number }>(url, {lessonId: id}).pipe(
            tap(response => {
                this.setUserProgress(response);
            })
        )
    }

    getLesson(id: number): Observable<Lesson> {
        const url = `${this.urlPath}lessons/${id}`
        this.loading.startLoading();
        return this.get<Lesson>(url).pipe(
            tap(response => {
                this.setLesson(response);
                this.setCurrentTask(response.tasks[0]);
            }),
            finalize(() => {
                this.loading.stopLoading();
            })
        );
    }

    getLessons(): Observable<LessonsList[]> {
        const url = `${this.urlPath}lessons`;
        return this.get<LessonsList[]>(url).pipe(
            tap(response => {
                this.setLessonsList(response);
            })
        )
    }

    getAudioLessons(): Observable<AudioLesson[]> {
        const url = `${this.urlPath}audio-lessons`;
        
        return this.get<AudioLesson[]>(url).pipe(
            tap(response => {
                this.setAudioLessons(response);
                this.setCurrentAudioLesson(response[0]);
            })
        )
    }


    
}