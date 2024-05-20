import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
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
};
