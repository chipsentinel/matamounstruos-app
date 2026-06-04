# Tarjetas de estudio: base de datos

Este documento queda como espacio de trabajo para definir la parte de base de datos de las tarjetas de estudio.

La intención es preparar la estructura de datos que más adelante permitirá guardar contenido teórico dentro de la aplicación.

## Indice

- [Objetivo](#objetivo)
- [Conceptos principales](#conceptos-principales)
- [Entidad Tarjeta](#entidad-tarjeta)
- [Relaciones](#relaciones)
- [Reglas de datos](#reglas-de-datos)
- [Datos iniciales](#datos-iniciales)
- [Ejemplos](#ejemplos)
- [Errores frecuentes](#errores-frecuentes)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
- [Navegacion final](#navegacion-final)

## Objetivo

Definir la estructura mínima de datos necesaria para guardar tarjetas de estudio asociadas a una baraja.

Las tarjetas se usarán como contenido teórico o formativo cuando una carta tenga resultado `NO_APTO` o `PRUEBA_OTRA_VEZ`.

## Conceptos principales

| Concepto | Explicacion | Notas |
| --- | --- | --- |
| `Usuario` | Persona que usa la aplicación. | Puede tener varias barajas. |
| `Baraja` | Colección de cartas y tarjetas. | Pertenece a un usuario. |
| `Carta` | Elemento de una baraja que devuelve un resultado. | Su resultado puede activar una tarjeta de repaso. |
| `Tarjeta` | Contenido teórico asociado a una baraja. | Se muestra como material de apoyo o repaso. |

## Entidad Tarjeta

| Campo | Tipo | Clave | Descripcion |
| --- | --- | --- | --- |
| `idTarjeta` | Pendiente | PK | Identificador de la tarjeta. |
| `titulo` | Pendiente |  | Título visible de la tarjeta. |
| `contenido` | Pendiente |  | Contenido teórico o formativo. |
| `idBaraja` | Pendiente | FK | Baraja a la que pertenece la tarjeta. |

## Relaciones

| Entidad origen | Relacion | Entidad destino | Descripcion |
| --- | --- | --- | --- |
| `Usuario` | 1:N | `Baraja` | Un usuario puede tener varias barajas. |
| `Baraja` | 1:N | `Carta` | Una baraja puede tener varias cartas. |
| `Baraja` | 1:N | `Tarjeta` | Una baraja puede tener varias tarjetas de estudio. |

## Reglas de datos

- Una tarjeta debe pertenecer a una baraja.
- Una tarjeta debe tener un título.
- Una tarjeta debe tener contenido.
- No debe existir una tarjeta sin `idBaraja`.
- Las cartas con resultado `NO_APTO` o `PRUEBA_OTRA_VEZ` podrán mostrar una tarjeta asociada a la misma baraja.
- En la primera versión, cada baraja tendrá como máximo 12 cartas. Esta regla afecta a `Carta`, pero ayuda a organizar el flujo de tarjetas.

## Datos iniciales

| Titulo | Contenido | Baraja | Observaciones |
| --- | --- | --- | --- |
| Pendiente | Pendiente | Primera baraja | Contenido de repaso para cartas `NO_APTO`. |
| Pendiente | Pendiente | Primera baraja | Contenido de refuerzo para cartas `PRUEBA_OTRA_VEZ`. |

## Ejemplos

```sql
-- Estructura orientativa basada en el diseño inicial.
-- Los tipos exactos se podrán ajustar cuando se implemente la base de datos.

CREATE TABLE Tarjeta (
  idTarjeta INT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  contenido TEXT NOT NULL,
  idBaraja INT NOT NULL
);
```

## Errores frecuentes

| Caso | Problema | Solucion |
| --- | --- | --- |
| Tarjeta sin baraja | No se puede relacionar el contenido con una baraja. | Guardar siempre `idBaraja`. |
| Tarjeta sin contenido | El usuario no tendría material de repaso. | Validar que `contenido` no esté vacío. |
| Tarjeta sin título | Sería difícil identificarla en listados o formularios. | Validar que `titulo` no esté vacío. |
| Baraja inexistente | La tarjeta apuntaría a una baraja que no existe. | Comprobar la clave foránea `idBaraja`. |

## Material para futuras tarjetas

| Titulo de tarjeta | Idea principal | Contenido clave |
| --- | --- | --- |
| Entidad `Tarjeta` | Guarda contenido teórico de una baraja. | Campos `idTarjeta`, `titulo`, `contenido`, `idBaraja`. |
| Relación `Baraja` y `Tarjeta` | Una baraja puede tener varias tarjetas. | Relación 1:N. |
| Clave foránea `idBaraja` | Conecta una tarjeta con su baraja. | Evita tarjetas sueltas. |
| Contenido de repaso | Se usa cuando la carta no es apta o debe repetirse. | Resultados `NO_APTO` y `PRUEBA_OTRA_VEZ`. |

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

- Pendiente definir los tipos exactos de cada campo en MariaDB.
- Pendiente decidir si una tarjeta podrá asociarse a una carta concreta además de a una baraja.
- Pendiente decidir si se añadirá un campo de orden, categoría o nivel.
- Pendiente decidir qué pasará con las tarjetas si se elimina una baraja.

## Navegacion final

- [Inicio](#tarjetas-de-estudio-base-de-datos)
- [Indice](#indice)
- [Objetivo](#objetivo)
- [Entidad Tarjeta](#entidad-tarjeta)
- [Relaciones](#relaciones)
- [Reglas de datos](#reglas-de-datos)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
