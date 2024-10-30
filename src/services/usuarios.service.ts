import { UsuariosRepository } from '../repositories/usuarios.repository';
import { Usuarios } from '../entities/usuarios.entity';
import { CreateUsuariosDto, createUsuariosSchema, UpdateUsuariosDto, updateUsuariosSchema } from '../dto/usuarios';
import { USER_NOT_FOUND, USER_ALREADY_EXISTS } from '../utilities/messages.utility';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';

export class UsuariosService {
    private usuariosRepository: UsuariosRepository;

    constructor() {
        this.usuariosRepository = new UsuariosRepository();
    }

    public getAllUsuarios = async (): Promise<Usuarios[]> => {
        return await this.usuariosRepository.getAllUsuarios();
    };

    public findUsuarioById = async (id: number): Promise<Usuarios | undefined> => {
        const responseById = await this.usuariosRepository.findUsuarioById(id);
        
        if (!responseById) throw new Error(USER_NOT_FOUND);

        return responseById;
    };

    public saveUsuario = async (usuario: CreateUsuariosDto): Promise<Usuarios> => {
        const data = createUsuariosSchema.validate(usuario);

        if (data.error) throw mapJoiErrors(data.error.details);
        const responseByEmail = await this.usuariosRepository.findUsuarioByEmail(usuario.email);

        if (responseByEmail) throw new Error(USER_ALREADY_EXISTS);

        return await this.usuariosRepository.saveUsuario(usuario);
    };

    public updateUsuario = async (usuario: UpdateUsuariosDto): Promise<Usuarios> => {
        const responseById = await this.usuariosRepository.findUsuarioById(usuario.id);
        const data = updateUsuariosSchema.validate(usuario);

        if (data.error) throw mapJoiErrors(data.error.details);
        if (!responseById) throw new Error(USER_NOT_FOUND);

        return await this.usuariosRepository.updateUsuario( usuario );
    };

    public deleteUsuario = async (id: number): Promise<void> => {
        const responseById = await this.usuariosRepository.findUsuarioById(id);
        
        if (!responseById) throw new Error(USER_NOT_FOUND);

        await this.usuariosRepository.deleteUsuario(id);
    };
}
