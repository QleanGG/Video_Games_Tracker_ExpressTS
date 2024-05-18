import passport from "passport";
import { Strategy as LocalStradegy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import { User } from "../database/entities/User";
import { AppDataSource } from "../database/database";
import dotenv from "dotenv";

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

// Serialeze and Deserialize user
passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
	try {
		const user = await userRepository.findOneBy({ id });
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

passport.use(
	new LocalStradegy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, done) => {
			try {
				const user = await userRepository.findOne({ where: { email } });
				if (!user) {
					return done(null, false, {
						message:
							"It seems like this email doesn't exist or the password is incorrect",
					});
				}
				// Validate the password (add your own password validation logic)
				if (user.password !== password) {
					return done(null, false, {
						message:
							"It seems like this email doesn't exist or the password is incorrect",
					});
				}
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			callbackURL: "/api/auth/google/callback",
		},
		async (token, tokenSecret, profile, done) => {
			try {
				let user = await userRepository.findOne({
					where: { oauthProvider: "google", oauthId: profile.id },
				});

				if (!user) {
					user = userRepository.create({
						username: profile.displayName,
						email: profile.emails?.[0]?.value,
						oauthProvider: "google",
						oauthId: profile.id,
					});
					await userRepository.save(user);
				}

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

export default passport;
