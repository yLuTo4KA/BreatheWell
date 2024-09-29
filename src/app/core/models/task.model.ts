import { AudioLesson } from "./audio-lessons.model";
import { Practice } from "./practice.model";

export interface Task {
    id: number,
    title: string,
    description: string,
    preview_icon: string,
    task_image: string,
    lesson?: any,
    audio_lesson?: AudioLesson | null,
    practice?: Practice | null
}