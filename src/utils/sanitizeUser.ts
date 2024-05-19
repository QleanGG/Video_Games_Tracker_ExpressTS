import { User } from "../types";

export const sanitizeUser = (user: User): Partial<User> => {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
};
