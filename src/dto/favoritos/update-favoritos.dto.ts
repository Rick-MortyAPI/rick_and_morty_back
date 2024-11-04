import Joi from 'joi';
import { Usuarios } from '../../entities';

export class UpdateFavoritosDto {
    id: number;
    idPersonaje: number;
    idUsuario: number;
}

export const updateFavoritosSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'El id debe ser un número.',
            'number.integer': 'El id debe ser un número entero.',
            'number.positive': 'El id debe ser un número positivo.',
            'any.required': 'El id es requerido.'
        }),
    idUsuario: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            'number.base': 'El id de usuario debe ser un número.',
            'number.integer': 'El id de usuario debe ser un número entero.',
            'number.positive': 'El id de usuario debe ser un número positivo.'
        }),
    idPersonaje: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            'number.base': 'El id del item favorito debe ser un número.',
            'number.integer': 'El id del item favorito debe ser un número entero.',
            'number.positive': 'El id del item favorito debe ser un número positivo.'
        })
}).options({ abortEarly: false });
