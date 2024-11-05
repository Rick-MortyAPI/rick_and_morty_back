import { SubastaRepository } from '../repositories/subasta.repository';
import { Subasta } from '../entities/subasta.entity';
import { CreateSubastaDto, createSubastaSchema, EstadoSubasta, SubastaDto, UpdateSubastaDto, updateSubastaSchema } from '../dto/subasta';
import { SUBASTA_NOT_FOUND, SUBASTA_ALREADY_EXISTS, SUBASTA_NOT_ALLOWED, SUBASTA_USUARIO_NOT_ALLOWED } from '../utilities/messages.utility';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';
import { UsuariosService } from './usuarios.service';
import { UsuariosRepository } from '../repositories/usuarios.repository';
import { CapturadosRepository } from '../repositories/capturados.repository';
import { CapturadosService } from './capturados.service';

export class SubastaService {
    private subastaRepository: SubastaRepository;
    private usuariosService: UsuariosService;
    private CapturadosService: CapturadosService; 

    constructor() {
        this.subastaRepository = new SubastaRepository();
        this.usuariosService = new UsuariosService();
        this.CapturadosService = new CapturadosService();
    }

    public getAllSubastas = async (): Promise<Subasta[]> => {
        return await this.subastaRepository.getAllSubastas();
    };

    public findSubastaById = async (id: number): Promise<Subasta | undefined> => {
        const responseById = await this.subastaRepository.findSubastaById(id);

        if (!responseById) throw new Error(SUBASTA_NOT_FOUND);

        return responseById;
    };

    public saveSubasta = async (subasta: CreateSubastaDto): Promise<Subasta> => {
        const data = createSubastaSchema.validate(subasta);

        if (data.error) throw mapJoiErrors(data.error.details);

        return await this.subastaRepository.saveSubasta(subasta);
    };

    public updateSubasta = async (subasta: UpdateSubastaDto): Promise<Subasta> => {
        const data = updateSubastaSchema.validate(subasta);
        if (data.error) throw new Error(data.error.details.map(err => err.message).join(", "));
    
        const subastaExistente = await this.subastaRepository.findSubastaById(subasta.id);
        if (!subastaExistente) throw new Error(SUBASTA_NOT_FOUND);
    
        return await this.subastaRepository.updateSubasta(subasta);
    };    

    public deleteSubasta = async (id: number): Promise<void> => {
        const responseById = await this.subastaRepository.findSubastaById(id);

        if (!responseById) throw new Error(SUBASTA_NOT_FOUND);

        await this.subastaRepository.deleteSubasta(id);
    };

    public async confirmSubasta(subastaId: number, userId: number, idPersonajeIntercambio: number): Promise<SubastaDto> {
        const subasta = await this.subastaRepository.findSubastaById(subastaId);
        if (!subasta || subasta.estado !== "Disponible") throw new Error(SUBASTA_NOT_ALLOWED);

        const usuarioCreador = subasta.capturado.usuario;
        const usuarioIntercambiador = await this.usuariosService.findUsuarioById(userId);
        if (!usuarioIntercambiador) throw new Error(SUBASTA_USUARIO_NOT_ALLOWED);

        const personajeIntercambio = await this.CapturadosService.findCapturadoById(idPersonajeIntercambio);
        if (!personajeIntercambio || personajeIntercambio.idUsuario !== userId) throw new Error(SUBASTA_USUARIO_NOT_ALLOWED);

        // Intercambiar el idUsuario del capturado
        const capturadoOriginal = subasta.capturado;
        capturadoOriginal.idUsuario = usuarioIntercambiador.id;
        personajeIntercambio.idUsuario = usuarioCreador.id;

        delete capturadoOriginal.usuario;
        await this.CapturadosService.updateCapturado(capturadoOriginal);

        delete personajeIntercambio.usuario;
        await this.CapturadosService.updateCapturado(personajeIntercambio);

        usuarioCreador.numIntercambios += 1;
        usuarioIntercambiador.numIntercambios += 1;
        await this.usuariosService.updateUsuario(usuarioCreador);
        await this.usuariosService.updateUsuario(usuarioIntercambiador);

        const subastaCompletada = {
            "id": subastaId,
            "horaInicial": subasta.horaInicial,
            "horaFinal": subasta.horaFinal,
            "idCapturado": subasta.idCapturado,
            "estado": EstadoSubasta.Completado
        }

        return await this.subastaRepository.updateSubasta(subastaCompletada);
    }

}
