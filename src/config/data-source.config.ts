import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuarios, Favoritos, Capturados, Subasta } from '../entities';

dotenv.config();

const { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_TYPE, DATABASE_USER } = process.env;
const DEFAULT_PORT = '5432';
const DEFAULT_SYNCHRONIZE = false;

export const AppDataSource = new DataSource({
    type: DATABASE_TYPE as 'postgres',
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT || DEFAULT_PORT),
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    synchronize: DEFAULT_SYNCHRONIZE,
    logging: false,
    ssl: {
        rejectUnauthorized: false, 
    },
    entities: [
        Usuarios,
        Favoritos,
        Capturados,
        Subasta
    ],
    migrations: [
        __dirname + '/migration/*.ts'
    ],
    subscribers: [],
});
