import Joi from 'joi';

export class CreateCapturadosDto {
    latitud: number;
    longitud: number;
    idUsuario: number;
    idPersonaje: number;
}

export const createCapturadosSchema = Joi.object({
    latitud: Joi.number()
        .required()
        .messages({
            'number.base': 'La latitud debe ser un número.',
            'any.required': 'La latitud es requerida.'
        }),
    longitud: Joi.number()
        .required()
        .messages({
            'number.base': 'La longitud debe ser un número.',
            'any.required': 'La longitud es requerida.'
        }),
    idUsuario: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'ID de usuario debe ser un número.',
            'number.integer': 'ID de usuario debe ser un número entero.',
            'number.positive': 'ID de usuario debe ser un número positivo.',
            'any.required': 'ID de usuario es requerido.'
        }),
    idPersonaje: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'ID de personaje debe ser un número.',
            'number.integer': 'ID de personaje debe ser un número entero.',
            'number.positive': 'ID de personaje debe ser un número positivo.',
            'any.required': 'ID de personaje es requerido.'
        })
}).options({ abortEarly: false });
