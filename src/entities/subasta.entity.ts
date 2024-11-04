import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { Capturados } from './capturados.entity';
import { EstadoSubasta } from '../dto/subasta';

@Entity({ name: 'subasta' })
export class Subasta extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "horainicial", type: 'timestamp', nullable: false })
    horaInicial: Date;

    @Column({ name: "horafinal", type: 'timestamp', nullable: false })
    horaFinal: Date;

    @Column({ name: 'capturado_id', nullable: false })
    idCapturado: number;

    @ManyToOne(() => Capturados, { nullable: false, eager: true })
    @JoinColumn({ name: 'capturado_id' })
    capturado: Capturados;

    @Column({
        type: 'enum',
        enum: EstadoSubasta,
        default: EstadoSubasta.Disponible,
    })
    estado: EstadoSubasta;
}
