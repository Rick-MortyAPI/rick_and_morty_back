import { Request, Response } from 'express';
import { FavoritosService } from '../services/favoritos.service';
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, CREATED_STATUS, NOT_FOUND_STATUS, OK_STATUS } from '../utilities/status.utility';

export class FavoritosController {
    private favoritosService: FavoritosService;

    constructor() {
        this.favoritosService = new FavoritosService();
    }

    public getAllFavoritos = async (req: Request, res: Response) => {
        try {
            const favoritos = await this.favoritosService.getAllFavoritos();
            return res.status(OK_STATUS).json(favoritos);
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public getFavoritoById = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const favorito = await this.favoritosService.findFavoritoById(+id);
            return res.status(OK_STATUS).json(favorito);
        } catch (error) {
            return res.status(NOT_FOUND_STATUS).json({ error: error.message });
        }
    }

    public saveFavorito = async (req: Request, res: Response) => {
        const favorito = req.body;

        try {
            await this.favoritosService.saveFavorito(favorito);
            return res.status(CREATED_STATUS).json(favorito);
        } catch (error) {
            if (!error.message) return res.status(BAD_REQUEST_STATUS).json(error);
            return res.status(CONFLICT_STATUS).json({ error: error.message });
        }
    }

    public updateFavorito = async (req: Request, res: Response) => {
        const favorito = req.body;

        try {
            await this.favoritosService.updateFavorito(favorito);
            return res.status(OK_STATUS).json(favorito);
        } catch (error) {
            if (!error.message) return res.status(BAD_REQUEST_STATUS).json(error);
            return res.status(NOT_FOUND_STATUS).json({ error: error.message });
        }
    }

    public deleteFavorito = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            await this.favoritosService.deleteFavorito(+id);
            return res.status(OK_STATUS).json({ message: `Favorito con id: ${id} eliminado correctamente.` });
        } catch (error) {
            return res.status(NOT_FOUND_STATUS).json({ error: error.message });
        }
    }
}
