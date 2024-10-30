import { AppDataSource } from '../config/data-source.config';
import { CreateUsuariosDto, UpdateUsuariosDto } from '../dto/usuarios';
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
        await this.repository.update({ id }, updateData);
        return this.findUsuarioById(id);
    };

    public deleteUsuario = async (id: number) => {
        return this.repository.delete(id);
    };
}
