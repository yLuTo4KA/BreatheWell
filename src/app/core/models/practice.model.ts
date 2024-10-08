export interface Practice {
    id: number,
    title: string,
    breathDuration: number,
    exhaleDuration: number,
    breathHold: number,
    exhaleHold: number,
    duration: number,
    iconText: string,
    sound: {
        id: number;
    }
}