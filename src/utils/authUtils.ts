import { Request, Response } from 'express';

export const ensureAuthenticated = (req: Request, res: Response): boolean => {
    if (!req.isAuthenticated() || !req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return false;
    }
    return true;
};
