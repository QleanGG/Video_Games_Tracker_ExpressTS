import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error('An error occurred:', err.message);
    res.status(500).json({ message: 'An internal server error occurred' });
}

export default errorHandler;
