import Joi from 'joi';

export class UpdateSubastaDto {
    id: number;
    horaInicial: Date;
    horaFinal: Date;
    idCapturado: number;
}

export const updateSubastaSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'ID de subasta debe ser un número.',
            'number.integer': 'ID de subasta debe ser un número entero.',
            'number.positive': 'ID de subasta debe ser un número positivo.',
            'any.required': 'ID de subasta es requerido.'
        }),
    horaInicial: Joi.date()
        .optional()
        .messages({
            'date.base': 'Hora inicial debe ser una fecha válida.',
        }),
    horaFinal: Joi.date()
        .greater(Joi.ref('horaInicial'))
        .optional()
        .messages({
            'date.base': 'Hora final debe ser una fecha válida.',
            'date.greater': 'Hora final debe ser posterior a la hora inicial.',
        }),
    idCapturado: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            'number.base': 'ID de capturado debe ser un número.',
            'number.integer': 'ID de capturado debe ser un número entero.',
            'number.positive': 'ID de capturado debe ser un número positivo.',
        }),
}).options({ abortEarly: false });
