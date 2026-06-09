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

La fase inicial del frontend se centra en crear la carpeta `frontend/`, instalar la base del proyecto, conectar más adelante con el backend mediante `fetch()` y construir la interfaz primero para móvil y después para escritorio.

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
| Logotipo | Añadido | Se guarda en `frontend/src/assets/` para usarlo en la navegacion y pantalla principal. |

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
| `BarajaView` | Gestion conjunta de barajas y cartas. | Listar, crear, editar y eliminar contenido de baraja mas adelante. | Estructura inicial creada. |
| `TematicaView` | Gestion de tarjetas tematicas. | Consultar y crear tarjetas mas adelante. | Estructura inicial creada. |
| `CardUsuario` | Acceso previo para secciones administrativas. | Simular identificacion antes de entrar en `Baraja` o `Tematica`. | Estructura inicial creada. |
| `JuegoView` | Vista principal del juego. | Seleccionar baraja y obtener carta aleatoria mas adelante. | Estructura inicial creada. |

Las pantallas se han creado dentro de `frontend/src/views/`.

En esta fase no se usa `react-router-dom`. La aplicacion cambia de vista mediante un estado en `App.jsx`, manteniendo una estructura sencilla y facil de defender.

## Componentes

| Componente | Uso | Datos que necesita |
| --- | --- | --- |
| `Navbar` | Permite cambiar entre las vistas principales. | `vistaActual` y `cambiarVista`. |
| `CardUsuario` | Muestra el acceso de usuario antes de entrar en zonas administrativas. | `onAcceso`. |
| `HomeView` | Pantalla de inicio. | No necesita datos externos en esta fase. |
| `BarajaView` | Pantalla de gestion de barajas y cartas. | Mas adelante consumira las API de barajas y cartas. |
| `TematicaView` | Pantalla de gestion de tarjetas tematicas. | Mas adelante consumira la API de tarjetas. |
| `JuegoView` | Pantalla del flujo de juego. | Mas adelante consumira la API de juego. |

Estructura inicial del frontend:

```text
frontend/src/
  assets/
    logo-full.webp
    logo-icon.webp
  components/
    Navbar.jsx
    CardUsuario.jsx
  views/
    HomeView.jsx
    BarajaView.jsx
    TematicaView.jsx
    JuegoView.jsx
  App.jsx
  main.jsx
```

Se evita crear carpetas adicionales como `layout/`, `ui/` o `services/` hasta que sean necesarias. La prioridad en esta fase es mantener el proyecto simple, claro y mantenible.

La navegacion visible se simplifica a `Inicio`, `Baraja`, `Tematica` y `Juego`. El logo funciona como acceso a inicio.

`Baraja` agrupa la gestion de barajas y cartas para reducir secciones en la interfaz. `Tematica` representa las tarjetas de teoria con un nombre mas claro para el usuario.

## Formularios

| Campo | Tipo | Obligatorio | Notas |
| --- | --- | --- | --- |
| Pendiente | Pendiente | Pendiente | Pendiente |
| Pendiente | Pendiente | Pendiente | Pendiente |

## Estados de pantalla

- `home`: muestra `HomeView`.
- `usuario`: muestra `CardUsuario`.
- `baraja`: muestra `BarajaView`.
- `tematica`: muestra `TematicaView`.
- `juego`: muestra `JuegoView`.

`App.jsx` mantiene el estado `vistaActual` con `useState`.

La funcion `cambiarVista` se pasa a `Navbar` para controlar la navegacion desde un unico punto.

`Navbar` tambien recibe `vistaActual` para marcar visualmente el boton de la seccion activa.

Las secciones `baraja` y `tematica` requieren pasar antes por `CardUsuario` si todavia no hay un usuario activo. En esta fase el acceso se simula y queda preparado para conectarlo mas adelante con una peticion `POST`.

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
| No cambia la pantalla | El boton no llama a `cambiarVista` con el nombre correcto. | Revisar que coincidan valores como `baraja`, `tematica` o `juego`. |
| No carga una vista | El componente no esta importado o exportado correctamente. | Revisar `import`, nombre del archivo y `export default`. |
| No aparece `CardUsuario` | La `Navbar` llama directamente a `setVistaActual`. | Pasar la funcion `cambiarVista` para aplicar la comprobacion de usuario. |

## Material para futuras tarjetas

| Titulo de tarjeta | Idea principal | Contenido clave |
| --- | --- | --- |
| Estructura inicial React | Separar componentes reutilizables y vistas principales. | `components/Navbar.jsx` y `views/*View.jsx`. |
| Navegacion por estado | Cambiar de pantalla sin instalar router. | `useState`, `vistaActual` y `setVistaActual`. |
| Navbar con Bootstrap | Crear una navegacion sencilla y responsive. | Clases `navbar`, `btn`, `d-flex`, `flex-wrap`. |
| Acceso previo | Proteger secciones administrativas sin autenticacion real todavia. | `usuarioActivo`, `vistaPendiente` y `CardUsuario`. |

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
