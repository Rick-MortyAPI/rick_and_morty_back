import { FavoritosRepository } from '../repositories/favoritos.repository';
import { Favoritos } from '../entities/favoritos.entity';
import { CreateFavoritosDto, createFavoritosSchema, UpdateFavoritosDto, updateFavoritosSchema } from '../dto/favoritos';
import { FAVORITO_NOT_FOUND, FAVORITO_ALREADY_EXISTS } from '../utilities/messages.utility';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';

export class FavoritosService {
    private favoritosRepository: FavoritosRepository;

    constructor() {
        this.favoritosRepository = new FavoritosRepository();
    }

    public getAllFavoritos = async (): Promise<Favoritos[]> => {
        return await this.favoritosRepository.getAllFavoritos();
    };

    public findFavoritoById = async (id: number): Promise<Favoritos | undefined> => {
        const responseById = await this.favoritosRepository.findFavoritoById(id);

        if (!responseById) throw new Error(FAVORITO_NOT_FOUND);

        return responseById;
    };

    public saveFavorito = async (favorito: CreateFavoritosDto): Promise<Favoritos> => {
        const data = createFavoritosSchema.validate(favorito);

        if (data.error) throw mapJoiErrors(data.error.details);

        return await this.favoritosRepository.saveFavorito(favorito);
    };

    public updateFavorito = async (favorito: UpdateFavoritosDto): Promise<Favoritos> => {
        const responseById = await this.favoritosRepository.findFavoritoById(favorito.id);
        const data = updateFavoritosSchema.validate(favorito);

        if (data.error) throw mapJoiErrors(data.error.details);
        if (!responseById) throw new Error(FAVORITO_NOT_FOUND);

        return await this.favoritosRepository.updateFavorito(favorito);
    };

    public deleteFavorito = async (id: number): Promise<void> => {
        const responseById = await this.favoritosRepository.findFavoritoById(id);

        if (!responseById) throw new Error(FAVORITO_NOT_FOUND);

        await this.favoritosRepository.deleteFavorito(id);
    };
}
