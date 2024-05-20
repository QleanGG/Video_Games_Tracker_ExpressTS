import { AppDataSource } from "../database/database";
import { User } from "../database/entities/User";
import { Profile } from "../database/entities/Profile";
import { UserGame } from "../database/entities/UserGame";

export class ProfileService {
    private userRepository = AppDataSource.getRepository(User);
    private profileRepository = AppDataSource.getRepository(Profile);
    private userGameRepository = AppDataSource.getRepository(UserGame);
    
    async getProfile(userId: number): Promise<{ profile: Profile, games: UserGame[]} | {message:string}> {
        const user = await this.userRepository.findOne({where: {id:userId}, relations: ['profile']});

        if (!user) {
            return {message: "User not found"};
        }

        let profile = await this.profileRepository.findOne({where: { user: {id: userId} }});

        if (!profile) {
            profile = this.profileRepository.create({user});
            await this.profileRepository.save(profile);
        }

        const games = await this.userGameRepository.find({where: {user: {id: userId}}, relations: ['game'] });

        return { profile, games};
    }

    async updateProfile(userId: number, profileData: Partial<Profile>): Promise<Profile | {message:string}> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return {message: "User not found"};
        }

        let profile = await this.profileRepository.findOne({ where: { user: { id: userId } } });

        if(!profile) {
            profile = this.profileRepository.create({user, ...profileData});
        } else {
            profile = this.profileRepository.merge(profile, profileData);
        }

        await this.profileRepository.save(profile);
        return profile
    }
}