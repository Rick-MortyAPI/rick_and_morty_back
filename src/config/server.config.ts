import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { errorHandler } from '../middlewares/error.middleware';
import { AppDataSource } from './data-source.config';
import { usuariosRouter, favoritosRouter, capturadosRouter, subastasRouter } from '../routes';

dotenv.config();

export class Server {
    private app: express.Application;
    private port: number;
    private path: string;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.APP_PORT || '3000');
        this.path = '/api';

        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeDataSource();
    }

    private initializeMiddleware = (): void => {
        // Configurar CORS para permitir todos los orígenes
        this.app.use(cors({
            origin: '*', // Permitir todos los orígenes
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: false, // Cambiar a true si necesitas cookies o autenticación basada en credenciales
        }));

        // Agregar encabezados a todas las respuestas
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // Permitir todos los orígenes
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });

        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(errorHandler);
    };

    private initializeRoutes = (): void => {
        this.app.use(`${this.path}/usuarios`, usuariosRouter);
        this.app.use(`${this.path}/favoritos`, favoritosRouter);
        this.app.use(`${this.path}/capturados`, capturadosRouter);
        this.app.use(`${this.path}/subastas`, subastasRouter);
    };

    private initializeDataSource = async (): Promise<void> => {
        try {
            await AppDataSource.initialize();
            console.log('Data Source has been initialized!');
        } catch (error) {
            console.log('Error initializing Data Source:', error);
        }
    };

    public startServer = (): void => {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    };
}
