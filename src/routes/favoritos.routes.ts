import express from 'express';
import { FavoritosController } from '../controllers/favoritos.controller';

export const favoritosRouter = express.Router();
const favoritosController = new FavoritosController();

favoritosRouter.get('/getAll', favoritosController.getAllFavoritos.bind(favoritosController));
favoritosRouter.post('/create', favoritosController.saveFavorito.bind(favoritosController));
favoritosRouter.delete('/delete/:id', favoritosController.deleteFavorito.bind(favoritosController));
