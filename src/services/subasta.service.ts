import { SubastaRepository } from '../repositories/subasta.repository';
import { Subasta } from '../entities/subasta.entity';
import { CreateSubastaDto, createSubastaSchema, UpdateSubastaDto, updateSubastaSchema } from '../dto/subasta';
import { SUBASTA_NOT_FOUND, SUBASTA_ALREADY_EXISTS } from '../utilities/messages.utility';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';

export class SubastaService {
    private subastaRepository: SubastaRepository;

    constructor() {
        this.subastaRepository = new SubastaRepository();
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
        const responseById = await this.subastaRepository.findSubastaById(subasta.id);
        const data = updateSubastaSchema.validate(subasta);

        if (data.error) throw mapJoiErrors(data.error.details);
        if (!responseById) throw new Error(SUBASTA_NOT_FOUND);

        return await this.subastaRepository.updateSubasta(subasta);
    };

    public deleteSubasta = async (id: number): Promise<void> => {
        const responseById = await this.subastaRepository.findSubastaById(id);

        if (!responseById) throw new Error(SUBASTA_NOT_FOUND);

        await this.subastaRepository.deleteSubasta(id);
    };
}
