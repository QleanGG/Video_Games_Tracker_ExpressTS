import { Request,Response } from "express";
import UserService from "../services/UserService";
import logger from "../config/logger";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async register(req: Request, res: Response): Promise<void> {
        const { email, username, password } = req.body;
        logger.info(`Registering user with email: ${email} and username: ${username}`);
        try {
            const result = await this.userService.registerUser(email, username, password);
            if ('message' in result) {
                logger.warn(`Failed to register user: ${email} - ${result.message}`);
                res.status(400).json(result);
            } else {
                logger.info(`User registered successfully: ${email}`);
                res.status(201).json(result);
            }
        } catch (error) {
            logger.error(`Error registering user: ${email} - ${(error as Error).message}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default UserController;