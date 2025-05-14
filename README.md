# API Gestión de Tareas (TODO)

Este proyecto es una API REST básica construida con Node.js y Express para gestionar una lista de tareas (TODOs). Las tareas se almacenan temporalmente en memoria.

## Características

* Crear nuevas tareas.
* Obtener todas las tareas existentes.
* Actualizar una tarea existente.
* Eliminar una tarea existente.
* Validación de datos de entrada.
* Manejo básico de errores.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* [Node.js]
* [npm]

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1.  Clona este repositorio:
    ```bash
    git clone https://github.com/undrbug/challenge-ForIT-Back.git
    cd challenge-ForIT-Back
    ```

2.  Instala las dependencias del proyecto:
    ```bash
    npm install
    # o si usas yarn
    yarn install
    ```

3.  Crea un archivo `.env` en la raíz del proyecto. Este archivo se utiliza para variables de entorno. Por ahora, puedes definir el puerto de la siguiente manera:
    ```env
    PORT=3000
    ```
    *(Puedes cambiar `3000` por el puerto que prefieras. Si el archivo `.env` no existe o no especifica `PORT`, la aplicación usará el puerto 3000 por defecto según el código.)*

## Ejecución de la Aplicación

Una vez que hayas completado los pasos de instalación, puedes iniciar el servidor:

```bash
npm start
# o si usas yarn
yarn start
Verás un mensaje en la consola indicando que el servidor está corriendo, por ejemplo:

Server running on http://localhost:3000
La API estará disponible en http://localhost:PUERTO, donde PUERTO es el número especificado en tu archivo .env (o 3000 por defecto).

Endpoints de la API
La API expone los siguientes endpoints bajo el prefijo /api:

Obtener todas las tareas
URL: /api/tasks
Método: GET
Descripción: Devuelve un array con todas las tareas almacenadas.
Respuesta Exitosa (200 OK):
JSON

{
  "message": "Tareas obtenidas correctamente",
  "data": [
    {
      "id": "...",
      "title": "...",
      "description": "...",
      "completed": false,
      "createdAt": "..."
    }
    // ... más tareas
  ],
  "total": N
}
Crear una nueva tarea
URL: /api/tasks
Método: POST
Descripción: Crea una nueva tarea. Requiere un cuerpo de solicitud con title y description.
Cuerpo de la Solicitud:
JSON

{
  "title": "Título de la tarea",
  "description": "Descripción detallada de la tarea"
}
Validaciones:
title: Obligatorio, no puede estar vacío.
description: Obligatorio, no puede estar vacío.
Respuesta Exitosa (201 Created):
JSON

{
  "message": "Tarea creada correctamente",
  "data": {
    "id": "...", // ID generado automáticamente (timestamp)
    "title": "Título de la tarea",
    "description": "Descripción detallada de la tarea",
    "completed": false, // Por defecto es false
    "createdAt": "..." // Fecha de creación
  }
}
Respuesta de Error (400 Bad Request): Si la validación falla.
JSON

{
  "errors": [
    {
      "type": "field",
      "value": "...",
      "msg": "...", // Mensaje de error de validación
      "path": "...", // Campo con el error
      "location": "body"
    }
    // ... más errores si aplica
  ]
}
Actualizar una tarea
URL: /api/tasks/:id
Método: PUT
Descripción: Actualiza una tarea existente por su ID. Requiere un cuerpo de solicitud con title, description y completed.
Parámetros de URL:
:id: El ID de la tarea a actualizar.
Cuerpo de la Solicitud:
JSON

{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "completed": true // o false
}
Validaciones:
id: Obligatorio (en el parámetro de la URL).
title: Obligatorio, no puede estar vacío.
description: Obligatorio, no puede estar vacío.
completed: Obligatorio, debe ser un booleano.
Respuesta Exitosa (200 OK):
JSON

{
  "message": "Tarea actualizada correctamente",
  "data": {
    "id": "...",
    "title": "Nuevo título",
    "description": "Nueva descripción",
    "completed": true, // o false
    "createdAt": "..." // Fecha original de creación
  }
}
Respuesta de Error (400 Bad Request): Si la validación falla (similar al POST).
Respuesta de Error (404 Not Found): Si la tarea con el ID proporcionado no se encuentra.
JSON

{
  "message": "Tarea no encontrada"
}
Eliminar una tarea
URL: /api/tasks/:id
Método: DELETE
Descripción: Elimina una tarea existente por su ID.
Parámetros de URL:
:id: El ID de la tarea a eliminar.
Validaciones:
id: Obligatorio (en el parámetro de la URL).
Respuesta Exitosa (200 OK):
JSON

{
  "message": "Tarea eliminada correctamente"
}
Respuesta de Error (400 Bad Request): Si la validación del ID falla.
Respuesta de Error (404 Not Found): Si la tarea con el ID proporcionado no se encuentra.
JSON

{
  "message": "Tarea no encontrada"
}
Notas Importantes
Esta aplicación almacena las tareas en un array en memoria. Esto significa que todas las tareas se perderán cada vez que reinicies el servidor. Si necesitas persisitencia de datos, necesitas integrar un db como Mongodb, MySQL, etc...
