import Joi from 'joi';

export class CreateFavoritosDto {
    idUsuario: number;
    idPersonaje: number;
}

export const createFavoritosSchema = Joi.object({
    idUsuario: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'El id de usuario debe ser un número.',
            'number.integer': 'El id de usuario debe ser un número entero.',
            'number.positive': 'El id de usuario debe ser un número positivo.',
            'any.required': 'El id de usuario es requerido.'
        }),
        idPersonaje: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'El id del item favorito debe ser un número.',
            'number.integer': 'El id del item favorito debe ser un número entero.',
            'number.positive': 'El id del item favorito debe ser un número positivo.',
            'any.required': 'El id del item favorito es requerido.'
        })
}).options({ abortEarly: false });
