import { In } from "typeorm";
import { AppDataSource } from "../database/database";
import { Platform } from "../database/entities/Platform";
import { Game } from "../database/entities/Game";

export class PlatformService {
    private platformRepository = AppDataSource.getRepository(Platform);
    private gameRepository = AppDataSource.getRepository(Game);

    async getAllPlatforms(): Promise<Platform[]> {
        return this.platformRepository.find({ relations: ["games"] });
    }

    async getGamesByPlatform(platformId: number, page: number, limit: number): Promise<{ data: Game[], total: number, page: number, limit: number }> {
        const take = limit;
        const skip = (page - 1) * take;

        const [result, total] = await this.gameRepository.findAndCount({
            where: { platforms: { id: platformId } },
            relations: ["platforms", "genres"],
            skip,
            take,
        });

        return {
            data: result,
            total,
            page,
            limit,
        };
    }

    async createPlatform(platformData: Partial<Platform>): Promise<Platform | { message: string }> {
        const existingPlatform = await this.platformRepository.findOne({ where: { name: platformData.name } });
        if (existingPlatform) {
            return { message: "This platform name already exists." };
        }

        const newPlatform = this.platformRepository.create(platformData);
        return this.platformRepository.save(newPlatform);
    }

    async deletePlatform(id: number): Promise<{ message: string }> {
        const platform = await this.platformRepository.findOne({ where: { id } });
        if (!platform) {
            return { message: `Platform does not exist.` };
        }
        await this.platformRepository.delete(id);

        return { message: `Platform ${platform.name} with ID ${id} has been deleted` };
    }

    async updatePlatform(id: number, platformData: Partial<Platform>): Promise<Platform | { message: string }> {
        const platform = await this.platformRepository.findOne({ where: { id } });
        if (!platform) {
            return { message: "Platform does not exist." };
        }

        const updatedPlatform = this.platformRepository.merge(platform, platformData);
        await this.platformRepository.save(updatedPlatform);
        return updatedPlatform as Platform;
    }
}
