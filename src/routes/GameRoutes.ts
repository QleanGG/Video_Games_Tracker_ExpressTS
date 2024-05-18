import { Router } from "express";
import { GameController } from "../controllers/GameController";

const router = Router()
const gameController = new GameController();

router.get('/games', gameController.getAllGames.bind(gameController));
router.get('/games/:id', gameController.getGame.bind(gameController));
router.post('/games', gameController.createGame.bind(gameController));
router.delete('/games/:id', gameController.deleteGame.bind(gameController));

export default router;