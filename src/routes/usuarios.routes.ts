import express from 'express';
import { UsuariosController } from '../controllers/usuarios.controller';

export const usuariosRouter = express.Router();
const usuariosController = new UsuariosController();

usuariosRouter.get('/getAll', usuariosController.getAllUsuarios.bind(usuariosController));
usuariosRouter.get('/findById/:id', usuariosController.findUsuarioById.bind(usuariosController));
usuariosRouter.post('/create', usuariosController.saveUsuario.bind(usuariosController));
usuariosRouter.put('/update', usuariosController.updateUsuario);
usuariosRouter.delete('/delete/:id', usuariosController.deleteUsuario.bind(usuariosController));