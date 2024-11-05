export const INTERNAL_SERVER_ERROR = 'Internal server error';

export const USER_NOT_FOUND = 'User not found';
export const USER_ALREADY_EXISTS = 'User already exists';

export const FAVORITO_NOT_FOUND = 'Favorito not found';
export const FAVORITO_ALREADY_EXISTS = 'Favorito already exists';
export const FAVORITO_NOT_FOUND_USER = (id: number) => `Usuario con id ${id} no existe`;

export const SUBASTA_NOT_FOUND = 'Subasta not found';
export const SUBASTA_ALREADY_EXISTS = 'Subasta already exists';
export const SUBASTA_NOT_ALLOWED = 'Subasta not allowed';
export const SUBASTA_USUARIO_NOT_ALLOWED = 'Usuario no encontrado para confirmar la subasta';

export const CAPTURADOS_NOT_FOUND = 'Capturados not found';
export const CAPTURADOS_ALREADY_EXISTS = 'Capturado already exists';
export const CAPTURADOS_NOT_FOUND_USER = (id: number) => `Usuario con id ${id} no existe`;