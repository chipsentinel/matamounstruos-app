USE matamounstruos;

CREATE TABLE usuario (
    idUsuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(10) NOT NULL,
    password VARCHAR(20) NOT NULL,
    rol BOOLEAN DEFAULT FALSE
);

CREATE TABLE baraja (
    idBaraja INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    idUsuario INT UNSIGNED NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);