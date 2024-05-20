import { Request, Response } from "express";
import { ProfileService } from "../services/ProfileService";
import { ensureAuthenticated } from "../utils/authUtils";

class ProfileController {
	private profileService: ProfileService;

	constructor() {
		this.profileService = new ProfileService();
	}

	async getProfile(req: Request, res: Response): Promise<void> {
		if (!ensureAuthenticated(req, res)) {
			return;
		}
		const userId = (req.user as any).id;
		const result = await this.profileService.getProfile(userId);
		if ("message" in result) {
			res.status(404).json(result);
		} else {
			res.status(200).json(result);
		}
	}

	async updateProfile(req: Request, res: Response): Promise<void> {
		if (!ensureAuthenticated(req, res)) {
			return;
		}
		const userId = (req.user as any).id;
		const profileData = req.body;
		const result = await this.profileService.updateProfile(userId, profileData);
		if ("message" in result) {
			res.status(404).json(result);
		} else {
			res.status(200).json(result);
		}
	}
}

export default ProfileController;
