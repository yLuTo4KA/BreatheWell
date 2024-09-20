import { Benefit } from "./benefit.model";
import { Task } from "./task.model";

export interface Lesson {
    id: number,
    title: string,
    description: string,
    reading_time: number,
    icon: string,
    preview: string,
    free: boolean,
    tasks: Task[],
    benefits: Benefit[],
    content: {
        images: {url: string}[],
        text: string,
        sources: {title: string, url: string}[]
    }
}

export interface LessonsList {
    id: number,
    title: string,
    subtitle: string,
    icon: string,
    free: boolean
}