INSERT INTO usuario (nombre, password, rol) VALUES
    ('admin', 'admin123', TRUE),
    ('jose', 'jose123', FALSE),
    ('juan', 'admin123', FALSE);


INSERT INTO baraja (nombre, descripcion, idUsuario) VALUES
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