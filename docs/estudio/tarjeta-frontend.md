# Tarjetas de estudio: frontend

Este documento queda como espacio de trabajo para definir las pantallas, componentes y estados visuales de las tarjetas de estudio.

La intención es preparar cómo se mostrará el contenido de repaso al usuario dentro de la aplicación.

## Indice

- [Objetivo](#objetivo)
- [Conceptos principales](#conceptos-principales)
- [Configuracion inicial](#configuracion-inicial)
- [Pantallas](#pantallas)
- [Componentes](#componentes)
- [Formularios](#formularios)
- [Estados de pantalla](#estados-de-pantalla)
- [Contenido de una tarjeta](#contenido-de-una-tarjeta)
- [Errores frecuentes](#errores-frecuentes)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
- [Navegacion final](#navegacion-final)

## Objetivo

Preparar el frontend de Matamounstruos App con React y Vite, siguiendo un enfoque responsive mobile-first.

La issue 4 se centra en crear la carpeta `frontend/`, instalar la base del proyecto, conectar más adelante con el backend mediante `fetch()` y construir la interfaz primero para móvil y después para escritorio.

## Conceptos principales

| Concepto | Explicacion | Notas |
| --- | --- | --- |
| React | Libreria para construir la interfaz del frontend. | Se crea mediante Vite. |
| Vite | Herramienta para crear y levantar el proyecto frontend. | Usa `npm run dev` en desarrollo. |
| Mobile-first | Forma de diseñar empezando por móvil. | Después se adapta a escritorio. |
| `fetch()` | API de JavaScript para pedir datos al backend. | Se usara para consumir la API REST. |
| Bootstrap | Framework CSS responsive. | Instalado e importado en `main.jsx`. |
| SweetAlert2 | Libreria para alertas y confirmaciones. | Instalado; se importara en los componentes donde se use. |

## Configuracion inicial

| Elemento | Estado | Explicacion |
| --- | --- | --- |
| `frontend/` | Creado | Carpeta independiente para el frontend. |
| React + Vite | Configurado | Proyecto creado con `npm create vite@latest frontend`. |
| Variante | Configurada | Se selecciono React con JavaScript. |
| `npm install` | Ejecutado | Instala las dependencias base del proyecto. |
| `npm run dev` | Comprobado | Arranca Vite en `http://localhost:5173/`. |
| `frontend/.gitignore` | Revisado | Evita subir `node_modules/`, `dist/` y archivos locales. |
| Bootstrap | Configurado | Instalado e importado globalmente en `frontend/src/main.jsx`. |
| SweetAlert2 | Instalado | Disponible para mensajes y confirmaciones en componentes concretos. |

Comandos usados en la fase inicial:

```bash
npm create vite@latest frontend
cd frontend
npm install
npm install bootstrap sweetalert2
npm run dev
```

## Pantallas

| Pantalla | Que muestra | Acciones | Estado |
| --- | --- | --- | --- |
| `HomeView` | Pantalla principal de la aplicacion. | Acceso inicial a las secciones principales. | Estructura inicial creada. |
| `BarajasView` | Gestion de barajas. | Listar, crear, editar y eliminar barajas mas adelante. | Estructura inicial creada. |
| `CartasView` | Gestion de cartas. | Listar, crear, editar y eliminar cartas mas adelante. | Estructura inicial creada. |
| `TarjetasView` | Gestion de tarjetas de teoria. | Consultar y crear tarjetas mas adelante. | Estructura inicial creada. |
| `JuegoView` | Vista principal del juego. | Seleccionar baraja y obtener carta aleatoria mas adelante. | Estructura inicial creada. |

Las pantallas se han creado dentro de `frontend/src/views/`.

En esta fase no se usa `react-router-dom`. La aplicacion cambia de vista mediante un estado en `App.jsx`, manteniendo una estructura sencilla y facil de defender.

## Componentes

| Componente | Uso | Datos que necesita |
| --- | --- | --- |
| `Navbar` | Permite cambiar entre las vistas principales. | `vistaActual` y `cambiarVista`. |
| `HomeView` | Pantalla de inicio. | No necesita datos externos en esta fase. |
| `BarajasView` | Pantalla de gestion de barajas. | Mas adelante consumira la API de barajas. |
| `CartasView` | Pantalla de gestion de cartas. | Mas adelante consumira la API de cartas. |
| `TarjetasView` | Pantalla de gestion de tarjetas. | Mas adelante consumira la API de tarjetas. |
| `JuegoView` | Pantalla del flujo de juego. | Mas adelante consumira la API de juego. |

Estructura inicial del frontend:

```text
frontend/src/
  components/
    Navbar.jsx
  views/
    HomeView.jsx
    BarajasView.jsx
    CartasView.jsx
    TarjetasView.jsx
    JuegoView.jsx
  App.jsx
  main.jsx
```

Se evita crear carpetas adicionales como `layout/`, `ui/` o `services/` hasta que sean necesarias. La prioridad en esta fase es mantener el proyecto simple, claro y mantenible.

## Formularios

| Campo | Tipo | Obligatorio | Notas |
| --- | --- | --- | --- |
| Pendiente | Pendiente | Pendiente | Pendiente |
| Pendiente | Pendiente | Pendiente | Pendiente |

## Estados de pantalla

- `home`: muestra `HomeView`.
- `barajas`: muestra `BarajasView`.
- `cartas`: muestra `CartasView`.
- `tarjetas`: muestra `TarjetasView`.
- `juego`: muestra `JuegoView`.

`App.jsx` mantiene el estado `vistaActual` con `useState`.

La funcion `setVistaActual` se pasa a `Navbar` como `cambiarVista`, para que los botones de navegacion puedan cambiar la vista activa.

`Navbar` tambien recibe `vistaActual` para marcar visualmente el boton de la seccion activa.

## Contenido de una tarjeta

```md
## Titulo

Pendiente.

## Explicacion

Pendiente.

## Idea clave

Pendiente.

## Ejemplo

Pendiente.
```

## Errores frecuentes

| Caso | Problema | Solucion |
| --- | --- | --- |
| `vistaActual` aparece subrayado | La variable se recibe en `Navbar`, pero no se usa. | Usarla para marcar el boton activo o no pasarla como prop. |
| No cambia la pantalla | El boton no llama a `cambiarVista` con el nombre correcto. | Revisar que coincidan valores como `barajas`, `cartas` o `juego`. |
| No carga una vista | El componente no esta importado o exportado correctamente. | Revisar `import`, nombre del archivo y `export default`. |

## Material para futuras tarjetas

| Titulo de tarjeta | Idea principal | Contenido clave |
| --- | --- | --- |
| Estructura inicial React | Separar componentes reutilizables y vistas principales. | `components/Navbar.jsx` y `views/*View.jsx`. |
| Navegacion por estado | Cambiar de pantalla sin instalar router. | `useState`, `vistaActual` y `setVistaActual`. |
| Navbar con Bootstrap | Crear una navegacion sencilla y responsive. | Clases `navbar`, `btn`, `d-flex`, `flex-wrap`. |

Plantilla para ampliar tarjetas:

```md
## Titulo

Pendiente.

## Cuando se usa

Pendiente.

## Explicacion

Pendiente.

## Ejemplo

Pendiente.

## Error habitual

Pendiente.
```

## Dudas o decisiones pendientes

- Conectar llamadas al backend con `fetch()`.
- Configurar SweetAlert2 en acciones concretas.

## Navegacion final

- [Inicio](#tarjetas-de-estudio-frontend)
- [Indice](#indice)
- [Objetivo](#objetivo)
- [Configuracion inicial](#configuracion-inicial)
- [Pantallas](#pantallas)
- [Componentes](#componentes)
- [Formularios](#formularios)
- [Estados de pantalla](#estados-de-pantalla)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
