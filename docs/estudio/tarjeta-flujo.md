# Tarjetas de estudio: flujo funcional

Este documento describe el flujo funcional de las tarjetas de estudio dentro de la aplicación.

Las tarjetas sirven como material de apoyo cuando el usuario necesita repasar contenido teórico relacionado con una baraja.

## Indice

- [Objetivo del flujo](#objetivo-del-flujo)
- [Conceptos principales](#conceptos-principales)
- [Datos que intervienen](#datos-que-intervienen)
- [Flujo general](#flujo-general)
- [Resultados de carta](#resultados-de-carta)
- [Seleccion de tarjeta](#seleccion-de-tarjeta)
- [Flujo tecnico basico](#flujo-tecnico-basico)
- [Estados del flujo](#estados-del-flujo)
- [Caso sin tarjetas](#caso-sin-tarjetas)
- [Errores frecuentes](#errores-frecuentes)
- [Preparacion de contenido](#preparacion-de-contenido)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
- [Navegacion final](#navegacion-final)

## Objetivo del flujo

El objetivo es conectar las cartas, los resultados y las tarjetas de estudio.

Cuando el usuario obtiene un resultado que indica que debe repasar, la aplicación debe mostrar una tarjeta formativa útil.

## Conceptos principales

| Concepto | Explicacion | Notas |
| --- | --- | --- |
| `Carta` | Elemento de una baraja que devuelve un resultado. | Pertenece a una baraja. |
| `Baraja` | Agrupa cartas y tarjetas de temario. | En la primera versión tendrá como máximo 12 cartas. |
| `Tarjeta` | Contenido teórico o formativo asociado a una baraja. | Se muestra cuando el usuario necesita repasar. |
| `tipoResultado` | Campo que indica el resultado de una carta. | Puede ser `APTO`, `NO_APTO` o `PRUEBA_OTRA_VEZ`. |

## Datos que intervienen

Los datos mínimos que intervienen en este flujo son los definidos en el diseño inicial de base de datos.

| Entidad | Campo | Uso en el flujo |
| --- | --- | --- |
| `Baraja` | `idBaraja` | Permite localizar las cartas y tarjetas de una misma baraja. |
| `Baraja` | `nombre` | Sirve para identificar la baraja seleccionada por el usuario. |
| `Carta` | `idCarta` | Identifica la carta consultada o jugada. |
| `Carta` | `valor` | Indica la posición o número de la carta dentro de la baraja. |
| `Carta` | `tipoResultado` | Decide si se muestra mensaje positivo o tarjeta de repaso. |
| `Tarjeta` | `idTarjeta` | Identifica la tarjeta de estudio que se mostrará. |
| `Tarjeta` | `titulo` | Se muestra como encabezado del contenido de repaso. |
| `Tarjeta` | `contenido` | Contiene la explicación teórica que verá el usuario. |
| `Tarjeta` | `idBaraja` | Relaciona la tarjeta con la baraja seleccionada. |

En esta primera versión, la conexión entre carta y tarjeta se hará a través de la baraja.

Esto significa que una carta no necesita tener todavía una tarjeta concreta asignada. Si la carta requiere repaso, la aplicación buscará contenido dentro de las tarjetas de su misma baraja.

## Flujo general

1. El usuario entra en la aplicación.
2. El usuario selecciona una baraja.
3. El usuario consulta o juega una carta.
4. La carta devuelve un resultado.
5. La aplicación decide qué mostrar según el resultado.
6. Si el resultado es `APTO`, se muestra un mensaje positivo.
7. Si el resultado es `NO_APTO`, se muestra una tarjeta de estudio.
8. Si el resultado es `PRUEBA_OTRA_VEZ`, se muestra una tarjeta de estudio y una opción para repetir.

## Resultados de carta

Los resultados posibles son:

- `APTO`
- `NO_APTO`
- `PRUEBA_OTRA_VEZ`

### Resultado APTO

El usuario ha superado la carta.

La aplicación puede mostrar:

- Mensaje de acierto.
- Opción para continuar.
- Opción para volver a la baraja.

No es obligatorio mostrar una tarjeta de estudio.

### Resultado NO_APTO

El usuario no ha superado la carta.

La aplicación debe mostrar:

- Mensaje de repaso.
- Tarjeta de estudio asociada a la baraja.
- Opción para volver a intentarlo o seguir repasando.

### Resultado PRUEBA_OTRA_VEZ

El usuario debe repetir o reforzar el contenido.

La aplicación debe mostrar:

- Mensaje de intento pendiente.
- Tarjeta de estudio asociada a la baraja.
- Opción para repetir la carta.

## Seleccion de tarjeta

En la primera versión, la tarjeta se podrá seleccionar a partir de la baraja.

Regla inicial:

- Buscar una tarjeta perteneciente a la misma baraja que la carta.

Posibles reglas futuras:

- Mostrar una tarjeta concreta asociada a la carta.
- Mostrar la tarjeta con menor progreso del usuario.
- Mostrar una tarjeta aleatoria de la baraja.
- Mostrar una tarjeta según la categoría o dificultad.

## Flujo tecnico basico

1. El frontend solicita una carta aleatoria de una baraja.
2. El backend devuelve una carta con su resultado.
3. Si el resultado requiere repaso, el frontend solicita tarjetas de la baraja.
4. El backend devuelve una o varias tarjetas.
5. El frontend muestra la tarjeta de repaso.

Endpoint implementado:

- `GET /juego/cartas/aleatoria/:idBaraja`
- `GET /juego/tarjeta/aleatoria/:idCarta`

Datos necesarios para este endpoint:

- `idBaraja`: identifica la baraja seleccionada.
- `idCarta`: identifica la carta obtenida.
- `tipoResultado`: indica si se muestra mensaje positivo o contenido de repaso.

Si el resultado de la carta es `APTO`, no se devuelve tarjeta de estudio.
Si el resultado es `NO_APTO` o `PRUEBA_OTRA_VEZ`, se busca una tarjeta aleatoria de la misma baraja.

La opcion de volver a intentarlo se resuelve solicitando otra carta aleatoria con `GET /juego/cartas/aleatoria/:idBaraja`.

## Estados del flujo

Estados principales:

- Baraja seleccionada.
- Carta seleccionada.
- Resultado obtenido.
- Tarjeta de repaso cargada.
- Repaso completado.

Estados de error:

- No existe la baraja.
- No existe la carta.
- No hay tarjetas asociadas a la baraja.
- Error al cargar el contenido.

## Caso sin tarjetas

Si una baraja no tiene tarjetas de estudio, la aplicación debe mostrar un mensaje claro.

Ejemplo:

- No hay contenido de repaso disponible para esta baraja.

En ese caso, el usuario podrá:

- Volver a la baraja.
- Intentar otra carta.
- Continuar sin repaso.

## Errores frecuentes

| Caso | Problema | Solucion |
| --- | --- | --- |
| Carta sin baraja | No se puede saber qué tarjetas mostrar. | Mantener la relación entre `Carta` y `Baraja`. |
| Baraja sin tarjetas | No hay contenido de repaso disponible. | Mostrar un mensaje claro al usuario. |
| Resultado no reconocido | La aplicación no sabe qué vista mostrar. | Usar solo `APTO`, `NO_APTO` y `PRUEBA_OTRA_VEZ`. |
| Tarjeta no encontrada | El backend no devuelve contenido formativo. | Preparar un caso alternativo en frontend. |

## Preparacion de contenido

Este documento también servirá para organizar el contenido educativo antes de llevarlo a la base de datos.

Plantilla de flujo para una tarjeta:

| Carta | Resultado | Tarjeta sugerida | Contenido pendiente |
| --- | --- | --- | --- |
| Pendiente | `NO_APTO` | Pendiente | Pendiente |
| Pendiente | `PRUEBA_OTRA_VEZ` | Pendiente | Pendiente |

Esta tabla se podrá completar progresivamente con el material real de la aplicación.

## Material para futuras tarjetas

| Titulo de tarjeta | Idea principal | Contenido clave |
| --- | --- | --- |
| Resultado `APTO` | El usuario supera la carta. | Mostrar mensaje positivo, sin tarjeta obligatoria. |
| Resultado `NO_APTO` | El usuario necesita repasar. | Mostrar tarjeta formativa asociada a la baraja. |
| Resultado `PRUEBA_OTRA_VEZ` | El usuario debe reforzar el contenido. | Mostrar tarjeta y opción para repetir. |
| Baraja sin tarjetas | No hay material disponible. | Mostrar mensaje claro y permitir continuar. |
| Seleccion de tarjeta | Elegir contenido de repaso. | Usar la baraja como criterio inicial. |
| Datos de tarjeta | La tarjeta contiene el material formativo. | `titulo`, `contenido`, `idBaraja`. |
| Relación por baraja | La carta y la tarjeta se conectan por la misma baraja. | Usar `idBaraja` como criterio inicial. |

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

- Pendiente definir si una carta tendrá una tarjeta concreta asociada.
- Pendiente definir si la tarjeta se elegirá siempre por baraja o con una regla más específica.
- Pendiente definir el mensaje exacto que verá el usuario en cada resultado.

## Navegacion final

- [Inicio](#tarjetas-de-estudio-flujo-funcional)
- [Indice](#indice)
- [Objetivo del flujo](#objetivo-del-flujo)
- [Conceptos principales](#conceptos-principales)
- [Datos que intervienen](#datos-que-intervienen)
- [Flujo general](#flujo-general)
- [Resultados de carta](#resultados-de-carta)
- [Seleccion de tarjeta](#seleccion-de-tarjeta)
- [Caso sin tarjetas](#caso-sin-tarjetas)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Dudas o decisiones pendientes](#dudas-o-decisiones-pendientes)
