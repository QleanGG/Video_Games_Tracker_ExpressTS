import { Request, Response } from 'express';
import UserGameService from '../services/UserGameService';
import { GameStatus } from '../database/entities/UserGame';

class UserGameController {
    private userGameService: UserGameService;

    constructor() {
        this.userGameService = new UserGameService();
    }

    async addUserGame(req: Request, res: Response): Promise<void> {
        const { gameId, status, rating, review } = req.body;
        const userId = (req.user as any).id;
        const result = await this.userGameService.addUserGame(userId, gameId, status as GameStatus, rating, review);
        if ('message' in result) {
            res.status(400).json(result);
        } else {
            res.status(201).json(result);
        }
    }

    async getUserGames(req: Request, res: Response): Promise<void> {
        const userId = (req.user as any).id;
        const userGames = await this.userGameService.getUserGames(userId);
        res.json(userGames);
    }

    async updateUserGame(req: Request, res: Response): Promise<void> {
        const { gameId } = req.params;
        const { status, rating, review } = req.body;
        const userId = (req.user as any).id;
        const result = await this.userGameService.updateUserGame(userId, Number(gameId), status as GameStatus, rating, review);
        if ('message' in result) {
            res.status(400).json(result);
        } else {
            res.json(result);
        }
    }

    async deleteUserGame(req: Request, res: Response): Promise<void> {
        const { gameId } = req.params;
        const userId = (req.user as any).id;
        const result = await this.userGameService.deleteUserGame(userId, Number(gameId));
        res.json(result);
    }
}

export default UserGameController;
