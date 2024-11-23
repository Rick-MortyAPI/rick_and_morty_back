import Joi from 'joi';
import { EstadoSubasta } from './subasta.dto';

export class CreateSubastaDto {
    horaInicial: Date;
    horaFinal: Date;
    idCapturado: number;
    estado: EstadoSubasta;
}

export const createSubastaSchema = Joi.object({
    horaInicial: Joi.date()
        .required()
        .messages({
            'date.base': 'Hora inicial debe ser una fecha válida.',
            'any.required': 'Hora inicial es requerida.'
        }),
    horaFinal: Joi.date()
        .greater(Joi.ref('horaInicial'))
        .required()
        .messages({
            'date.base': 'Hora final debe ser una fecha válida.',
            'date.greater': 'Hora final debe ser posterior a la hora inicial.',
            'any.required': 'Hora final es requerida.'
        }),
    idCapturado: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'ID de capturado debe ser un número.',
            'number.integer': 'ID de capturado debe ser un número entero.',
            'number.positive': 'ID de capturado debe ser un número positivo.',
            'any.required': 'ID de capturado es requerido.'
        }),
    estado: Joi.string()
        .valid(...Object.values(EstadoSubasta)) 
        .default(EstadoSubasta.Disponible)
        .messages({
            'any.only': 'Estado debe ser "Disponible" o "Completado".'
        }),
}).options({ abortEarly: false });
