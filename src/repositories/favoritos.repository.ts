import { AppDataSource } from '../config/data-source.config';
import { CreateFavoritosDto, UpdateFavoritosDto } from '../dto/favoritos';
import { Favoritos } from '../entities/favoritos.entity';

export class FavoritosRepository {
    private repository = AppDataSource.getRepository(Favoritos);

    public getAllFavoritos = async () => {
        return this.repository.find();
    };

    public findFavoritoById = async (id: number) => {
        return this.repository.findOneBy({ id });
    };

    public saveFavorito = async (favorito: CreateFavoritosDto) => {
        return this.repository.save(favorito);
    };

    public updateFavorito = async (favorito: UpdateFavoritosDto) => {
        const { id, ...updateData } = favorito;
        await this.repository.update({ id }, updateData);
        return this.findFavoritoById(id);
    };

    public deleteFavorito = async (id: number) => {
        return this.repository.delete(id);
    };
}
