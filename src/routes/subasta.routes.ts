import express from 'express';
import { SubastasController } from '../controllers/subasta.controller';

export const subastasRouter = express.Router();
const subastasController = new SubastasController();

subastasRouter.get('/getAll', subastasController.getAllSubastas.bind(subastasController));
subastasRouter.get('/getById/:id', subastasController.getSubastaById.bind(subastasController));
subastasRouter.post('/create', subastasController.saveSubasta.bind(subastasController));
subastasRouter.put('/update', subastasController.updateSubasta.bind(subastasController));
subastasRouter.delete('/delete/:id', subastasController.deleteSubasta.bind(subastasController));
subastasRouter.post('/confirm', subastasController.confirmSubasta.bind(subastasController));
