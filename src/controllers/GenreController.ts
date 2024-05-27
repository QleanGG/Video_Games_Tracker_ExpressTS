import { Request, Response } from 'express';
import { GenreService } from '../services/GenreService';

const genreService = new GenreService();

export class GenreController {
    async getAllGenres(req: Request, res: Response): Promise<void> {
        const genres = await genreService.getAllGenres();
        res.json(genres);
    }

    async getGenre(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const genre = await genreService.getGenre(id);
        if (!genre) {
            res.status(404).json({ message: 'Genre not found' });
        } else {
            res.json(genre);
        }
    }

    async createGenre(req: Request, res: Response): Promise<void> {
        const { name } = req.body;
        const result = await genreService.createGenre(name);
        if ('message' in result) {
            res.status(400).json(result);
        } else {
            res.status(201).json(result);
        }
    }

    async updateGenre(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const result = await genreService.updateGenre(id, name);
        if ('message' in result) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    }

    async deleteGenre(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const result = await genreService.deleteGenre(id);
        if (result.message === 'Genre does not exist.') {
            res.status(404).json(result);
        } else {
            res.status(204).send();
        }
    }
}
