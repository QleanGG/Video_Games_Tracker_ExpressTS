import { DataSource } from "typeorm";
import { Platform, PlatformName } from "../entities/Platform";
import ormConfig from '../ormconfig';
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const dataSource = new DataSource(ormConfig as PostgresConnectionOptions);

const platforms = [
    { name: PlatformName.PC },
    { name: PlatformName.PlayStation5 },
    { name: PlatformName.NintendoSwitch },
    { name: PlatformName.XboxSeriesX },
]

async function seedPlatform() {
    try {
        await dataSource.initialize();
        console.log("Data Source has initialized!");
        
        const platformReporistory = dataSource.getRepository(Platform);

        for (const platformData of platforms) {
            const platformExists = await platformReporistory.findOneBy({
                name: platformData.name
            });
            if (!platformExists) {
                const platform = platformReporistory.create(platformData);
                await platformReporistory.save(platform);
                console.log(`Saved: ${platform.name}`);
            } else {
                console.log(`Already exists: ${platformData.name}`);
            }
        }
    } catch (error) {
        console.error("Error during seed: ", error);
    } finally {
        await dataSource.destroy();
        console.log("Data Source has been closed!");
    }
}

seedPlatform();