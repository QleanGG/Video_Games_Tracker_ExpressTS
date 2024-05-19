import { Request,Response } from "express";
import {ProfileService } from "../services/ProfileService";
import { ensureAuthenticated } from '../utils/authUtils';

class ProfileController {
    private profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    async getProfile(req: Request, res: Response): Promise<void> {
        if (!ensureAuthenticated(req, res)) {
            return;
        }
        try {
            const userId = (req.user as any).id;
            const result = await this.profileService.getProfile(userId);
            if ('message' in result) {
                res.status(404).json(result);
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({message: (error as Error).message});
        }
    }

    async updateProfile(req: Request, res:Response): Promise<void> {
        if (!ensureAuthenticated(req, res)) {
            return;
        }
        
        try {
            const userId = (req.user as any).id;
            const profileData = req.body;
            const result = await this.profileService.updateProfile(userId, profileData);
            if ('message' in result) {
                res.status(404).json(result);
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({message: (error as Error).message});
        }
    }
}

export default ProfileController;