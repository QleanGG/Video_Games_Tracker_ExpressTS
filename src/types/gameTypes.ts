import { Platform } from "./platformTypes";


export interface Game {
    id: number;
    title: string;
    genre: string;
    description: string;
    platforms: Platform[]
    publisher: string;
    developer: string;
    releaseDate: Date;
    rating: number;
    imageUrl: string;
}