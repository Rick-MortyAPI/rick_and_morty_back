import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Entity({ name: 'favoritos' })
export class Favoritos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'idpersonaje', nullable: false })
  idPersonaje: number;

  @Column({ name: 'usuario_id', nullable: false })
  idUsuario: number;

  @ManyToOne(() => Usuarios, { nullable: false, eager: true })
  @JoinColumn({ name: 'usuario_id'})
  usuario: Usuarios;
}