import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && req.user) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
