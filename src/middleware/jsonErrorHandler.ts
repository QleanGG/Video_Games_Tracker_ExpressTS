import { Request, Response, NextFunction } from 'express';

function jsonErrorHandler(err: SyntaxError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SyntaxError && err.message.includes('JSON')) {
        // console.error('Bad JSON:', err.message);
        return res.status(400).json({ message: 'Invalid JSON' });
    }
    next();
}

export default jsonErrorHandler;
