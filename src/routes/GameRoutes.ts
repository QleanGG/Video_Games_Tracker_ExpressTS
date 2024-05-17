import { Router } from "express";
import { GameController } from "../controllers/GameController";

const router = Router()
const gameController = new GameController();

router.get('/games', gameController.getAllGames.bind(gameController));
router.get('/games/:id', gameController.gatGame.bind(gameController));

export default router;