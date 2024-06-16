import { Request, Response, NextFunction } from "express";

// Get approved IP addresses and domains from environment variables
const ALLOWED_IPS = (process.env.ALLOWED_IPS || '').split(',');
const ALLOWED_DOMAINS = (process.env.ALLOWED_DOMAINS || '').split(',');

export const whitelist = (req: Request, res: Response, next: NextFunction) => {
    const clientIp = (req.ip || req.socket.remoteAddress || '').toString();
    const origin = req.get('origin') || '';

    const isIpAllowed = ALLOWED_IPS.includes(clientIp);
    const isDomainAllowed = ALLOWED_DOMAINS.includes(origin);

    if (isIpAllowed || isDomainAllowed) {
        next();
    } else {
        res.status(403).json({ message: 'Access forbidden: IP or domain not allowed' });
    }
};
