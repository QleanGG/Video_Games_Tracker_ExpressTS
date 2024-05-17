import { Request,Response } from "express";
import { GameService } from "../services/GameService";

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

    async gatGame(req: Request, res: Response): Promise<void> {
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
}