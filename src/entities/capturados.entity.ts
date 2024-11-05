import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Entity({ name: 'capturados' })
export class Capturados extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { nullable: false })
    latitud: number;

    @Column('decimal', { nullable: false })
    longitud: number;

    @Column({ name: 'idpersonaje', nullable: false })
    idPersonaje: number;

    @Column({ name: 'usuario_id', nullable: false })
    idUsuario: number;

    @ManyToOne(() => Usuarios, { nullable: false, eager: true })
    @JoinColumn({ name: 'usuario_id'})
    usuario: Usuarios;
}
