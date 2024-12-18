import { AppDataSource } from '../config/data-source.config';
import { CreateUsuariosDto, UpdateUsuariosDto, UsuariosDto } from '../dto/usuarios';
import { Usuarios } from '../entities/usuarios.entity';

export class UsuariosRepository {
    private repository = AppDataSource.getRepository(Usuarios);

    public getAllUsuarios = async () => {
        return this.repository.find();
    };

    public findUsuarioById = async (id: number) => {
        return this.repository.findOneBy({ id });
    };

    public findUsuarioByEmail = async (email: string) => {
        return this.repository.findOneBy({ email });
    }

    public saveUsuario = async (usuario: CreateUsuariosDto) => {
        return this.repository.save(usuario);
    };

    public updateUsuario = async (usuario: UpdateUsuariosDto) => {
        const { id, ...updateData } = usuario;
        const usuarioExistente = await this.findUsuarioById(id);
        
        if (!usuarioExistente) {
            throw new Error('Usuario no encontrado');
        }
        await this.repository.update({ id }, updateData);
        return this.findUsuarioById(id);
    };    

    public async getUsuariosRankedByIntercambios(): Promise<UsuariosDto[] | null> {
        return await this.repository
            .createQueryBuilder("usuario")
            .orderBy("usuario.numIntercambios", "DESC")
            .getMany();
    }    

    public async getUsuariosRankedByCapturados(): Promise<UsuariosDto[] | null> {
        return await this.repository
            .createQueryBuilder("usuario")
            .orderBy("usuario.numCapturados", "DESC")
            .getMany();
    }

    public deleteUsuario = async (id: number) => {
        const result = await this.repository.delete(id);
        return result;
    };
    
}
