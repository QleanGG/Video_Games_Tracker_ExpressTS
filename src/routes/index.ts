import { Router } from "express";
import gameRoutes from './GameRoutes';
import authRoutes from './AuthRoutes';
import userRoutes from './UserRoutes';
import profileRoutes from './ProfileRoutes';
import userGameRoutes from './UserGameRoutes'
import genreRoutes from './GenreRoutes'
import recommendRoutes from './RecommendRoutes'
import platformRoutes from './PlatformRoutes'
const router = Router()

router.use('/games', gameRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/user/games', userGameRoutes);
router.use('/genre',genreRoutes);
router.use('/recommendation', recommendRoutes);
router.use('/platforms', platformRoutes);
export default router;