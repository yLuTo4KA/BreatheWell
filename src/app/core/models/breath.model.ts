import { Sound } from "./sound.model";

export interface Breath {
    id: number,
    breathDuration: number,
    exhaleDuration: number,
    breathHold: number,
    exhaleHold: number,
    duration: number,
    sound: Sound | null,
}