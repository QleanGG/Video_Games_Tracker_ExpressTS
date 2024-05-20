// src/validators/profileValidator.ts
import { body } from 'express-validator';

export const profileUpdateValidator = [
    body('bio').optional().isString().withMessage('Bio must be a string'),
    body('favoriteGames').optional().isString().withMessage('Favorite games must be a string'),
    body('gamerTag').optional().isString().withMessage('Gamer tag must be a string'),
    body('platforms').optional().isArray().withMessage('Platforms must be an array'),
    body('platforms.*').isString().withMessage('Each platform must be a string'),
    body('mainPlatform').optional().isString().withMessage('Main platform must be a string'),
];
