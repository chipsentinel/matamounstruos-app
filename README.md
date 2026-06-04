# Matamounstruos App

Matamounstruos App es una aplicación web educativa basada en la gestión de barajas, cartas y tarjetas de teoría.

La propuesta del proyecto consiste en crear una aplicación sencilla donde el usuario pueda organizar contenido mediante barajas. Cada baraja tendrá sus propias cartas y tarjetas asociadas, permitiendo consultar y administrar la información de forma visual y ordenada.

El proyecto no busca ser un videojuego complejo, sino una aplicación web clara, funcional y fácil de mantener. La parte visual tendrá una temática más llamativa, pero la base del proyecto estará centrada en la gestión de datos y en una estructura sencilla de entender.

También se plantea como una herramienta para optimizar el tiempo durante la construcción del proyecto. La idea es que las propias cartas y tarjetas puedan servir para repasar partes importantes del código, recordar decisiones tomadas y consultar contenido útil mientras se desarrolla la aplicación.

De esta forma, el proyecto no solo sirve como entrega final, sino también como apoyo para estudiar y preparar la defensa. Incluso después de terminar la aplicación, las tarjetas podrán utilizarse para repasar conceptos, revisar cómo está organizado el código y facilitar la explicación de la autoría del trabajo realizado.

## Propuesta

La aplicación funcionará a partir de barajas.

Cada baraja podrá contener:

- Cartas.
- Tarjetas de teoría.

Las cartas representarán resultados, mensajes o elementos visuales relacionados con la baraja.

La primera baraja prevista tendrá un máximo de 12 cartas, tomando como referencia una baraja sencilla de 12 posiciones. Esta baraja podrá añadirse más adelante como datos iniciales en `seed.sql`.

Ejemplo de primera baraja:

- 1 AUTORIA APROBADA (APTO)
- 2, 3 y 4 NO (APTO)
- 5, 6, 7, 8, 9 (APTO)
- 10 ESTUDIANTE EJEMPLAR (APTO)
- 11 REINA VANESA (PRUEBA OTRA VEZ)
- 12 REY SANTI (PRUEBA OTRA VEZ)

Cuando salga una carta con resultado `APTO`, la aplicación mostrará un mensaje de aprobado y podrá preguntar si se quiere probar otra vez.

Cuando salga una carta con resultado `NO_APTO` o `PRUEBA OTRA VEZ`, la aplicación mostrará una tarjeta formativa para repasar contenido relacionado con la baraja.

Las tarjetas de teoría servirán para guardar contenido explicativo o de apoyo. Cada tarjeta pertenecerá a una baraja concreta.

## Entidades principales

El proyecto se basa en cuatro entidades:

- `Usuario`
- `Baraja`
- `Carta`
- `Tarjeta`

Un usuario podrá tener varias barajas. Cada baraja podrá tener varias cartas y varias tarjetas.

## Funcionalidades previstas

La aplicación permitirá gestionar el contenido principal del proyecto.

Funcionalidades principales:

- Crear, consultar, modificar y eliminar barajas.
- Crear, consultar, modificar y eliminar cartas.
- Consultar las tarjetas asociadas a una baraja.
- Limitar cada baraja a un máximo de 12 cartas.
- Mostrar un mensaje de aprobado cuando el resultado sea `APTO`.
- Mostrar una tarjeta formativa cuando el resultado sea `NO_APTO` o `PRUEBA OTRA VEZ`.
- Mantener la relación entre usuarios, barajas, cartas y tarjetas.

## Tecnologías

Este apartado se completará cuando se cierre la elección definitiva de tecnologías.

Tecnologías previstas:

- Backend:
- Frontend:
- Base de datos:
- Control de versiones:
- Contenedores:
- Testing:

## Documentación

Enlaces a la documentación del proyecto:

- Diseño de base de datos: [docs/database-design.md](docs/database-design.md)
- Documentación de API:
- Modelo Entidad/Relación:
- Modelo relacional:

## Objetivo del proyecto

El objetivo final es desarrollar una aplicación web sencilla donde se puedan gestionar barajas educativas, cartas y tarjetas de teoría.

La prioridad es que el proyecto sea claro, coherente y defendible. Por eso se evitarán funcionalidades innecesarias y se mantendrá una estructura simple, centrada en las entidades principales y sus relaciones.
