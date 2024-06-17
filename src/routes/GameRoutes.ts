import { Router } from "express";
import { GameController } from "../controllers/GameController";
import { checkAdmin } from '../middleware/checkAdmin';
import { isAuthenticated } from '../middleware/authMiddleware';
import { gameValidationRules, validate } from '../validators/gameValidators';
import asyncHandler from '../utils/asyncHandler';
// import { validateLimitParam } from "../middleware/validateQueryParams";

const router = Router()
const gameController = new GameController();

// Get Routes
router.get('', asyncHandler(gameController.getAllGames.bind(gameController)));

// featured games route
router.get('/featured', asyncHandler(gameController.getFeaturedGames.bind(gameController)));

// Get by name
router.get('/:identifier', asyncHandler(gameController.getGameByIdentifier.bind(gameController)));

// Post route
router.post('',isAuthenticated, checkAdmin, gameValidationRules(), validate, asyncHandler(gameController.createGame.bind(gameController)));

// Delete Route
router.delete('/:id',isAuthenticated, checkAdmin, asyncHandler(gameController.deleteGame.bind(gameController)));

// Update Route
router.put('/:id', isAuthenticated, checkAdmin, gameValidationRules(), validate, asyncHandler(gameController.updateGame.bind(gameController)));

export default router;