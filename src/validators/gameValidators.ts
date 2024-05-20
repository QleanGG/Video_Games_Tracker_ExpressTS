import { check, validationResult } from 'express-validator';

export const gameValidationRules = () => {
    return [
        check('title')
            .isString()
            .withMessage('Title must be a string'),
        check('genre')
            .isString()
            .withMessage('Genre must be a string'),
        check('description')
            .optional()
            .isString()
            .withMessage('Description must be a string'),
        check('publisher')
            .isString()
            .withMessage('Publisher must be a string'),
        check('developer')
            .isString()
            .withMessage('Developer must be a string'),
        check('releaseDate')
            .isISO8601()
            .withMessage('Release date must be a valid date'),
        check('rating')
            .optional()
            .isFloat({ min: 0, max: 10 })
            .withMessage('Rating must be a number between 0 and 10'),
        check('imageUrl')
            .optional()
            .isURL()
            .withMessage('Image URL must be a valid URL')
    ];
}

export const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors: { [key: string]: any }[] = [];
    errors.array().forEach(err => {
        const error = {
            param: (err as any).param || null,
            msg: (err as any).msg || 'Unknown error',
        };
        extractedErrors.push(error);
    });

    return res.status(422).json({
        errors: extractedErrors,
    });
}
