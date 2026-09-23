# PizzaFlow - Sistema de control de stock para locales de comida

## Introducción

PizzaFlow es un sistema web de gestión de inventario diseñado para locales de comida como pizzerías y lomiterías. Permite a los empleados y administradores registrar ventas, controlar el stock de ingredientes y gestionar reposiciones de mercadería, con el objetivo de evitar la falta de insumos y mantener el inventario siempre actualizado.

## Funcionalidades del sistema

- Registro de ventas: el empleado selecciona el producto vendido y la cantidad; el sistema descuenta automáticamente los ingredientes del inventario.
- Reposición de stock: el administrador registra el ingreso de mercadería indicando ingrediente, cantidad y proveedor.
- Consulta de stock: visualización del estado actual de cada ingrediente.
- Historial de movimientos: registro de todas las operaciones realizadas (ventas y reposiciones).
- Alertas de stock bajo: notificación automática cuando un ingrediente cae por debajo del mínimo definido.

## Instalación y ejecución de la aplicación Angular (versión actual)

### Requisitos previos

- Tener Node.js instalado (https://nodejs.org/).
- Tener Angular CLI instalado globalmente: npm install -g @angular/cli

### Pasos

1. Clonar el repositorio y ubicarse en la rama develop.
2. Ir a la carpeta del proyecto Angular: cd frontend/gestor-inventario-frontend
3. Instalar las dependencias: npm install
4. Levantar dos servidores en paralelo (necesitás dos terminales abiertas al mismo tiempo, ambas paradas en frontend/gestor-inventario-frontend):

   Terminal 1 - aplicación Angular:
   ng serve
   La app queda disponible en http://localhost:4200

   Terminal 2 - servidor de datos simulado (json-server):
   npm run server
   La API simulada queda disponible en http://localhost:3001, con estos endpoints:
   /productos, /ingredientes, /proveedores, /roles, /usuarios, /ventas, /detalle_ventas, /producto_ingrediente, /movimientos_stock

5. Abrir el navegador en http://localhost:4200

Nota: la aplicación no funciona correctamente si solo se levanta ng serve sin el json-server, ya que los datos (productos, ingredientes, stock, etc.) se obtienen en tiempo real desde esa API simulada.

## Instalación y ejecución de la maqueta estática (versión inicial del proyecto)

Esta es la maqueta HTML/CSS original, previa a la migración a Angular. Se conserva como referencia histórica del proyecto.

1. Clonar o descargar el repositorio.
2. Abrir la carpeta maqueta.
3. Abrir el archivo index.html en cualquier navegador web.

## Asistencia de inteligencia artificial en el proyecto

Para la elaboración y revisión del presente proyecto se utilizó asistencia de inteligencia artificial (CLAUDE AI) como herramienta de apoyo para la maquetación, organización y revisión del contenido. El equipo revisó, validó y adaptó el material generado de acuerdo con los requerimientos generales del proyecto, las decisiones tomadas durante su desarrollo y las observaciones recibidas a lo largo del proceso de retroalimentación.

## Personas involucradas

- Alejo Moreno — [@MorenoAlej0](https://github.com/MorenoAlej0)
- Fernanda Llanos — [@fernandallanos13](https://github.com/fernandallanos13)
- Matias Romano — [@MatyRom](https://github.com/MatyRom)