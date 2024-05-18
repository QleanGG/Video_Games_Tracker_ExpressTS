import { Request,Response } from "express";
import { GameService } from "../services/GameService";
import { Game } from "../types/gameTypes";

export class GameController {
    private gameService: GameService;

    constructor() {
        this.gameService = new GameService();
    }

    async getAllGames(req: Request, res: Response): Promise<void> {
        try {
            const games = await this.gameService.getAllGames();
            res.json(games)
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({message: error.message})
            } else {
                res.status(500).json({message: "unexpected error occured"})
            }
        }
    }

    async getGame(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            const game = await this.gameService.getGame(Number(id));
            if (game) {
                res.json(game)
            } else {
                res.status(400).json({message: 'Game not found'});
            }

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({message: error.message})
            } else {
                res.status(500).json({message: "unexpected error occured"})
            }
        }
    }

    async createGame(req: Request, res: Response): Promise<void> {
        try {
            const gameData = req.body;
            const result = await this.gameService.createGame(gameData);
            if ('message' in result) {
                res.status(400).json(result);
            } else {
                res.status(201).json(result);
            }

        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async deleteGame(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            const result = await this.gameService.deleteGame(Number(id));
            res.json(result);
        } catch (error) {
            res.status(500).json({message: (error as Error).message});
        }
    }
}