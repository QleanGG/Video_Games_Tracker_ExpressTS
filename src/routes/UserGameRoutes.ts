import { Router } from 'express';
import UserGameController from '../controllers/UserGameController';
import { isAuthenticated } from '../middleware/authMiddleware';

const router = Router();
const userGameController = new UserGameController();

router.post('', isAuthenticated, userGameController.addUserGame.bind(userGameController));
router.get('', isAuthenticated, userGameController.getUserGames.bind(userGameController));
router.put('/:gameId', isAuthenticated, userGameController.updateUserGame.bind(userGameController));
router.delete('/:gameId', isAuthenticated, userGameController.deleteUserGame.bind(userGameController));

export default router;
