import { Request, Response } from 'express';
import { RecommendnService } from '../services/RecommendService';

const recommendnService = new RecommendnService();

export class RecommendationController {
    async getRecommendations(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.userId);
        const limit = parseInt(req.query.limit as string) || 10;

        const recommendations = await recommendnService.recommendGames(userId, limit);

        res.json(recommendations);
    }
}
