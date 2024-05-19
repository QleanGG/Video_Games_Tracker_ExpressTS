import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import { isAuthenticated } from "../middleware/authMiddleware";

const router = Router();
const profileController = new ProfileController();

router.get('/profile', isAuthenticated, profileController.getProfile.bind(profileController));
router.put('/profile', isAuthenticated, profileController.updateProfile.bind(profileController));

export default router;