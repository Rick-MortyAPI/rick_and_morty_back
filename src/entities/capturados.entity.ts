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

    @Column({ name: 'id_personaje', nullable: false })
    idPersonaje: number;

    @ManyToOne(() => Usuarios, (usuario) => usuario.capturados, { nullable: false })
    @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
    usuario: Usuarios;
}
