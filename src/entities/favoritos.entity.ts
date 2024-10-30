import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Entity({ name: 'favoritos' })
export class Favoritos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario', nullable: false })
  idUsuario: number;

  @Column({ name: 'id_personaje', nullable: false })
  idPersonaje: number;

  @ManyToOne(() => Usuarios, (usuario) => usuario.favoritos, { nullable: false })
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuario: Usuarios;
}
