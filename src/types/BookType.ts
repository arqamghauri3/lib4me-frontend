export type book = {
    id: number | string,
    image: string,
    name: string,
    author: string,
    genre: string[],
    description?: string,
    releaseDate?: Date
}