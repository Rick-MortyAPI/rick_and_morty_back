import { CapturadosRepository } from '../repositories/capturados.repository';
import { Capturados } from '../entities/capturados.entity';
import { CreateCapturadosDto, createCapturadosSchema, UpdateCapturadosDto, updateCapturadosSchema } from '../dto/capturados';
import { CAPTURADOS_NOT_FOUND, CAPTURADOS_ALREADY_EXISTS, CAPTURADOS_NOT_FOUND_USER } from '../utilities/messages.utility';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';
import { UsuariosRepository } from '../repositories/usuarios.repository';

export class CapturadosService {
    private capturadosRepository: CapturadosRepository;
    private usuariosRepository: UsuariosRepository;

    constructor() {
        this.capturadosRepository = new CapturadosRepository();
        this.usuariosRepository = new UsuariosRepository();
    }

    public getAllCapturados = async (): Promise<Capturados[]> => {
        return await this.capturadosRepository.getAllCapturados();
    };

    public findCapturadoById = async (id: number): Promise<Capturados | undefined> => {
        const responseById = await this.capturadosRepository.findCapturadoById(id);

        if (!responseById) throw new Error(CAPTURADOS_NOT_FOUND);

        return responseById;
    };

    public saveCapturado = async (capturado: CreateCapturadosDto): Promise<Capturados> => {
        const data = createCapturadosSchema.validate(capturado);
        if (data.error) throw new Error(data.error.details.map(err => err.message).join(", "));
        
        const usuario = await this.usuariosRepository.findUsuarioById(capturado.idUsuario);
        if (!usuario) throw new Error(CAPTURADOS_NOT_FOUND_USER(capturado.idUsuario));
        
        const responseById = await this.capturadosRepository.findCapturadoByUserIdAndCharacterId(capturado.idUsuario, capturado.idPersonaje);
        if (responseById) throw new Error(CAPTURADOS_ALREADY_EXISTS);

        
        const usuarioData = {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
            "email": usuario.email,
            "contrasenia": usuario.contrasenia,
            "numIntercambios": usuario.numIntercambios,
            "numCapturados": usuario.numCapturados += 1
        }
        
        await this.usuariosRepository.updateUsuario(usuarioData);

        return await this.capturadosRepository.saveCapturado(capturado);
    };

    public updateCapturado = async (capturado: UpdateCapturadosDto): Promise<Capturados> => {
        const responseById = await this.capturadosRepository.findCapturadoById(capturado.id);
        const data = updateCapturadosSchema.validate(capturado);

        if (data.error) throw new Error(data.error.details.map(err => err.message).join(", "));
        if (!responseById) throw new Error(CAPTURADOS_NOT_FOUND);

        return await this.capturadosRepository.updateCapturado(capturado);
    };

    public deleteCapturado = async (id: number): Promise<void> => {
        const responseById = await this.capturadosRepository.findCapturadoById(id);
        if (!responseById) throw new Error(CAPTURADOS_NOT_FOUND);

        const usuario = await this.usuariosRepository.findUsuarioById(responseById.idUsuario);
        if (!usuario) throw new Error(CAPTURADOS_NOT_FOUND_USER(responseById.idUsuario));

        const usuarioData = {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
            "email": usuario.email,
            "contrasenia": usuario.contrasenia,
            "numIntercambios": usuario.numIntercambios,
            "numCapturados": usuario.numCapturados -= 1
        }
        
        await this.usuariosRepository.updateUsuario(usuarioData);

        await this.capturadosRepository.deleteCapturado(id);
    }
}
