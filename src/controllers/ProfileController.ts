import { Request, Response } from "express";
import { ProfileService } from "../services/ProfileService";
import { ensureAuthenticated } from "../utils/authUtils";
import { PlatformName } from "../database/entities/Platform";
import logger from "../config/logger";

class ProfileController {
	private profileService: ProfileService;

	constructor() {
		this.profileService = new ProfileService();
	}

	async getProfile(req: Request, res: Response): Promise<void> {
		if (!ensureAuthenticated(req, res)) {
			logger.warn(`Unauthorized access attempt to get profile`);
			return;
		}
		const userId = (req.user as any).id;
		logger.info(`Fetching profile for user ID: ${userId}`);
		const result = await this.profileService.getProfile(userId);
		if ("message" in result) {
			logger.warn(`Profile not found for user ID: ${userId}`);
			res.status(404).json(result);
		} else {
			logger.info(`Profile fetched successfully for user ID: ${userId}`);
			res.status(200).json(result);
		}
	}

	async updateProfile(req: Request, res: Response): Promise<void> {
		if (!ensureAuthenticated(req, res)) {
			logger.warn(`Unauthorized access attempt to update profile`);
			return;
		}
		const userId = (req.user as any).id;
		const profileData = req.body;

		// Parse platforms if they are present
		if (profileData.platforms) {
			profileData.platforms = JSON.parse(profileData.platforms);
		}

		logger.info(
			`Updating profile for user ID: ${userId} with data: ${JSON.stringify(profileData)}`
		);
		// Validate mainPlatform and platforms
		const validPlatforms = Object.values(PlatformName);
		if (profileData.mainPlatform && !validPlatforms.includes(profileData.mainPlatform)) {
			logger.warn(`Invalid main platform: ${profileData.mainPlatform} for user ID: ${userId}`);
			res.status(422).json({ message: "Invalid main platform" });
			return;
		}

		if (profileData.platforms) {
			for (const platform of profileData.platforms) {
				if (!validPlatforms.includes(platform)) {
					logger.warn(`Invalid platform: ${platform} in user ID: ${userId}'s profile update`);
					res.status(422).json({ message: `Invalid platform: ${platform}` });
					return;
				}
			}
		}
		const result = await this.profileService.updateProfile(userId, profileData);
		if ("message" in result) {
			logger.warn(`Failed to update profile for user ID: ${userId}`);
			res.status(404).json(result);
		} else {
			logger.info(`Profile updated successfully for user ID: ${userId}`);
			res.status(200).json(result);
		}
	}
}

export default ProfileController;
