import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Favoritos } from './favoritos.entity';
import { Capturados } from './capturados.entity';

@Entity({ name: 'usuarios' })
export class Usuarios extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre', type: 'varchar', length: 50, nullable: false })
    nombre: string;

    @Column({ name: 'apellido', type: 'varchar', length: 50, nullable: false })
    apellido: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ name: 'contrasenia', type: 'varchar', length: 255, nullable: false })
    contrasenia: string;

    @Column({ name: 'numintercambios', type: 'int', default: 0, nullable: false })
    numIntercambios: number;

    @Column({ name: 'numcapturados', type: 'int', default: 0, nullable: false })
    numCapturados: number;

    @OneToMany(() => Favoritos, (favorito) => favorito.usuario)
    favoritos: Favoritos[];

    @OneToMany(() => Capturados, (capturado) => capturado.usuario)
    capturados: Capturados[];
}
