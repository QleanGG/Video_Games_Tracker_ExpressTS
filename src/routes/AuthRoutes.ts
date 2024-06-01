import { Router, Request, Response, NextFunction } from "express";
import passport from '../config/passportConfig';
import { User } from "../types";
import { sanitizeUser } from '../utils/sanitizeUser';
import logger from '../config/logger';  // Import your logger

const router = Router();

// Handle POST requests for login
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: User, info: any) => {
        if (err) {
            logger.error(`Login error: ${err.message}`);
            return next(err);
        }
        if (!user) {
            logger.warn(`Invalid login attempt for email: ${req.body.email}`);
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.logIn(user, (err: any) => {
            if (err) {
                logger.error(`Login error: ${err.message}`);
                return next(err);
            }
            const sanitizedUser = sanitizeUser(user);
            logger.info(`User logged in: ${sanitizedUser.email}`);
            return res.status(200).json({ message: 'Login successful', user: sanitizedUser });
        });
    })(req, res, next);
});

// Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', (err: any, user: User, info: any) => {
        if (err) {
            logger.error(`Google authentication error: ${err.message}`);
            return next(err);
        }
        if (!user) {
            logger.warn(`Google authentication failed`);
            return res.status(401).json({ message: 'Google authentication failed' });
        }
        req.logIn(user, (err: any) => {
            if (err) {
                logger.error(`Google login error: ${err.message}`);
                return next(err);
            }
            const sanitizedUser = sanitizeUser(user);
            logger.info(`User logged in with Google: ${sanitizedUser.email}`);
            // Redirect to frontend with user data
            const redirectUrl = `${process.env.FRONTEND_URL}/login/login-success?user=${encodeURIComponent(JSON.stringify(sanitizedUser))}`;
            return res.redirect(redirectUrl);
        });
    })(req, res, next);
});

// Handle GET requests for logout
router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            logger.error(`Logout error: ${err.message}`);
            return next(err);
        }
        logger.info(`User logged out: ${req.user?.email}`);
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Handle GET requests for fetching authenticated user details
router.get('/user', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        logger.info(`Fetched user details: ${req.user?.email}`);
        res.json(req.user);
    } else {
        logger.warn(`Unauthorized access attempt`);
        res.status(401).json({ message: "Unauthorized" });
    }
});

export default router;
