import { Lesson } from "./lesson.model"
import { Task } from "./task.model"

export interface Progress {
    todayComplete: boolean,
    lesson_learned: boolean,
    todayLesson: Lesson,
    todayTasks: Task[],
    completedTasks: number[],
    completedLessons: number[]
}