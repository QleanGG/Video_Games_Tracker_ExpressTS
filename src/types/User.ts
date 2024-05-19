import { Game } from "./gameTypes";

export interface User {
    id: number;
    email: string;
    username?: string;
    oauthProvider?: string;
    oauthId?: string;
    password: string;
}

export interface UserProfile {
    id: number;
    bio: string;
    avatarUrl: string;
    favoriteGames: string;
    gamerTag: string;
    platforms: string[];
    mainPlatform: string;
    user?: User; // This can be optional
}

export interface UserGame {
    id: number;
    user?: User; // This can be optional
    game: Game;
    status: string;
    review?: string;
    rating?: number;
}
