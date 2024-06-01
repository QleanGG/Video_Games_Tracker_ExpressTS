import { AppDataSource } from "../database/database";
import { User } from "../database/entities/User";
import { Profile } from "../database/entities/Profile";
import { UserGame } from "../database/entities/UserGame";
import { Platform, PlatformName } from "../database/entities/Platform";
import { In } from "typeorm";

export class ProfileService {
	private userRepository = AppDataSource.getRepository(User);
	private profileRepository = AppDataSource.getRepository(Profile);
	private userGameRepository = AppDataSource.getRepository(UserGame);
	private platformRepository = AppDataSource.getRepository(Platform);

	async getProfile(
		userId: number
	): Promise<{ profile: Profile; games: UserGame[] } | { message: string }> {
		const user = await this.userRepository.findOne({
			where: { id: userId },
			relations: ["profile"],
		});

		if (!user) {
			return { message: "User not found" };
		}

		let profile = await this.profileRepository.findOne({
			where: { user: { id: userId } },
			relations: ["platforms", "mainPlatform"],
		});

		if (!profile) {
			profile = this.profileRepository.create({ user });
			await this.profileRepository.save(profile);
		}

		const games = await this.userGameRepository.find({
			where: { user: { id: userId } },
			relations: ["game"],
		});

		return { profile, games };
	}

	async updateProfile(
		userId: number,
		profileData: Partial<Profile>
	): Promise<Profile | { message: string }> {
		const user = await this.userRepository.findOne({ where: { id: userId } });
		if (!user) {
			return { message: "User not found" };
		}

		let profile = await this.profileRepository.findOne({
			where: { user: { id: userId } },
			relations: ["platforms", "mainPlatform"],
		});

		if (!profile) {
			profile = this.profileRepository.create({ user, ...profileData });
		} else {
			profile = this.profileRepository.merge(profile, profileData);
		}

		// Handle platforms and mainPlatform separately
		if (profileData.platforms) {
			const platformNames = profileData.platforms as unknown as PlatformName[];
			const platformEntities = await this.platformRepository.findBy({
				name: In(platformNames)
			});
			profile.platforms = platformEntities;
		}

		if (profileData.mainPlatform) {
			const mainPlatformEntity = await this.platformRepository.findOne({
				where: { name: profileData.mainPlatform as unknown as PlatformName }
			});
			if (mainPlatformEntity) {
				profile.mainPlatform = mainPlatformEntity;
			} else {
				throw new Error("Invalid main platform name");
			}
		}

		await this.profileRepository.save(profile);
		return profile;
	}
}
