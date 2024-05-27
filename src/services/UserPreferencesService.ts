import { AppDataSource } from "../database/database";
import { UserGame } from "../database/entities/UserGame";
import { Genre } from "../database/entities/Genre";

export class UserPreferencesService {
    private userGameRepository = AppDataSource.getRepository(UserGame);
    private genreRepository = AppDataSource.getRepository(Genre);

    async getUserFavoriteGenres(userId: number): Promise<Genre[]> {
        const userGames = await this.userGameRepository.find({
            where: { user: { id: userId } },
            relations: ["game", "game.genres"]
        });

        const genreCounts: { [key: string]: number } = {};

        userGames.forEach(userGame => {
            userGame.game.genres.forEach(genre => {
                if (!genreCounts[genre.id]) {
                    genreCounts[genre.id] = 0;
                }
                genreCounts[genre.id] += 1;
            });
        });

        const favoriteGenreIds = Object.entries(genreCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([id]) => parseInt(id))
            .slice(0, 5); // Return top 5 genres

        return this.genreRepository.findByIds(favoriteGenreIds);
    }
}
