import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const profileUpdateValidator = [
	(req: Request, res: Response, next: NextFunction) => {
		console.log("Incoming request body:", req.body);
		if (req.body.platforms) {
			try {
				req.body.platforms = JSON.parse(req.body.platforms);
				console.log("Parsed platforms:", req.body.platforms);
			} catch (error) {
				console.error("Invalid platforms format:", error);
				return res.status(422).json({ message: "Invalid platforms format" });
			}
		}
		next();
	},
	body("bio").optional().isString().withMessage("Bio must be a string"),
	body("favoriteGames").optional().isString().withMessage("Favorite games must be a string"),
	body("gamerTag").optional().isString().withMessage("Gamer tag must be a string"),
	body("platforms").optional().isArray().withMessage("Platforms must be an array"),
	body("platforms.*").optional().isString().withMessage("Each platform must be a string"),
	body("mainPlatform").optional().isString().withMessage("Main platform must be a string"),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		console.log(errors);

		if (!errors.isEmpty()) {
			console.error("Validation errors:", errors.array());
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
];
