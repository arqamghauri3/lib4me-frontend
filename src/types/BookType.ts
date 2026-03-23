export type book = {
    id: number,
    image: string,
    name: string,
    author: string,
    genre: string[],
    description?: string,
    releaseDate?: Date
}