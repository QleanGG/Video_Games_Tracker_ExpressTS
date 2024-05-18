import { Router } from "express";
import gameRoutes from './GameRoutes'

const router = Router()

router.use('/games', gameRoutes);

export default router;