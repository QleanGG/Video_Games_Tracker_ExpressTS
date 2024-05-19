import { Router, Request, Response, NextFunction } from "express";
import passport from '../config/passportConfig';
import { User } from "../types";
import { sanitizeUser } from '../utils/sanitizeUser';

const router = Router();

// Handle POST requests for login
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: User, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.logIn(user, (err: any) => {
            if (err) {
                return next(err);
            }
            const sanitizedUser = sanitizeUser(user);
            return res.status(200).json({ message: 'Login successful', user:sanitizedUser });
        });
    })(req, res, next);
});

// Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', (err: any, user: User, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Google authentication failed' });
        }
        req.logIn(user, (err: any) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'Google login successful', user });
        });
    })(req, res, next);
});

// Handle GET requests for logout
router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Handle GET requests for fetching authenticated user details
router.get('/user', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});

export default router;
