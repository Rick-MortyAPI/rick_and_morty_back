import express from 'express';
import { FavoritosController } from '../controllers/favoritos.controller';

export const favoritosRouter = express.Router();
const favoritosController = new FavoritosController();

favoritosRouter.get('/getAll', favoritosController.getAllFavoritos.bind(favoritosController));
favoritosRouter.get('/getById/:id', favoritosController.getFavoritoById.bind(favoritosController));
favoritosRouter.post('/create', favoritosController.saveFavorito.bind(favoritosController));
favoritosRouter.put('/update', favoritosController.updateFavorito.bind(favoritosController));
favoritosRouter.delete('/delete/:id', favoritosController.deleteFavorito.bind(favoritosController));
