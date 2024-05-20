import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import { isAuthenticated } from "../middleware/authMiddleware";
import upload from "../config/multerConfig";
import { profileUpdateValidator } from "../validators/profileValidator";
import { validateRequest } from "../middleware/validateRequest";
import asyncHandler from "../utils/asyncHandler";

const router = Router();
const profileController = new ProfileController();

router.get("", isAuthenticated, asyncHandler(profileController.getProfile.bind(profileController)));
router.put(
	"",
	isAuthenticated,
	upload.single("avatar"),
	profileUpdateValidator,
	validateRequest,
	asyncHandler(profileController.updateProfile.bind(profileController))
);

export default router;
