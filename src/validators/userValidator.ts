import { check, validationResult } from 'express-validator';

export const userValidationRules = () => {
    return [
        check('username')
            .isString()
            .withMessage('Username must be a string'),
        check('email')
            .isEmail()
            .withMessage('Must be a valid email'),
        check('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
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
