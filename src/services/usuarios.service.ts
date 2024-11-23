import { UsuariosRepository } from '../repositories/usuarios.repository';
import { Usuarios } from '../entities/usuarios.entity';
import { CreateUsuariosDto, createUsuariosSchema, UpdateUsuariosDto, updateUsuariosSchema, UsuariosDto } from '../dto/usuarios';
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
        if (data.error) throw new Error(data.error.details.map(err => err.message).join(", "));

        const responseByEmail = await this.usuariosRepository.findUsuarioByEmail(usuario.email);

        if (responseByEmail) throw new Error(USER_ALREADY_EXISTS);

        return await this.usuariosRepository.saveUsuario(usuario);
    };

    public updateUsuario = async (usuario: UpdateUsuariosDto): Promise<Usuarios> => {
        const responseById = await this.usuariosRepository.findUsuarioById(usuario.id);
        
        const data = updateUsuariosSchema.validate(usuario);
        if (data.error) if (data.error) throw new Error(data.error.details.map(err => err.message).join(", "));
        
        if (!responseById) throw new Error(USER_NOT_FOUND);
        
        const updatedUser = await this.usuariosRepository.updateUsuario(usuario);
        return updatedUser;
    };

    public async getUsuariosRankedByIntercambios(): Promise<UsuariosDto[]> {
        return await this.usuariosRepository.getUsuariosRankedByIntercambios();
    }    

    public async getUsuariosRankedByCapturados(): Promise<UsuariosDto[]> {
        return await this.usuariosRepository.getUsuariosRankedByCapturados();
    }

    public deleteUsuario = async (id: number): Promise<void> => {
        const responseById = await this.usuariosRepository.findUsuarioById(id);
        
        if (!responseById) {
            throw new Error(USER_NOT_FOUND);
        }
    
        await this.usuariosRepository.deleteUsuario(id);
    };
    
}
