export interface Sound {
    id: number,
    title: string,
    free: boolean,
    soundMedia: {
        id: number,
        url: string,
        name: string,
        alternativeText: string | null
    },
    iconMedia: {
        id: number,
        url: string,
        name: string,
        alternativeText: string | null
    }
}