import { Benefit } from "./benefit.model";
import { Task } from "./task.model";

export interface lesson {
    id: number,
    title: string,
    description: string,
    reading_time: number,
    free: boolean,
    tasks: Task[],
    benefits: Benefit[],
    content: {
        images: {url: string}[],
        text: string,
        sources: {title: string, url: string}[]
    }
}