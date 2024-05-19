import { AppDataSource } from '../database/database';
import { UserGame, GameStatus } from '../database/entities/UserGame';
import { Game } from '../database/entities/Game';
import { User } from '../database/entities/User';

class UserGameService {
    private userGameRepository = AppDataSource.getRepository(UserGame);
    private gameRepository = AppDataSource.getRepository(Game);
    private userRepository = AppDataSource.getRepository(User);

    async addUserGame(userId: number, gameId: number, status: GameStatus, rating?: number, review?: string): Promise<UserGame | { message: string }> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return { message: "User not found" };
        }

        const game = await this.gameRepository.findOne({ where: { id: gameId } });
        if (!game) {
            return { message: "Game not found" };
        }

        const existingUserGame = await this.userGameRepository.findOne({ where: { user: { id: userId }, game: { id: gameId } } });
        if (existingUserGame) {
            return { message: "User already has this game added" };
        }

        const userGame = this.userGameRepository.create({ user, game, status, rating, review });
        await this.userGameRepository.save(userGame);

        return userGame;
    }

    async getUserGames(userId: number): Promise<UserGame[]> {
        return await this.userGameRepository.find({ where: { user: { id: userId } }, relations: ['game'] });
    }

    async updateUserGame(userId: number, gameId: number, status: GameStatus, review?: string, rating?: number): Promise<UserGame | { message: string }> {
        const userGame = await this.userGameRepository.findOne({ where: { user: { id: userId }, game: { id: gameId } } });
        if (!userGame) {
            return { message: "User game not found" };
        }

        if (status !== undefined) userGame.status = status;
        if (rating !== undefined) userGame.rating = rating;
        if (review !== undefined) userGame.review = review;

        await this.userGameRepository.save(userGame);

        return userGame;
    }

    async deleteUserGame(userId: number, gameId: number): Promise<{ message: string }> {
        const userGame = await this.userGameRepository.findOne({ where: { user: { id: userId }, game: { id: gameId } } });
        if (!userGame) {
            return { message: "User game not found" };
        }

        await this.userGameRepository.remove(userGame);
        return { message: "User game removed successfully" };
    }
}

export default UserGameService;
