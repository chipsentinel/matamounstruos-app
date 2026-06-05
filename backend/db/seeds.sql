INSERT INTO usuarios (nombre, password, rol) VALUES
    ('admin', 'admin123', TRUE),
    ('jose', 'jose123', FALSE),
    ('juan', 'admin123', FALSE);


INSERT INTO barajas (nombre, descripcion, idUsuario) VALUES
    ('autoria-gitflow', 
    'Repaso sobre ramas, commits y flujo Gitflow.', 1),
    ('autoria-flujo', 
    'Repaso sobre el flujo de trabajo del proyecto.', 1),
    ('autoria-db', 
    'Repaso sobre base de datos, tablas y relaciones.', 1),
    ('autoria-backend', 
    'Repaso sobre API, rutas y logica del backend.', 2),
    ('autoria-frontend', 
    'Repaso sobre componentes, vistas y estilos del frontend.', 3);

INSERT INTO cartas (nombre, valor, tipoResultado, idBaraja) VALUES
    ('AUTORIA APROBADA', 1, 'APTO', 1),
    ('NO APTO', 2, 'NO_APTO', 1),
    ('NO APTO', 3, 'NO_APTO', 1),
    ('NO APTO', 4, 'NO_APTO', 1),
    ('APTO', 5, 'APTO', 1),
    ('APTO', 6, 'APTO', 1),
    ('APTO', 7, 'APTO', 1),
    ('APTO', 8, 'APTO', 1),
    ('APTO', 9, 'APTO', 1),
    ('ESTUDIANTE EJEMPLAR', 10, 'APTO', 1),
    ('REINA VANESA', 11, 'PRUEBA_OTRA_VEZ', 1),
    ('REY SANTI', 12, 'PRUEBA_OTRA_VEZ', 1);
