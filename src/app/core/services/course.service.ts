import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { GetInvoice, GetInvoiceBody } from "../models/getInvoice.model";
import { BehaviorSubject, finalize, Observable, tap } from "rxjs";
import { Progress } from "../models/progress.model";
import { Lesson, LessonsList } from "../models/lesson.model";

@Injectable({
    providedIn: 'root',
})

export class CourseService extends ApiService {
    private urlPath = '' as const;

    private userProgressSubject = new BehaviorSubject<Progress | null>(null);
    private lessonSubject = new BehaviorSubject<Lesson | null>(null);
    private lessonsListSubject = new BehaviorSubject<LessonsList[] | null>(null);


    userProgress$ = this.userProgressSubject.asObservable();
    lesson$ = this.lessonSubject.asObservable();
    lessonsList$ = this.lessonsListSubject.asObservable();

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

    setUserProgress(data: Progress): void {
        this.userProgressSubject.next(data);
    }
    setLesson(data: Lesson): void {
        this.lessonSubject.next(data);
    }
    setLessonsList(data: LessonsList[]): void {
        this.lessonsListSubject.next(data);
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
        return this.get<Lesson>(url).pipe(
            tap(response => {
                this.setLesson(response);
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


    
}