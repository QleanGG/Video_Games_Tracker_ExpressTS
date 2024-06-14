import { Router } from "express";
import { PlatformController } from "../controllers/PlatformController";
import { checkAdmin } from '../middleware/checkAdmin';
import { isAuthenticated } from '../middleware/authMiddleware';
import asyncHandler from '../utils/asyncHandler';

const router = Router();
const platformController = new PlatformController();

// Get Routes
router.get('', asyncHandler(platformController.getAllPlatforms.bind(platformController)));
router.get('/:platformId/games', asyncHandler(platformController.getGamesByPlatform.bind(platformController)));

// Post route
router.post('', isAuthenticated, checkAdmin, asyncHandler(platformController.createPlatform.bind(platformController)));

// Delete Route
router.delete('/:id', isAuthenticated, checkAdmin, asyncHandler(platformController.deletePlatform.bind(platformController)));

// Update Route
router.put('/:id', isAuthenticated, checkAdmin, asyncHandler(platformController.updatePlatform.bind(platformController)));

export default router;
