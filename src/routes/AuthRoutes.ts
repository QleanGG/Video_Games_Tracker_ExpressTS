import { Router } from "express";
import passport from '../config/passportConfig'

const router = Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: 'api/auth/user',
    failureRedirect: '/api/auth/login',
    failureFlash: true
}));

// google authentication 
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/api/auth/user',
    failureRedirect: "/api/auth/login",
    failureFlash: true
}));

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {return next(err); }
        res.redirect('/');
    });
});

router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});

export default router;