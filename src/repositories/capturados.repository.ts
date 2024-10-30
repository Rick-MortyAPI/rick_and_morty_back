import { AppDataSource } from '../config/data-source.config';
import { CreateCapturadosDto, UpdateCapturadosDto } from '../dto/capturados';
import { Capturados } from '../entities/capturados.entity';

export class CapturadosRepository {
    private repository = AppDataSource.getRepository(Capturados);

    public getAllCapturados = async () => {
        return this.repository.find();
    };

    public findCapturadoById = async (id: number) => {
        return this.repository.findOneBy({ id });
    };

    public findCapturadoByUserIdAndCharacterId = async (userId: number, characterId: number): Promise<Capturados | null> => {
        return await this.repository.findOne({
            where: {
                idPersonaje: characterId,
                usuario: {
                    id: userId,
                },
            },
        });
    };
    
    

    public saveCapturado = async (capturado: CreateCapturadosDto) => {
        return this.repository.save(capturado);
    };

    public updateCapturado = async (capturado: UpdateCapturadosDto) => {
        const { id, ...updateData } = capturado;
        await this.repository.update({ id }, updateData);
        return this.findCapturadoById(id);
    };

    public deleteCapturado = async (id: number) => {
        return this.repository.delete(id);
    };
}
