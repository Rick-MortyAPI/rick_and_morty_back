import express from 'express';
import { CapturadosController } from '../controllers/capturados.controller';

export const capturadosRouter = express.Router();
const capturadosController = new CapturadosController();

capturadosRouter.get('/getAll', capturadosController.getAllCapturados.bind(capturadosController));
capturadosRouter.post('/create', capturadosController.saveCapturado.bind(capturadosController));
capturadosRouter.delete('/delete/:id', capturadosController.deleteCapturado.bind(capturadosController));
