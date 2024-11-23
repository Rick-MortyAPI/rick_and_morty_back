DROP TABLE Usuarios;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    numIntercambios INTEGER DEFAULT 0,
    numCapturados INTEGER DEFAULT 0
);

-- Tabla Favoritos
CREATE TABLE Favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES Usuarios(id) ON DELETE CASCADE,
    idPersonaje INTEGER NOT NULL
);

-- Tabla Capturados
CREATE TABLE Capturados (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES Usuarios(id) ON DELETE CASCADE,
    idPersonaje INTEGER NOT NULL,
    latitud DECIMAL(9, 6) NOT NULL,
    longitud DECIMAL(9, 6) NOT NULL
);

-- Primero, definimos el tipo ENUM para el estado
CREATE TYPE estado_subasta AS ENUM ('Disponible', 'Completado');

-- Tabla Subasta
CREATE TABLE Subasta (
    id SERIAL PRIMARY KEY,
    capturado_id INTEGER REFERENCES Capturados(id) ON DELETE CASCADE,
    horaInicial TIMESTAMP NOT NULL,
    horaFinal TIMESTAMP NOT NULL,
    estado estado_subasta DEFAULT 'Disponible'
);
