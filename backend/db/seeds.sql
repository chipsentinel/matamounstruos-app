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

INSERT INTO tarjetas (titulo, contenido, idBaraja) VALUES
    ('Crear una rama', 
    'Se usa para separar una tarea nueva del resto del proyecto. Comando: git checkout -b feature/nombre.', 
    1),
    ('Revisar estado', 
    'Sirve para saber si hay cambios pendientes antes de actuar. Comando: git status.', 
    1),
    ('Preparar un commit', 
    'Permite añadir solo los archivos relacionados con la tarea. Comando: git add archivo.', 
    1),
    ('Crear un commit', 
    'Guarda una unidad de trabajo con un mensaje claro. Comando: git commit -m \"tipo: mensaje\".', 
    1),
    ('Subir una rama', 
    'Envia el trabajo local a GitHub para poder abrir una pull request. Comando: git push origin rama.', 
    1),
    ('Actualizar con rebase', 
    'Coloca tus commits encima de los cambios remotos para mantener el historial limpio. Comando: git pull --rebase origin rama.', 
    1),
    ('Resolver conflictos', 
    'Consiste en elegir el contenido correcto, guardar el archivo y continuar. Comando: git rebase --continue.', 
    1),
    ('Cancelar rebase', 
    'Permite volver al estado anterior si el rebase se complica. Comando: git rebase --abort.', 
    1),
    ('Guardar cambios', 
    'Aparta cambios temporalmente sin hacer commit para poder cambiar de rama. Comando: git stash.', 
    1),
    ('Recuperar trabajo', 
    'Permite consultar movimientos anteriores de Git para recuperar una referencia. Comando: git reflog.', 
    1);
