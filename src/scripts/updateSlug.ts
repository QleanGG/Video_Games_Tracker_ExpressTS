import { DataSource } from "typeorm";
import { Game } from "../database/entities/Game"; // Adjust the path based on your project structure
import { slugify } from "../utils/slugify"; // Adjust the path based on your project structure
import ormConfig from "../database/ormconfig"; // Adjust the path based on your project structure

const dataSource = new DataSource(ormConfig);

async function updateSlugs() {
  await dataSource.initialize();

  const gameRepository = dataSource.getRepository(Game);
  
  // Fetch all games
  const games = await gameRepository.find();

  for (const game of games) {
    // Generate and set slug for each game
    game.slug = slugify(game.title);
    await gameRepository.save(game);
  }

  console.log("Slugs have been updated successfully!");
  await dataSource.destroy();
}

updateSlugs().catch((err) => console.error("Updating slugs failed:", err));
