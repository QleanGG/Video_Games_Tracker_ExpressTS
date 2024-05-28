import { In } from "typeorm";
import { AppDataSource } from "../database/database";
import { Game } from "../database/entities/Game";
import { Platform } from "../database/entities/Platform";

export class GameService {
	// Obtain the repository for the Game entity
	private gameRepository = AppDataSource.getRepository(Game);
	private platformRepository = AppDataSource.getRepository(Platform);

	async getAllGames(): Promise<Game[]> {
		return this.gameRepository.find({ relations: ["platforms", "genres"] }); // calling relations to get all the platforms this game hasP
	}

	async getGame(id: number): Promise<Game | null> {
		return this.gameRepository.findOne({
			where: { id },
			relations: ["platforms", "genres"],
		});
	}

	async createGame(gameData: Partial<Game>): Promise<Game | { message: string }> {
		const existingGame = await this.gameRepository.findOne({
			where: { title: gameData.title },
		});
		if (existingGame) {
			return { message: "This game title already exists." };
		}

		const platforms = await this.getPlatformsFromNames(gameData.platforms || []);
		const newGame = this.gameRepository.create({
			...gameData,
			platforms,
		});

		return this.gameRepository.save(newGame);
	}

	async deleteGame(id: number): Promise<{ message: string }> {
		const game = await this.gameRepository.findOne({ where: { id } });
		if (!game) {
			return { message: `Game does not exist.` };
		}
		//! deleting the game after checks
		await this.gameRepository.delete(id);

		return { message: `Game ${game.title} with ID ${id} has been deleted` };
	}

	async updateGame(id: number, gameData: Partial<Game>): Promise<Game | { message: string }> {
		const game = await this.gameRepository.findOne({ where: { id } });
		if (!game) {
			return { message: "Game does not exist." };
		}

		if (gameData.platforms) {
			const platforms = await this.getPlatformsFromNames(gameData.platforms);
			gameData.platforms = platforms as unknown as Platform[];
		}

		const updatedGame = this.gameRepository.merge(game, gameData);
		await this.gameRepository.save(updatedGame);
		return updatedGame as Game;
	}

	private async getPlatformsFromNames(platforms: Platform[] | string[]): Promise<Platform[]> {
		const platformNames = platforms.map((p: Platform | string) =>
			typeof p === "string" ? p : p.name
		);
		return this.platformRepository.find({
			where: { name: In(platformNames) },
		});
	}

	async getFeaturedGames(): Promise<Game[]> {
		// Ensure limit is a valid number and handle edge cases
		return this.gameRepository.find({
			order: {
				rating: "DESC", 
			},
			relations: ["platforms", "genres"],
			take:10
		});
	}
}
