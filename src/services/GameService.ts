import { AppDataSource } from '../database/database';
import { Game } from '../database/entities/Game';
import { Platform } from '../database/entities/Platform';

export class GameService {
    // Obtain the repository for the Game entity
    private gameRepository = AppDataSource.getRepository(Game);
    private platformRepository = AppDataSource.getRepository(Platform);
    
    async getAllGames(): Promise<Game[]> {
        return this.gameRepository.find({relations:["platforms"]});
    }

    async getGame(id:number): Promise<Game | null> {
        return this.gameRepository.findOne({where: {id}, relations: ["platforms"]});
    }

    async createGame(gameData: Partial<Game>): Promise<Game | {message:string}> {
        const existingGame = await this.gameRepository.findOne({ where: { title: gameData.title } });
        if (existingGame) {
            return {message: "This game title already exists."};
        }

        const platformNames: string[] = gameData.platforms as unknown as string[];
        const platformEntities: Platform[] = [];

        for (const platformName of platformNames) {
            const platform = await this.platformRepository.findOne({ where: { name: platformName } });

            if (!platform) {
                return {message: `Platform "${platformName}" does not exist.`};
            }

            platformEntities.push(platform);
        }

        const newGame = this.gameRepository.create({
            ...gameData,
            platforms: platformEntities,
        });

        return this.gameRepository.save(newGame);
    }

    async deleteGame(id:number): Promise<{message:string}> {
        const game = await this.gameRepository.findOne({where: {id}});
        if (!game) {
            return {message: `Game does not exist.`}
        }
        await this.gameRepository.delete(id);

        return {message: `Game ${game.title} with ID ${id} has been deleted`};
    }
}