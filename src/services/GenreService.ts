import { AppDataSource } from "../database/database";
import { Genre } from "../database/entities/Genre";

export class GenreService {
    private genreRepository = AppDataSource.getRepository(Genre);

    async getAllGenres(): Promise<Genre[]> {
        return this.genreRepository.find();
    }

    async getGenre(id: number): Promise<Genre | null> {
        return this.genreRepository.findOne({ where: { id } });
    }

    async createGenre(name: string): Promise<Genre | { message: string }> {
        if (name == '') {
            return {message: "not a valid format"}
        }
        const existingGenre = await this.genreRepository.findOne({ where: { name } });
        if (existingGenre) {
            return { message: "This genre already exists." };
        }

        const newGenre = this.genreRepository.create({ name });
        return this.genreRepository.save(newGenre);
    }

    async deleteGenre(id: number): Promise<{ message: string }> {
        const genre = await this.genreRepository.findOne({ where: { id } });
        if (!genre) {
            return { message: `Genre does not exist.` };
        }

        await this.genreRepository.delete(id);
        return { message: `Genre ${genre.name} with ID ${id} has been deleted` };
    }

    async updateGenre(id: number, name: string): Promise<Genre | { message: string }> {
        const genre = await this.genreRepository.findOne({ where: { id } });
        if (!genre) {
            return { message: "Genre does not exist." };
        }

        genre.name = name;
        await this.genreRepository.save(genre);
        return genre;
    }
}
