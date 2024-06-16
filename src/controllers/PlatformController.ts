import { Request, Response } from "express";
import { PlatformService } from "../services/PlatformService";
import { Platform } from "../database/entities/Platform";

export class PlatformController {
	private platformService: PlatformService;

	constructor() {
		this.platformService = new PlatformService();
	}

	async getAllPlatforms(req: Request, res: Response): Promise<void> {
		const platforms = await this.platformService.getAllPlatforms();
		res.json(platforms);
	}

	// async getGamesByPlatform(req: Request, res: Response): Promise<void> {
	//     const { platformId } = req.params;
	//     const { page = 1, limit = 12 } = req.query;

	//     const games = await this.platformService.getGamesByPlatform(Number(platformId), Number(page), Number(limit));
	//     res.json(games);
	// }

	async getGamesByPlatformName(req: Request, res: Response): Promise<void> {
		const { platformName } = req.params;
		const { page = 1, limit = 10, search= '', genre= '' } = req.query;

		const games = await this.platformService.getGamesByPlatformName(
			platformName,
			Number(page),
			Number(limit),
			String(search),
			String(genre)
		);
		res.json(games);
	}

	async createPlatform(req: Request, res: Response): Promise<void> {
		const platformData = req.body;
		const result = await this.platformService.createPlatform(platformData);
		if ("message" in result) {
			res.status(400).json(result);
		} else {
			res.status(201).json(result);
		}
	}

	async deletePlatform(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const result = await this.platformService.deletePlatform(Number(id));
		res.json(result);
	}

	async updatePlatform(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const platformData: Partial<Platform> = req.body;
		const result = await this.platformService.updatePlatform(Number(id), platformData);
		if ("message" in result) {
			res.status(400).json(result);
		} else {
			res.status(200).json(result);
		}
	}
}
