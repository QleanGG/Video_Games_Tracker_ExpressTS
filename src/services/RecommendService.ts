import { AppDataSource } from "../database/database";
import { Game } from "../database/entities/Game";
import { UserPreferencesService } from "./UserPreferencesService";

export class RecommendnService {
    private gameRepository = AppDataSource.getRepository(Game);
    private userPreferencesService = new UserPreferencesService();

    async recommendGames(userId: number, limit: number = 10): Promise<Game[]> {
        const userFavoriteGenres = await this.userPreferencesService.getUserFavoriteGenres(userId);

        if (!userFavoriteGenres.length) {
            return [];
        }

        const recommendedGames = await this.gameRepository.createQueryBuilder('game')
            .innerJoinAndSelect('game.genres', 'genre')
            .where('genre.id IN (:...genreIds)', { genreIds: userFavoriteGenres.map(genre => genre.id) })
            .limit(limit)
            .getMany();

        return recommendedGames;
    }
}
