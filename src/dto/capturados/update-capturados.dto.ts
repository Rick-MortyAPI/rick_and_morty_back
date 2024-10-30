import Joi from 'joi';

export class UpdateCapturadosDto {
    id: number;
    latitud: number;
    longitud: number;
    idUsuario: number;
    idPersonaje: number;
}

export const updateCapturadosSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'ID de capturado debe ser un número.',
            'number.integer': 'ID de capturado debe ser un número entero.',
            'number.positive': 'ID de capturado debe ser un número positivo.',
            'any.required': 'ID de capturado es requerido.'
        }),
    latitud: Joi.number()
        .optional()
        .messages({
            'number.base': 'La latitud debe ser un número.',
        }),
    longitud: Joi.number()
        .optional()
        .messages({
            'number.base': 'La longitud debe ser un número.',
        }),
    idUsuario: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            'number.base': 'ID de usuario debe ser un número.',
            'number.integer': 'ID de usuario debe ser un número entero.',
            'number.positive': 'ID de usuario debe ser un número positivo.',
        }),
    idPersonaje: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            'number.base': 'ID de personaje debe ser un número.',
            'number.integer': 'ID de personaje debe ser un número entero.',
            'number.positive': 'ID de personaje debe ser un número positivo.',
        })
}).options({ abortEarly: false });
