import { AppDataSource } from '../database/database';
import { Game } from '../database/entities/Game';

export class GameService {
    // Obtain the repository for the Game entity
    private gameRepository = AppDataSource.getRepository(Game);
    
    async getAllGames(): Promise<Game[]> {
        return this.gameRepository.find({relations:["platforms"]});
    }

    async getGame(id:number): Promise<Game | null> {
        return this.gameRepository.findOne({where: {id}, relations: ["platforms"]});
    }

    async createGame(gameData: Partial<Game>): Promise<Game> {
        const newGame = this.gameRepository.create(gameData);
        return this.gameRepository.save(newGame);
    }
}