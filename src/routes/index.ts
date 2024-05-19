import { Router } from "express";
import gameRoutes from './GameRoutes'
import authRoutes from './AuthRoutes'
import userRoutes from './UserRoutes'

const router = Router()

router.use('/games', gameRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes)

export default router;