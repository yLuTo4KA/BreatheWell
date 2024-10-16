export interface Practice {
    id: number,
    title: string,
    breathDuration: number,
    exhaleDuration: number,
    breathHold: number,
    exhaleHold: number,
    breath_type: "Nose" | "Mouth",
    exhale_type: "Nose" | "Mouth",
    breathText: string | null,
    exhaleText: string | null,
    duration: number,
    icon: string,
    free: boolean,
    sound: {
        id: number;
    }
}