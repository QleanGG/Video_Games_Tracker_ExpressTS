import { DataSource } from "typeorm";
import fs from "fs";
import { Platform } from "../entities/Platform";
import ormConfig from "../ormconfig.json";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Game } from "../entities/Game";

const dataSource = new DataSource(ormConfig as PostgresConnectionOptions);

async function seedGames() {
	await dataSource.initialize();
	const gameRepository = dataSource.getRepository(Game);
	const platformRepo = dataSource.getRepository(Platform);

	const gameData = JSON.parse(fs.readFileSync("./game_info.json", "utf-8"));

	for (const row of gameData) {
		const {
			Title: title,
			releaseDate,
			Score: rating,
			Developer: developer,
			Genre: genre,
			Description: description = "No description available",
			Platforms: platformsString,
			imageUrl,
		} = row;

		let game = await gameRepository.findOneBy({ title });

		if (!game) {
			game = gameRepository.create({
				title,
				releaseDate: new Date(releaseDate),
				rating: rating,
				developer,
				genre,
				description,
				imageUrl,
			});
		} else {
			game.releaseDate = new Date(releaseDate);
			game.rating = rating;
			game.developer = developer;
			game.genre = genre;
			game.description = description;
			game.imageUrl = imageUrl;
		}

		// Normalize platforms to always be an array, even if only one is provided
		// Normalize platforms to always be an array, even if only one is provided
		const platformNames = platformsString
			.split(", ")
			.map((p: string) => p.trim());
		for (const name of platformNames) {
			let platform = await platformRepo.findOneBy({ name });
			if (!platform) {
				platform = platformRepo.create({ name });
				await platformRepo.save(platform);
			}
			if (!game.platforms) {
				game.platforms = [];
			}
			if (!game.platforms.find((p) => p.id === platform.id)) {
				game.platforms.push(platform);
			}
		}
		await gameRepository.save(game);
	}
	console.log("Games have been seeded successfully!");
	await dataSource.destroy();
}

seedGames().catch((err) => console.error("Seeding failed:", err));
