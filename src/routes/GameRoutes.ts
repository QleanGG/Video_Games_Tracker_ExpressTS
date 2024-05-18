import { Router } from "express";
import { GameController } from "../controllers/GameController";

const router = Router()
const gameController = new GameController();

// Get Routes
router.get('', gameController.getAllGames.bind(gameController));
router.get('/:id', gameController.getGame.bind(gameController));

// Post route
router.post('', gameController.createGame.bind(gameController));

// Delete Route
router.delete('/:id', gameController.deleteGame.bind(gameController));

// Update Route
router.put('/:id', gameController.updateGame.bind(gameController));

export default router;