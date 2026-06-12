# Desempeño del proyecto: Gitflow

Este documento recoge la metodologia de trabajo con Git y GitHub aplicada durante el desarrollo del proyecto.

El objetivo es trabajar de forma ordenada, dejando un historial claro de cambios y usando ramas para separar cada tarea. Esto permite revisar que el proyecto se ha desarrollado siguiendo un proceso controlado y trazable.

## Resumen de desempeño

- Se trabajo con ramas `feature` y `bugfix` segun el tipo de tarea.
- Se usaron commits para separar avances funcionales, pruebas y documentacion.
- Se crearon pull requests para revisar e integrar cambios.
- Se documentaron comandos de recuperacion, conflictos y rebase.
- Se mantuvo un flujo preparado para cierre de version y release.

## Indice

- [Objetivo](#objetivo)
- [Ramas principales](#ramas-principales)
- [Ramas de trabajo](#ramas-de-trabajo)
- [Configurar Git en un equipo](#configurar-git-en-un-equipo)
- [Clonar un repositorio](#clonar-un-repositorio)
- [Repositorio marcado como no seguro](#repositorio-marcado-como-no-seguro)
- [Flujo de trabajo basico](#flujo-de-trabajo-basico)
- [Crear una rama nueva](#crear-una-rama-nueva)
- [Revisar el estado del proyecto](#revisar-el-estado-del-proyecto)
- [Añadir cambios](#añadir-cambios)
- [Commits](#commits)
- [Subir cambios](#subir-cambios)
- [Pull requests](#pull-requests)
- [Actualizar una rama con develop](#actualizar-una-rama-con-develop)
- [Push rechazado por non-fast-forward](#push-rechazado-por-non-fast-forward)
- [Resolver conflictos](#resolver-conflictos)
- [Cancelar operaciones](#cancelar-operaciones)
- [Ver que se ha cambiado en un commit](#ver-que-se-ha-cambiado-en-un-commit)
- [Recuperar trabajo](#recuperar-trabajo)
- [Guardar cambios temporalmente](#guardar-cambios-temporalmente)
- [Corregir commits](#corregir-commits)
- [Revertir cambios](#revertir-cambios)
- [Volver al estado remoto de una rama](#volver-al-estado-remoto-de-una-rama)
- [Gitignore](#gitignore)
- [Etiquetas y versiones](#etiquetas-y-versiones)
- [Errores frecuentes](#errores-frecuentes)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Buenas practicas para aprobar el ciclo](#buenas-practicas-para-aprobar-el-ciclo)
- [Comandos de consulta rapida](#comandos-de-consulta-rapida)
- [Notas para la defensa](#notas-para-la-defensa)
- [Navegacion final](#navegacion-final)

## Objetivo

El uso de Gitflow en este proyecto sirve para:

- Separar el trabajo por ramas.
- Evitar cambios directos sobre ramas principales.
- Crear commits claros y relacionados con una tarea concreta.
- Subir los cambios a GitHub.
- Crear pull requests para revisar e integrar trabajo.
- Resolver conflictos cuando dos ramas modifican las mismas zonas.
- Mantener una trazabilidad del desarrollo.

## Ramas principales

| Rama | Uso | Notas |
| --- | --- | --- |
| `main` | Versión estable o final del proyecto. | Solo debería recibir cambios ya revisados. |
| `develop` | Rama principal de desarrollo. | Desde aquí se crean las ramas de trabajo. |

En una entrega sencilla también se podría trabajar solo con `main` y ramas `feature`, pero para el ciclo es más claro usar `develop` como rama de integración.

## Ramas de trabajo

Las ramas de trabajo se crean para desarrollar una funcionalidad, corregir un error o preparar documentación.

| Tipo de rama | Ejemplo | Cuándo se usa |
| --- | --- | --- |
| `feature/nombre` | `feature/database-design` | Para nuevas funcionalidades o documentación nueva. |
| `bugfix/nombre` | `bugfix/readme-conflict` | Para corregir errores detectados. |
| `docs/nombre` | `docs/study-cards` | Para cambios centrados solo en documentación. |
| `hotfix/nombre` | `hotfix/fix-release-error` | Para corregir algo urgente en una versión estable. |

Ejemplo usado en este proyecto:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/database-design
```

## Configurar Git en un equipo

Cuando se trabaja en un equipo nuevo, Git necesita saber con qué nombre y correo se van a firmar los commits.

Configurar el nombre de usuario:

```bash
git config --global user.name "chipsentinel"
```

Configurar el correo:

```bash
git config --global user.email "chipsentinel@gmail.com"
```

Comprobar la configuración global:

```bash
git config --global --list
```

Esta configuración es importante porque los commits quedan registrados con esos datos. Para el ciclo ayuda a demostrar quién ha realizado los cambios y mantiene la trazabilidad del trabajo.

También se puede consultar solo un valor:

```bash
git config --global user.name
git config --global user.email
```

Si se quiere configurar un nombre o correo solo para un repositorio concreto, se hace sin `--global` dentro de la carpeta del proyecto:

```bash
git config user.name "chipsentinel"
git config user.email "chipsentinel@gmail.com"
```

## Clonar un repositorio

Cuando se trabaja en otro equipo o se empieza desde cero, se puede descargar el proyecto desde GitHub con `git clone`.

Ejemplo:

```bash
git clone https://github.com/Key-Claw/repositorio.git
```

Después se entra en la carpeta del proyecto:

```bash
cd repositorio
```

Y se comprueba el estado:

```bash
git status
```

Si el repositorio tiene varias ramas, se pueden consultar:

```bash
git branch -a
```

Para cambiar a una rama concreta:

```bash
git checkout develop
```

O crear una rama de trabajo:

```bash
git checkout -b feature/nombre-de-la-tarea
```

## Repositorio marcado como no seguro

En algunos equipos, especialmente si el proyecto está en otra unidad, en una carpeta compartida o en Windows, Git puede mostrar un aviso de seguridad parecido a:

```text
fatal: detected dubious ownership in repository
```

Esto significa que Git no confía automáticamente en esa carpeta como repositorio seguro.

Solución:

```bash
git config --global --add safe.directory "F:/chipsentinel/fichero/nombre proyecto"
```

Después se puede comprobar:

```bash
git config --global --list
```

Ejemplo con una ruta sin espacios:

```bash
git config --global --add safe.directory F:/chipsentinel/proyecto
```

Ejemplo con una ruta con espacios:

```bash
git config --global --add safe.directory "F:/chipsentinel/fichero/nombre proyecto"
```

Este comando debe usarse solo con carpetas conocidas y propias, porque se está indicando a Git que confíe en ese directorio.

## Flujo de trabajo básico

Antes de empezar una tarea:

```bash
git status
git checkout develop
git pull origin develop
git checkout -b feature/nombre-de-la-tarea
```

Durante el trabajo:

```bash
git status
git add archivo1.md archivo2.md
git commit -m "docs: añadir documentación de tarjetas de estudio"
```

Subir la rama a GitHub:

```bash
git push origin feature/nombre-de-la-tarea
```

Después se crea una pull request desde GitHub para integrar la rama en `develop`.

## Crear una rama nueva

Crear una rama desde la rama actual:

```bash
git checkout -b feature/nueva-funcionalidad
```

Crear una rama asegurándose primero de estar en `develop` actualizado:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/nueva-funcionalidad
```

Ver ramas locales:

```bash
git branch
```

Ver ramas locales y remotas:

```bash
git branch -a
```

Cambiar a otra rama:

```bash
git checkout nombre-de-la-rama
```

## Revisar el estado del proyecto

Ver archivos modificados:

```bash
git status
```

Ver cambios concretos antes de hacer commit:

```bash
git diff
```

Ver cambios ya añadidos al commit:

```bash
git diff --staged
```

Ver historial de commits:

```bash
git log --oneline
```

Ver historial con ramas:

```bash
git log --oneline --graph --decorate --all
```

## Añadir cambios

Añadir un archivo concreto:

```bash
git add README.md
```

Añadir varios archivos:

```bash
git add README.md docs/database-design.md docs/proyecto/ docs/tematica/
```

Añadir todos los cambios:

```bash
git add .
```

Es recomendable revisar con `git status` antes de hacer `git add .`, para evitar subir archivos que no pertenecen a la tarea.

## Commits

Un commit debe representar una unidad de trabajo clara.

Formato recomendado:

```bash
git commit -m "tipo: descripción breve"
```

Tipos habituales:

| Tipo | Uso | Ejemplo |
| --- | --- | --- |
| `docs` | Cambios de documentación. | `docs: añadir documentación de tarjetas de estudio` |
| `feat` | Nueva funcionalidad. | `feat: crear endpoint de tarjetas` |
| `fix` | Corrección de error. | `fix: corregir validación de cartas` |
| `refactor` | Reorganización sin cambiar comportamiento. | `refactor: simplificar servicio de barajas` |
| `test` | Pruebas. | `test: añadir pruebas de tarjetas` |
| `chore` | Configuración o tareas internas. | `chore: actualizar docker compose` |

Ejemplos útiles para este proyecto:

```bash
git commit -m "docs: añadir diseño inicial de base de datos"
git commit -m "docs: añadir documentación de tarjetas de estudio"
git commit -m "feat: crear modelo de tarjeta"
git commit -m "fix: corregir resultado prueba otra vez"
```

## Subir cambios

Subir una rama nueva:

```bash
git push origin feature/nombre-de-la-tarea
```

Subir una rama que ya existe en remoto:

```bash
git push
```

Si Git no sabe a qué rama remota subir:

```bash
git push -u origin feature/nombre-de-la-tarea
```

## Pull requests

Una pull request sirve para integrar una rama de trabajo en otra rama principal, normalmente `develop`.

Contenido recomendado de una pull request:

- Qué se ha cambiado.
- Por qué se ha cambiado.
- Qué archivos principales se han tocado.
- Cómo se ha comprobado.
- Si queda algo pendiente.

Ejemplo:

```md
## Resumen

- Añadida documentación de tarjetas de estudio.
- Añadido flujo funcional de cartas y tarjetas.
- Actualizado README con enlaces a la documentación.

## Comprobación

- Revisada la documentación en Markdown.
- Comprobado el estado con git status.
```

## Actualizar una rama con develop

Mientras se trabaja, puede que `develop` avance. Para actualizar la rama de trabajo:

```bash
git checkout develop
git pull origin develop
git checkout feature/nombre-de-la-tarea
git rebase develop
```

Si se prefiere hacer merge:

```bash
git checkout feature/nombre-de-la-tarea
git merge develop
```

Para este proyecto es recomendable usar `rebase` en ramas propias antes de abrir o actualizar una pull request, porque deja el historial más limpio.

## Push rechazado por non-fast-forward

Este error aparece cuando GitHub tiene commits que la rama local no tiene.

Mensaje típico:

```text
! [rejected] feature/nombre -> feature/nombre (non-fast-forward)
```

Solución recomendada:

```bash
git pull --rebase origin feature/nombre-de-la-rama
git push origin feature/nombre-de-la-rama
```

Si aparecen conflictos durante el rebase, se resuelven los archivos afectados y después:

```bash
git add archivo-resuelto
git rebase --continue
```

Si el rebase se complica y se quiere volver al estado anterior:

```bash
git rebase --abort
```

## Resolver conflictos

Un conflicto ocurre cuando Git no puede combinar automáticamente dos cambios.

Los archivos en conflicto muestran marcas como estas:

```text
<<<<<<< HEAD
Contenido de una versión
=======
Contenido de otra versión
>>>>>>> nombre-del-commit
```

Pasos para resolverlo:

1. Abrir el archivo en conflicto.
2. Elegir qué contenido se queda.
3. Borrar las marcas `<<<<<<<`, `=======` y `>>>>>>>`.
4. Guardar el archivo.
5. Marcar el conflicto como resuelto.
6. Continuar el proceso.

Comandos:

```bash
git status
git add archivo-resuelto
git rebase --continue
```

Si el conflicto apareció durante un merge:

```bash
git status
git add archivo-resuelto
git commit
```

## Cancelar operaciones

Cancelar un rebase:

```bash
git rebase --abort
```

Cancelar un merge:

```bash
git merge --abort
```

Quitar un archivo del área de staging sin borrar cambios:

```bash
git restore --staged archivo.md
```

Descartar cambios de un archivo concreto:

```bash
git restore archivo.md
```

Este último comando debe usarse con cuidado, porque elimina cambios locales no guardados en commit.

## Ver qué se ha cambiado en un commit

Ver un commit concreto:

```bash
git show id-del-commit
```

Ver solo los archivos modificados en un commit:

```bash
git show --name-only id-del-commit
```

Ver diferencias entre dos ramas:

```bash
git diff develop..feature/nombre-de-la-tarea
```

Ver commits que tiene una rama y no otra:

```bash
git log develop..feature/nombre-de-la-tarea --oneline
```

## Recuperar trabajo

Ver movimientos recientes de Git:

```bash
git reflog
```

Volver a un commit anterior creando una nueva rama:

```bash
git checkout -b recuperacion id-del-commit
```

Esto es útil si se ha perdido una referencia o si se quiere recuperar un estado anterior sin tocar la rama principal.

## Guardar cambios temporalmente

`git stash` sirve para guardar cambios sin hacer commit. Es útil cuando se necesita cambiar de rama pero todavía no se quiere confirmar el trabajo actual.

Guardar cambios:

```bash
git stash
```

Guardar cambios con una descripción:

```bash
git stash push -m "trabajo pendiente en tarjetas"
```

Ver cambios guardados:

```bash
git stash list
```

Recuperar el último stash:

```bash
git stash pop
```

Recuperar un stash concreto:

```bash
git stash apply stash@{0}
```

Borrar un stash concreto:

```bash
git stash drop stash@{0}
```

Caso típico:

```bash
git status
git stash push -m "cambios antes de actualizar develop"
git checkout develop
git pull origin develop
git checkout feature/nombre-de-la-rama
git stash pop
```

## Corregir commits

Si se quiere corregir el último commit porque faltaba un archivo o el mensaje no era correcto:

```bash
git add archivo-olvidado.md
git commit --amend
```

Cambiar solo el mensaje del último commit:

```bash
git commit --amend -m "docs: mejorar guia de gitflow"
```

Esto debe usarse con cuidado si el commit ya se ha subido a GitHub, porque cambia el identificador del commit.

Si el commit ya está en una rama compartida, suele ser mejor crear un commit nuevo con la corrección.

## Revertir cambios

`git revert` crea un commit nuevo que deshace un commit anterior. Es la opción más segura cuando los cambios ya están subidos a GitHub.

Revertir un commit:

```bash
git revert id-del-commit
```

Ver el historial para elegir el commit:

```bash
git log --oneline
```

Diferencia importante:

- `git revert` deshace cambios creando un commit nuevo.
- `git reset` mueve la rama a otro punto del historial.

Para un proyecto de clase o una rama compartida, `git revert` suele ser más fácil de justificar y más seguro.

## Volver al estado remoto de una rama

Este caso aparece cuando se han creado cambios locales por error y se quiere dejar la rama exactamente igual que está en GitHub.

Ejemplo del proyecto:

- Se estaba trabajando en `feature/frontend-react`.
- Se crearon archivos o carpetas locales para probar una estructura de frontend.
- No se queria conservar ese trabajo.
- El objetivo era volver al estado remoto de `origin/feature/frontend-react`.

Primero se revisa el estado:

```bash
git status --short
```

Despues se comprueba la rama actual:

```bash
git branch --show-current
```

Si no se esta en la rama correcta:

```bash
git switch feature/frontend-react
```

Actualizar la informacion del remoto:

```bash
git fetch origin
```

Dejar la rama local igual que la rama remota:

```bash
git reset --hard origin/feature/frontend-react
```

Si ademas hay archivos o carpetas nuevas sin seguimiento, se puede comprobar antes que borraria Git:

```bash
git clean -fdn
```

Si el resultado es correcto, se eliminan:

```bash
git clean -fd
```

Diferencia importante:

- `git pull origin feature/frontend-react --force` no sirve para limpiar todos los cambios locales.
- `git reset --hard origin/feature/frontend-react` vuelve al ultimo estado conocido de la rama remota.
- `git clean -fd` elimina archivos nuevos que Git todavia no seguia.

Este flujo debe usarse solo cuando se tiene claro que los cambios locales no se quieren conservar.

## Gitignore

El archivo `.gitignore` sirve para evitar subir archivos que no deben formar parte del repositorio.

Ejemplos de archivos que normalmente no se suben:

- Dependencias instaladas.
- Archivos temporales.
- Ficheros de configuración local.
- Credenciales.
- Archivos generados automáticamente.

En proyectos Node.js conviene crear o revisar `.gitignore` antes de instalar dependencias con `npm install`.

Ejemplo mínimo:

```gitignore
node_modules/
.env
```

`node_modules/` debe existir solo en local. Las dependencias se reconstruyen a partir de `package.json` y `package-lock.json`.

Comprobar si un archivo está ignorado:

```bash
git check-ignore -v archivo
```

Si un archivo ya fue subido y después se añade al `.gitignore`, hay que sacarlo del seguimiento de Git sin borrarlo del disco:

```bash
git rm --cached archivo
git commit -m "chore: dejar de seguir archivo local"
```

## Etiquetas y versiones

Las etiquetas sirven para marcar versiones importantes del proyecto, por ejemplo una entrega o una versión final.

Crear una etiqueta:

```bash
git tag v1.0.0
```

Crear una etiqueta con mensaje:

```bash
git tag -a v1.0.0 -m "Entrega final del proyecto"
```

Subir una etiqueta:

```bash
git push origin v1.0.0
```

Ver etiquetas:

```bash
git tag
```

Esto puede ser útil para marcar una entrega del ciclo o una versión preparada para defensa.

## Errores frecuentes

### Estoy en la rama equivocada

Comprobar rama actual:

```bash
git status
```

Si no hay cambios pendientes:

```bash
git checkout rama-correcta
```

Si hay cambios pendientes y no se quieren perder:

```bash
git stash push -m "cambios antes de cambiar de rama"
git checkout rama-correcta
git stash pop
```

### He hecho commit en la rama equivocada

Crear una rama nueva desde el commit actual:

```bash
git checkout -b feature/rama-correcta
```

Después se puede volver a la rama anterior y dejarla como estaba si todavía no se ha subido el cambio.

### No puedo hacer pull porque tengo cambios locales

Guardar los cambios temporalmente:

```bash
git stash push -m "cambios antes de pull"
git pull origin nombre-rama
git stash pop
```

### No puedo cambiar de rama porque hay cambios pendientes

Opciones:

```bash
git status
git add archivo
git commit -m "docs: guardar avance"
```

O guardar temporalmente:

```bash
git stash
git checkout otra-rama
```

### El push falla porque la rama remota tiene cambios

Solución habitual:

```bash
git pull --rebase origin nombre-rama
git push origin nombre-rama
```

### El push falla porque se subio node_modules

Este error puede aparecer si se instala Node antes de tener `.gitignore` preparado y `node_modules/` entra en commits locales.

Sintomas:

- El push falla con errores de red, RPC o desconexion inesperada.
- La pull request no muestra todos los commits esperados.
- `git diff --stat` muestra muchos archivos dentro de `node_modules/`.

Comprobar si Git esta siguiendo `node_modules/`:

```bash
git ls-files backend/node_modules
```

Si aparecen muchos archivos, `node_modules/` entro en Git.

Solucion aplicada en este proyecto:

1. Crear una rama de copia de seguridad.
2. Reescribir los commits locales no subidos para eliminar `backend/node_modules` de la historia.
3. Comprobar que ya no queda trackeado.
4. Volver a hacer push.

Comprobacion final:

```bash
git ls-files backend/node_modules
```

El resultado esperado es que no devuelva archivos.

Aprendizaje:

Antes de ejecutar `npm install`, revisar que `.gitignore` contiene:

```gitignore
node_modules/
.env
```

### Hay conflictos despues de un rebase

Flujo habitual:

```bash
git status
git add archivo-resuelto
git rebase --continue
```

Cancelar si no se quiere seguir:

```bash
git rebase --abort
```

### Quiero ver que archivo ha cambiado

```bash
git status
git diff
```

### Quiero saber que he subido a GitHub

```bash
git log --oneline origin/develop..HEAD
```

Si se está trabajando contra otra rama:

```bash
git log --oneline origin/feature/nombre-de-la-rama..HEAD
```

## Material para futuras tarjetas

Este apartado sirve para convertir la guia en tarjetas de estudio dentro de la aplicacion.

| Titulo de tarjeta | Idea principal | Comando clave |
| --- | --- | --- |
| Crear una rama | Separar una tarea nueva del resto del proyecto. | `git checkout -b feature/nombre` |
| Revisar estado | Saber si hay cambios pendientes antes de actuar. | `git status` |
| Preparar un commit | Añadir solo los archivos relacionados con la tarea. | `git add archivo` |
| Crear un commit | Guardar una unidad de trabajo con mensaje claro. | `git commit -m "tipo: mensaje"` |
| Subir una rama | Enviar el trabajo a GitHub. | `git push origin rama` |
| Actualizar con rebase | Poner los commits propios encima de los cambios remotos. | `git pull --rebase origin rama` |
| Resolver conflictos | Elegir el contenido correcto y continuar el proceso. | `git rebase --continue` |
| Cancelar rebase | Volver al estado anterior si el proceso se complica. | `git rebase --abort` |
| Guardar cambios temporales | Apartar cambios sin hacer commit. | `git stash` |
| Recuperar trabajo | Consultar movimientos anteriores de Git. | `git reflog` |
| Revertir un commit | Deshacer cambios sin romper el historial compartido. | `git revert id` |
| Volver al remoto | Descartar cambios locales y dejar la rama como en GitHub. | `git reset --hard origin/rama` |
| Marcar una entrega | Crear una referencia de version o entrega. | `git tag v1.0.0` |
| Configurar identidad | Indicar nombre y correo para los commits. | `git config --global user.name` |
| Clonar repositorio | Descargar el proyecto en otro equipo. | `git clone url` |
| Marcar carpeta segura | Permitir trabajar en un repositorio con aviso de seguridad. | `git config --global --add safe.directory ruta` |

Plantilla para ampliar tarjetas:

```md
## Titulo

Pendiente.

## Cuando se usa

Pendiente.

## Comando principal

Pendiente.

## Ejemplo

Pendiente.

## Error habitual

Pendiente.
```

## Buenas prácticas para aprobar el ciclo

Para demostrar un trabajo ordenado, es importante cuidar tanto el código como el proceso.

Buenas prácticas:

- No trabajar directamente sobre `main`.
- Usar ramas con nombres claros.
- Hacer commits pequeños y explicativos.
- Escribir mensajes de commit coherentes.
- Subir las ramas a GitHub.
- Crear pull requests para integrar cambios.
- Resolver conflictos sin borrar trabajo de otras ramas.
- Mantener actualizado el README.
- Documentar decisiones importantes en `docs/`.
- Comprobar `git status` antes de cambiar de tarea.
- Revisar los cambios con `git diff` antes de hacer commit.
- No subir archivos temporales, contraseñas ni credenciales.

## Flujo recomendado para una tarea completa

Ejemplo completo desde el inicio hasta la pull request:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/tarjetas-estudio
git status
git add README.md docs/proyecto/ docs/tematica/
git commit -m "docs: organiza documentacion de estudio"
git push -u origin feature/tarjetas-estudio
```

Después:

1. Abrir GitHub.
2. Crear pull request hacia `develop`.
3. Revisar los cambios.
4. Corregir comentarios si aparecen.
5. Esperar aprobación o revisar comprobaciones.
6. Hacer merge cuando esté listo.

## Flujo recomendado si GitHub va por delante

Este caso ocurre cuando el push falla porque la rama remota tiene cambios nuevos.

```bash
git status
git pull --rebase origin feature/nombre-de-la-rama
git status
git push origin feature/nombre-de-la-rama
```

Si hay conflictos:

```bash
git status
git add archivo-resuelto
git rebase --continue
git push origin feature/nombre-de-la-rama
```

## Flujo recomendado antes de entregar

Antes de considerar una tarea terminada:

```bash
git status
git log --oneline --graph --decorate --all
git diff develop..feature/nombre-de-la-tarea
```

Comprobar:

- No quedan archivos modificados sin commit.
- La rama está subida a GitHub.
- La pull request está creada.
- El README enlaza la documentación importante.
- Los documentos explican las decisiones principales.
- Los nombres de ramas y commits son entendibles.

## Comandos de consulta rápida

| Acción | Comando |
| --- | --- |
| Ver estado | `git status` |
| Crear rama | `git checkout -b feature/nombre` |
| Cambiar rama | `git checkout nombre-rama` |
| Actualizar rama | `git pull origin nombre-rama` |
| Añadir archivo | `git add archivo` |
| Crear commit | `git commit -m "tipo: mensaje"` |
| Subir rama | `git push origin nombre-rama` |
| Ver historial | `git log --oneline --graph --decorate --all` |
| Continuar rebase | `git rebase --continue` |
| Cancelar rebase | `git rebase --abort` |
| Cancelar merge | `git merge --abort` |
| Quitar de staging | `git restore --staged archivo` |
| Ver cambios | `git diff` |
| Guardar cambios temporales | `git stash` |
| Recuperar stash | `git stash pop` |
| Revertir commit | `git revert id-del-commit` |
| Ver reflog | `git reflog` |
| Crear etiqueta | `git tag v1.0.0` |
| Configurar usuario | `git config --global user.name "nombre"` |
| Configurar correo | `git config --global user.email "correo"` |
| Ver configuración | `git config --global --list` |
| Clonar repositorio | `git clone url-del-repositorio` |
| Añadir directorio seguro | `git config --global --add safe.directory "ruta"` |

## Notas para la defensa

En la defensa del proyecto se puede explicar que Git se ha usado para:

- Controlar versiones del proyecto.
- Separar tareas mediante ramas.
- Mantener una rama de desarrollo.
- Revisar cambios antes de integrarlos.
- Documentar el avance mediante commits.
- Resolver conflictos de forma controlada.
- Subir el trabajo a GitHub para dejar constancia del proceso.

Una explicación sencilla sería:

```text
He trabajado con ramas para separar cada parte del desarrollo. Antes de empezar una tarea actualizo develop, creo una rama feature, hago commits pequeños con mensajes claros y subo la rama a GitHub. Después integro los cambios mediante pull request. Si GitHub tiene cambios nuevos, actualizo mi rama con rebase y resuelvo los conflictos antes de volver a subir.
```

## Navegacion final

Enlaces rapidos para moverse por este documento:

- [Inicio](#tarjetas-de-estudio-gitflow)
- [Indice](#indice)
- [Objetivo](#objetivo)
- [Ramas principales](#ramas-principales)
- [Ramas de trabajo](#ramas-de-trabajo)
- [Configurar Git en un equipo](#configurar-git-en-un-equipo)
- [Clonar un repositorio](#clonar-un-repositorio)
- [Repositorio marcado como no seguro](#repositorio-marcado-como-no-seguro)
- [Flujo de trabajo basico](#flujo-de-trabajo-basico)
- [Pull requests](#pull-requests)
- [Resolver conflictos](#resolver-conflictos)
- [Errores frecuentes](#errores-frecuentes)
- [Material para futuras tarjetas](#material-para-futuras-tarjetas)
- [Buenas practicas para aprobar el ciclo](#buenas-practicas-para-aprobar-el-ciclo)
- [Comandos de consulta rapida](#comandos-de-consulta-rapida)
- [Notas para la defensa](#notas-para-la-defensa)
