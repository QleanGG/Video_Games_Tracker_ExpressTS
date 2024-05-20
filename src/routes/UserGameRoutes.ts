import { Router } from 'express';
import UserGameController from '../controllers/UserGameController';
import { isAuthenticated } from '../middleware/authMiddleware';
import { userGameValidationRules, validate } from '../validators/userGameValidator';
import asyncHandler from '../utils/asyncHandler';

const router = Router();
const userGameController = new UserGameController();

router.post(
    '',
    isAuthenticated,
    userGameValidationRules(),
    validate,
    asyncHandler(userGameController.addUserGame.bind(userGameController))
);

router.get(
    '',
    isAuthenticated,
    asyncHandler(userGameController.getUserGames.bind(userGameController))
);

router.get(
    '/:userGameId',
    isAuthenticated,
    asyncHandler(userGameController.getUserGameById.bind(userGameController))
);

router.put(
    '/:userGameId',
    isAuthenticated,
    userGameValidationRules(),
    validate,
    asyncHandler(userGameController.updateUserGame.bind(userGameController))
);

router.delete(
    '/:userGameId',
    isAuthenticated,
    asyncHandler(userGameController.deleteUserGame.bind(userGameController))
);

export default router;
