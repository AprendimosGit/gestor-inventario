# PizzaFlow - Backend (Django REST Framework)

API REST del sistema PizzaFlow, desarrollada con Django y Django REST Framework. Usa PostgreSQL como base de datos relacional.

## Requisitos previos

- Python 3.13 o superior
- PostgreSQL instalado y corriendo (puerto 5432). Se puede administrar con pgAdmin.
- Git

## Instalación paso a paso

Todos los comandos se ejecutan desde la carpeta `backend/` del repositorio.

1. Clonar el repositorio y ubicarse en la carpeta del backend:

   ```
   git clone https://github.com/AprendimosGit/gestor-inventario.git
   cd gestor-inventario/backend
   ```

2. Crear el entorno virtual (el entorno no se sube al repositorio, cada integrante crea el suyo):

   ```
   python -m venv venv
   ```

3. Activar el entorno virtual:

   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

   Cuando está activo, la terminal muestra `(venv)` al principio de la línea. Hay que activarlo cada vez que se abre una terminal nueva.

4. Instalar las dependencias:

   ```
   pip install -r requirements.txt
   ```

5. Crear la base de datos en PostgreSQL con el nombre `pizzaflow` (desde pgAdmin: clic derecho en Databases, Create, Database; o desde psql: `CREATE DATABASE pizzaflow;`).

6. Revisar la conexión en `config/settings.py`, en la variable `DATABASES`. Por defecto usa:

   - Base: `pizzaflow`
   - Usuario: `postgres`
   - Contraseña: la que cada integrante haya definido al instalar PostgreSQL (modificarla en el archivo si es distinta)
   - Host: `localhost`, puerto `5432`

7. Crear las tablas (migraciones):

   ```
   python manage.py migrate
   ```

8. Cargar los datos iniciales (productos, ingredientes y recetas):

   ```
   python manage.py loaddata datos_iniciales
   ```

9. Levantar el servidor:

   ```
   python manage.py runserver
   ```

   La API queda disponible en http://127.0.0.1:8000/

## Estructura del backend

El proyecto está organizado en aplicaciones de Django que reflejan los componentes del diagrama UML:

| Carpeta | Descripción |
|---|---|
| `config/` | Configuración general del proyecto (settings, rutas principales) |
| `productos/` | Productos, ingredientes y recetas (producto-ingrediente) |

Cada aplicación contiene sus modelos con validaciones (`models.py`), sus serializers (`serializers.py`), sus vistas basadas en `APIView` (`views.py`) y sus rutas (`urls.py`).

## Endpoints disponibles

Todas las rutas parten del prefijo `/api/v1/`.

| Método | Ruta | Descripción | Códigos de estado |
|---|---|---|---|
| GET | `/api/v1/productos/` | Lista todos los productos | 200 |
| POST | `/api/v1/productos/` | Crea un producto | 201, 400 |
| GET | `/api/v1/ingredientes/` | Lista todos los ingredientes | 200 |
| POST | `/api/v1/ingredientes/` | Crea un ingrediente | 201, 400 |

Ejemplo de cuerpo para crear un producto (POST):

```json
{
    "nombre": "Pizza cuatro quesos",
    "precio": "28000.00"
}
```

## Validaciones en los modelos

- Producto: el nombre es único y tiene un máximo de 100 caracteres; el precio debe ser mayor a cero.
- Ingrediente: el nombre es único; la unidad de medida solo admite `kg`, `g`, `l`, `ml` o `unidad`; el stock actual y el stock mínimo no pueden ser negativos.
- Receta (producto-ingrediente): la cantidad necesaria debe ser mayor a cero y un producto no puede repetir el mismo ingrediente.

## Conexión con el frontend (CORS)

El backend permite peticiones desde la aplicación Angular que corre en `http://localhost:4200` (configurado con `django-cors-headers` en `config/settings.py`). Para ejecutar el sistema completo hay que tener levantados al mismo tiempo el backend (puerto 8000) y el frontend (`ng serve`, puerto 4200).

## Cómo probar la API

Con el servidor levantado se puede probar desde el navegador entrando a una ruta, por ejemplo http://127.0.0.1:8000/api/v1/productos/ (Django REST Framework muestra un formulario para probar el POST), o con herramientas como Postman.

## Dependencias

Las dependencias están fijadas en `requirements.txt`. Si se instala una nueva librería, actualizar el archivo con:

```
pip freeze > requirements.txt
```