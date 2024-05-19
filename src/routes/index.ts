import { Router } from "express";
import gameRoutes from './GameRoutes';
import authRoutes from './AuthRoutes';
import userRoutes from './UserRoutes';
import profileRoutes from './ProfileRoutes'

const router = Router()

router.use('/games', gameRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/profile', profileRoutes);

export default router;