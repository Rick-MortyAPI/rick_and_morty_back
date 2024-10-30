import express from 'express';
import { SubastasController } from '../controllers/subasta.controller';

export const subastasRouter = express.Router();
const subastasController = new SubastasController();

subastasRouter.get('/getAll', subastasController.getAllSubastas.bind(subastasController));
subastasRouter.post('/create', subastasController.saveSubasta.bind(subastasController));
subastasRouter.delete('/delete/:id', subastasController.deleteSubasta.bind(subastasController));
