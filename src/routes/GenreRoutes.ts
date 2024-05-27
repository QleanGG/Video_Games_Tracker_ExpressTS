import { Router } from "express";
import { GenreController } from "../controllers/GenreController";
import { checkAdmin } from '../middleware/checkAdmin';
import { isAuthenticated } from '../middleware/authMiddleware';
import asyncHandler from '../utils/asyncHandler';

const router = Router();
const genreController = new GenreController();

// Get Routes
router.get('', asyncHandler(genreController.getAllGenres.bind(genreController)));
router.get('/:id', asyncHandler(genreController.getGenre.bind(genreController)));

// Post Route
router.post('', isAuthenticated, checkAdmin, asyncHandler(genreController.createGenre.bind(genreController)));

// Delete Route
router.delete('/:id', isAuthenticated, checkAdmin, asyncHandler(genreController.deleteGenre.bind(genreController)));

// Update Route
router.put('/:id', isAuthenticated, checkAdmin, asyncHandler(genreController.updateGenre.bind(genreController)));

export default router;
