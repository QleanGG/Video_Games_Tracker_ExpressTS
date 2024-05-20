import { Request,Response } from "express";
import UserService from "../services/UserService";

class UserControler {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async register(req: Request, res: Response): Promise<void> {
            const {email, username, password} = req.body;
            const result = await this.userService.registerUser(email,username,password);

            if ('message' in result) {
                res.status(400).json(result);
            } else {
                res.status(201).json(result);
            }
    }
}

export default UserControler;