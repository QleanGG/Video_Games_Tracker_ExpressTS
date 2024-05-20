import { check, validationResult } from 'express-validator';

export const userGameValidationRules = () => {
    return [
        check('status')
            .isIn(['Interested', 'Own', 'Currently Playing', 'On Hold', 'Dropped', 'Finished', 'Completed'])
            .withMessage('Invalid game status'),
        check('rating')
            .optional()
            .isFloat({ min: 1, max: 10 })
            .withMessage('Rating must be a number between 1 and 10'),
        check('review')
            .optional()
            .isString()
            .withMessage('Review must be a string')
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
