import { AppDataSource } from '../config/data-source.config';
import { CreateSubastaDto, UpdateSubastaDto } from '../dto/subasta';
import { Subasta } from '../entities/subasta.entity';

export class SubastaRepository {
    private repository = AppDataSource.getRepository(Subasta);

    public getAllSubastas = async () => {
        return this.repository.find();
    };

    public findSubastaById = async (id: number) => {
        return this.repository.findOneBy({ id });
    };

    public saveSubasta = async (subasta: CreateSubastaDto) => {
        return this.repository.save(subasta);
    };

    public updateSubasta = async (subasta: UpdateSubastaDto) => {
        const { id, ...updateData } = subasta;
        await this.repository.update({ id }, updateData);
        return this.findSubastaById(id);
    };

    public deleteSubasta = async (id: number) => {
        return this.repository.delete(id);
    };
}
