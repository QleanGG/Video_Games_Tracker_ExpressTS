import { Router } from "express";
import { RecommendationController } from "../controllers/RecommendController";
import { isAuthenticated } from '../middleware/authMiddleware';
import asyncHandler from '../utils/asyncHandler';

const router = Router();
const recommendationController = new RecommendationController();

router.get('/:userId', isAuthenticated, asyncHandler(recommendationController.getRecommendations.bind(recommendationController)));

export default router;
