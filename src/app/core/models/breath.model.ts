import { Sound } from "./sound.model";

export interface Breath {
    id: number,
    breathDuration: number,
    exhaleDuration: number,
    breathHold: number,
    exhaleHold: number,
    duration: number,
    breath_type: "Nose" | "Mouth",
    exhale_type: "Nose" | "Mouth",
    breathText: string | null,
    exhaleText: string | null,
    sound: Sound | null,
}