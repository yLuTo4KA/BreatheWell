import { Task } from "./task.model"

export interface Progress {
    todayComplete: boolean,
    lesson_learned: boolean,
    todayLesson: {
        id: number,
        title: string,
        description: string,
        reading_time: number,
        lesson_icon: string,
        lesson_preview: string
    },
    todayTasks: Task[],
    completedTasks: number[]
}