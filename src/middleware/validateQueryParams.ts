import { Request, Response, NextFunction } from 'express';

export const validateLimitParam = (req: Request, res: Response, next: NextFunction) => {
  const limitParam = req.query.limit;
  if (limitParam !== undefined) {
    const limit = parseInt(limitParam as string, 10);
    if (isNaN(limit)) {
      return res.status(400).json({ error: 'Invalid limit parameter' });
    }
  }
  next();
};
