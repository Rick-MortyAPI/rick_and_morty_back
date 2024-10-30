import Joi from 'joi';

export class UpdateUsuariosDto {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    numIntercambios: number;
    numCapturados: number;
}

export const updateUsuariosSchema = Joi.object({
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
    nombre: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Nombre no puede estar vacío.',
            'string.min': 'Nombre debe tener al menos {#limit} caracteres.',
            'string.max': 'Nombre no puede tener más de {#limit} caracteres.',
            'any.required': 'Nombre es requerido.'
        }),
    apellido: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Apellido no puede estar vacío.',
            'string.min': 'Apellido debe tener al menos {#limit} caracteres.',
            'string.max': 'Apellido no puede tener más de {#limit} caracteres.',
            'any.required': 'Apellido es requerido.'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Debe ser un email válido.',
            'any.required': 'Email es requerido.'
        }),
    contrasenia: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': 'Contraseña debe tener al menos {#limit} caracteres.',
            'any.required': 'Contraseña es requerida.'
        }),
    numIntercambios: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'string.integer': 'Debe ser un número entero.',
            'string.min': 'Debe ser un número positivo.',
            'any.required': 'Email es requerido.'
        }),
    numCapturados: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'string.integer': 'Debe ser un número entero.',
            'string.min': 'Debe ser un número positivo.',
            'any.required': 'Email es requerido.'
        })
}).options({ abortEarly: false });
