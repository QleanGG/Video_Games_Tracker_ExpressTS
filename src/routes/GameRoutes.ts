import { Router } from "express";
import { GameController } from "../controllers/GameController";

const router = Router()
const gameController = new GameController();

// Get Routes
router.get('/games', gameController.getAllGames.bind(gameController));
router.get('/games/:id', gameController.getGame.bind(gameController));

// Post route
router.post('/games', gameController.createGame.bind(gameController));

// Delete Route
router.delete('/games/:id', gameController.deleteGame.bind(gameController));

// Update Route
router.put('/games/:id', gameController.updateGame.bind(gameController));

export default router;