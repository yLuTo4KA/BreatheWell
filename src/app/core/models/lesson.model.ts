import { Benefit } from "./benefit.model";
import { Task } from "./task.model";
import { Highlight } from "./highlight.model";

export interface Lesson {
    id: number,
    title: string,
    subtitle: string,
    description: string,
    reading_time: number,
    icon: string,
    preview: string,
    free: boolean,
    tasks: Task[],
    benefits: Benefit[],
    content: {
        image: string | null,
        text: string,
        sources: { title: string, url: string }[]
    },
    highlights: Highlight[] | null,
}

export interface LessonsList {
    id: number,
    title: string,
    subtitle: string,
    icon: string,
    free: boolean
}