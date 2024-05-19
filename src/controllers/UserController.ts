import { Request,Response } from "express";
import UserService from "../services/UserServices";

class UserControler {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const {email, username, password} = req.body;
            const result = await this.userService.registerUser(email,username,password);

            if ('message' in result) {
                res.status(400).json(result);
            } else {
                res.status(201).json(result);
            }
        } catch (error) {
            res.status(500).json({message: (error as Error).message});
        }
    }
}

export default UserControler;