# Tarjetas de estudio: flujo funcional

Este documento describe el flujo funcional de las tarjetas de estudio dentro de la aplicación.

Las tarjetas sirven como material de apoyo cuando el usuario necesita repasar contenido teórico relacionado con una baraja.

## Objetivo del flujo

El objetivo es conectar las cartas, los resultados y las tarjetas de estudio.

Cuando el usuario obtiene un resultado que indica que debe repasar, la aplicación debe mostrar una tarjeta formativa útil.

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

## Selección de tarjeta

En la primera versión, la tarjeta se podrá seleccionar a partir de la baraja.

Regla inicial:

- Buscar una tarjeta perteneciente a la misma baraja que la carta.

Posibles reglas futuras:

- Mostrar una tarjeta concreta asociada a la carta.
- Mostrar la tarjeta con menor progreso del usuario.
- Mostrar una tarjeta aleatoria de la baraja.
- Mostrar una tarjeta según la categoría o dificultad.

## Flujo técnico básico

1. El frontend solicita una carta o recibe el resultado de una carta.
2. El backend devuelve el resultado.
3. Si el resultado requiere repaso, el frontend solicita tarjetas de la baraja.
4. El backend devuelve una o varias tarjetas.
5. El frontend muestra la tarjeta de repaso.

Endpoint útil:

- `GET /barajas/{idBaraja}/tarjetas`

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

## Preparación de contenido

Este documento también servirá para organizar el contenido educativo antes de llevarlo a la base de datos.

Plantilla de flujo para una tarjeta:

| Carta | Resultado | Tarjeta sugerida | Contenido pendiente |
| --- | --- | --- | --- |
| Pendiente | `NO_APTO` | Pendiente | Pendiente |
| Pendiente | `PRUEBA_OTRA_VEZ` | Pendiente | Pendiente |

Esta tabla se podrá completar progresivamente con el material real de la aplicación.
