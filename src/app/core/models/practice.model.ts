export interface Practice {
    id: number,
    title: string,
    breathDuration: number,
    exhaleDuration: number,
    breathHold: number,
    exhaleHold: number,
    duration: number,
    icon: string,
    free: boolean,
    sound: {
        id: number;
    }
}