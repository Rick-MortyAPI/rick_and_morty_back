import { FavoritosRepository } from '../repositories/favoritos.repository';
import { Favoritos } from '../entities/favoritos.entity';
import { CreateFavoritosDto, createFavoritosSchema, UpdateFavoritosDto, updateFavoritosSchema } from '../dto/favoritos';
import { FAVORITO_NOT_FOUND, FAVORITO_ALREADY_EXISTS, FAVORITO_NOT_FOUND_USER } from '../utilities/messages.utility';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';
import { UsuariosRepository } from '../repositories/usuarios.repository';

export class FavoritosService {
    private favoritosRepository: FavoritosRepository;
    private usuariosRepository: UsuariosRepository;

    constructor() {
        this.favoritosRepository = new FavoritosRepository();
        this.usuariosRepository = new UsuariosRepository();
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
    
        if (data.error) throw new Error(data.error.details.map(err => err.message).join(", "));
    
        const usuario = await this.usuariosRepository.findUsuarioById(favorito.idUsuario);
    
        if (!usuario) {
            throw new Error(FAVORITO_NOT_FOUND_USER(favorito.idUsuario));
        }
    
        const favoritoData = {
            ...favorito,
            usuario,
        };
    
        return await this.favoritosRepository.saveFavorito(favoritoData);
    };
    

    public updateFavorito = async (favorito: UpdateFavoritosDto) => {
        const { id, idPersonaje, idUsuario } = favorito;

        const val = updateFavoritosSchema.validate(favorito);
        if (val.error) throw new Error(val.error.details.map(err => err.message).join(", "));
    
        const favoritoExistente = await this.favoritosRepository.findFavoritoById(id);
        if (!favoritoExistente) throw new Error(FAVORITO_NOT_FOUND);

        const usuario = await this.usuariosRepository.findUsuarioById(idUsuario);
        if (!usuario) throw new Error(FAVORITO_NOT_FOUND_USER(idUsuario));

        const data = {
            id: id,
            idPersonaje: idPersonaje,
            idUsuario: idUsuario
        }
    
        await this.favoritosRepository.updateFavorito(data);
        return this.findFavoritoById(id);
    };
    
    public deleteFavorito = async (id: number): Promise<void> => {
        const responseById = await this.favoritosRepository.findFavoritoById(id);

        if (!responseById) throw new Error(FAVORITO_NOT_FOUND);

        await this.favoritosRepository.deleteFavorito(id);
    };
}
