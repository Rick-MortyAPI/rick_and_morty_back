import { CapturadosRepository } from '../repositories/capturados.repository';
import { Capturados } from '../entities/capturados.entity';
import { CreateCapturadosDto, createCapturadosSchema, UpdateCapturadosDto, updateCapturadosSchema } from '../dto/capturados';
import { CAPTURADOS_NOT_FOUND, CAPTURADOS_ALREADY_EXISTS } from '../utilities/messages.utility';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';

export class CapturadosService {
    private capturadosRepository: CapturadosRepository;

    constructor() {
        this.capturadosRepository = new CapturadosRepository();
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
        const responseById = await this.capturadosRepository.findCapturadoByUserIdAndCharacterId(capturado.idUsuario, capturado.idPersonaje);

        if (data.error) throw mapJoiErrors(data.error.details);
        if (responseById) throw new Error(CAPTURADOS_ALREADY_EXISTS);

        return await this.capturadosRepository.saveCapturado(capturado);
    };

    public updateCapturado = async (capturado: UpdateCapturadosDto): Promise<Capturados> => {
        const responseById = await this.capturadosRepository.findCapturadoById(capturado.id);
        const data = updateCapturadosSchema.validate(capturado);

        if (data.error) throw mapJoiErrors(data.error.details);
        if (!responseById) throw new Error(CAPTURADOS_NOT_FOUND);

        return await this.capturadosRepository.updateCapturado(capturado);
    };

    public deleteCapturado = async (id: number): Promise<void> => {
        const responseById = await this.capturadosRepository.findCapturadoById(id);

        if (!responseById) throw new Error(CAPTURADOS_NOT_FOUND);

        await this.capturadosRepository.deleteCapturado(id);
    }
}
