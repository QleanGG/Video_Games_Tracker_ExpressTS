import { DataSource } from "typeorm";
import { Game } from "../database/entities/Game";
import { Genre } from "../database/entities/Genre";
import ormConfig from "../database/ormconfig";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const dataSource = new DataSource(ormConfig as PostgresConnectionOptions);

async function removeInvalidGenre() {
    await dataSource.initialize();
    const genreRepository = dataSource.getRepository(Genre);
    const gameRepository = dataSource.getRepository(Game);

    // Find the genre with an empty name
    const invalidGenre = await genreRepository.findOneBy({ name: '' });
    if (invalidGenre) {
        // Find all games associated with the invalid genre
        const gamesWithInvalidGenre = await gameRepository
            .createQueryBuilder('game')
            .leftJoinAndSelect('game.genres', 'genre')
            .where('genre.id = :genreId', { genreId: invalidGenre.id })
            .getMany();

        // Remove the association with the invalid genre
        for (const game of gamesWithInvalidGenre) {
            game.genres = game.genres.filter(genre => genre.id !== invalidGenre.id);
            await gameRepository.save(game);
        }

        // Remove the invalid genre
        await genreRepository.remove(invalidGenre);
        console.log("Invalid genre removed successfully!");
    } else {
        console.log("No invalid genre found.");
    }

    await dataSource.destroy();
}

removeInvalidGenre().catch((err) => console.error("Failed to remove invalid genre:", err));
