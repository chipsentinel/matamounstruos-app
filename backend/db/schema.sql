USE matamounstruosdb;

CREATE TABLE usuarios (
    idUsuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(10) NOT NULL,
    password VARCHAR(20) NOT NULL,
    rol BOOLEAN DEFAULT FALSE
);

CREATE TABLE barajas (
    idBaraja INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    idUsuario INT UNSIGNED NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);

CREATE TABLE cartas (
    idCarta INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    valor INT NOT NULL,
    tipoResultado ENUM('APTO', 'NO_APTO', 'PRUEBA_OTRA_VEZ') NOT NULL,
    idBaraja INT UNSIGNED NOT NULL,
    FOREIGN KEY (idBaraja) REFERENCES barajas(idBaraja)
);

CREATE TABLE tarjetas (
    idTarjeta INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    contenido TEXT NOT NULL,
    idBaraja INT UNSIGNED NOT NULL,
    FOREIGN KEY (idBaraja) REFERENCES barajas(idBaraja)
);