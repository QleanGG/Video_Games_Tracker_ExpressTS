import { Request, Response } from "express";
import { GameService } from "../services/GameService";
import { Game } from "../database/entities/Game";

export class GameController {
	private gameService: GameService;

	constructor() {
		this.gameService = new GameService();
	}

	async getAllGames(req: Request, res: Response): Promise<void> {
		const games = await this.gameService.getAllGames();
		res.json(games);
	}

	async getGame(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const game = await this.gameService.getGame(Number(id));
		if (game) {
			res.json(game);
		} else {
			res.status(400).json({ message: "Game not found" });
		}
	}

	async createGame(req: Request, res: Response): Promise<void> {
		const gameData = req.body;
		const result = await this.gameService.createGame(gameData);
		if ("message" in result) {
			res.status(400).json(result);
		} else {
			res.status(201).json(result);
		}
	}

	async deleteGame(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const result = await this.gameService.deleteGame(Number(id));
		res.json(result);
	}

	async updateGame(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const updGameData: Partial<Game> = req.body;
		const result = await this.gameService.updateGame(Number(id), updGameData);
		if ("message" in result) {
			res.status(400).json(result);
		} else {
			res.status(200).json(result);
		}
	}

	async getFeaturedGames(req: Request, res: Response): Promise<void> {
		const games = await this.gameService.getFeaturedGames();
		res.json(games);
	}
}
