import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { Capturados } from './capturados.entity';

@Entity({ name: 'subasta' })
export class Subasta extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', nullable: false })
    horaInicial: Date;

    @Column({ type: 'timestamp', nullable: false })
    horaFinal: Date;

    @ManyToOne(() => Capturados, { nullable: false })
    @JoinColumn({ name: 'id_capturado', referencedColumnName: 'id' })
    capturado: Capturados;
}
