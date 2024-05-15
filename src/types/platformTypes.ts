import { Game } from "./gameTypes";

export interface Platform {
    id: number;
    name: string;
    games: Game
}