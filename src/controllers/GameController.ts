import { Request, Response } from "express";
import { GameService } from "../services/GameService";
import { Game } from "../database/entities/Game";
import { log } from "console";

export class GameController {
	private gameService: GameService;

	constructor() {
		this.gameService = new GameService();
	}

	async getAllGames(req: Request, res: Response): Promise<void> {
		const { page = 1, limit = 12, search = '', genre='' } = req.query;
	
		const games = await this.gameService.getAllGames(Number(page), Number(limit), String(search), String(genre));
		res.json(games);
	  }

	async getGameByIdentifier(req: Request, res: Response): Promise<void> {
		const { identifier } = req.params;
		let game;

		if (isNaN(Number(identifier))) {
			// identifier is a slug
			game = await this.gameService.getGameBySlug(identifier);
		} else {
			// identifier is an id
			game = await this.gameService.getGame(Number(identifier));
		}

		if (game) {
			res.json(game);
		} else {
			res.status(404).json({ message: "Game not found" });
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

	async getGameBySlug(req: Request, res: Response) {
		const { slug } = req.params;
		const game = await this.gameService.getGameBySlug(slug);
		if (!game) {
		  return res.status(404).json({ message: 'Game not found' });
		}
		return res.json(game);
	  }
}
