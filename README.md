# Introducción

El presente proyecto consiste en el desarrollo de un sistema de gestión de stock orientado a un local gastronómico dedicado a la venta de pizzas y lomos. El objetivo principal del sistema es facilitar el control de inventario, el registro de ventas y la administración de productos, permitiendo automatizar procesos que normalmente se realizan de manera manual.

Actualmente, muchos pequeños comercios gestionan el stock utilizando planillas o registros escritos, lo que puede generar errores, pérdidas de información y dificultades para controlar las cantidades reales disponibles. Este sistema busca resolver esa problemática mediante una interfaz simple e intuitiva que permita actualizar automáticamente el inventario a partir de las ventas realizadas y de la reposición de mercadería.

Además, el sistema incorpora distintos roles de usuario (administrador y empleado), permitiendo controlar permisos y funcionalidades según el perfil de cada usuario.

---

# Funcionalidades del proyecto

El sistema cuenta con las siguientes funcionalidades principales:

- Inicio de sesión con control de roles y permisos.
- Registro de ventas de pizzas, lomos y otros productos.
- Descuento automático de ingredientes del stock al realizar una venta.
- Registro de ingreso/reposición de mercadería.
- Visualización de alertas de stock bajo.
- Consulta de productos e ingredientes disponibles.
- Gestión de productos e ingredientes del inventario.
- Historial de movimientos del sistema.
- Dashboard diferenciado para administradores y empleados.

---

# Lógicas de negocio y funcionamiento

El sistema fue diseñado para automatizar procesos básicos de control de inventario dentro de un local gastronómico. Su funcionamiento se basa en la interacción entre las ventas realizadas, el stock disponible y los distintos permisos de usuario.

## Control automático de stock

Cada producto vendido posee ingredientes asociados previamente cargados en el sistema. Por ejemplo, al registrar la venta de una pizza muzzarella, el sistema descuenta automáticamente ingredientes como harina, salsa, queso y cajas de pizza. De esta manera, el inventario se mantiene actualizado en tiempo real sin necesidad de modificar manualmente cada ingrediente.

## Registro de ingreso de mercadería

Los usuarios con permisos de administrador pueden registrar ingresos de stock al sistema. Esto permite actualizar las cantidades disponibles de ingredientes o productos cuando se realiza una compra o reposición de mercadería.

Cada ingreso queda registrado en un historial con:

- fecha
- hora
- usuario responsable
- producto ingresado
- cantidad y unidad de medida

---

# Roles y permisos

El sistema diferencia distintos tipos de usuarios:

## Administrador principal

Posee acceso completo al sistema:

- gestión de productos
- actualización de precios
- carga de stock
- visualización de reportes
- administración de usuarios y permisos

## Empleado administrador

Puede realizar tareas operativas avanzadas autorizadas por el administrador principal, como actualizar stock o modificar determinados productos.

## Empleado común

Tiene acceso limitado a:

- registrar ventas
- consultar stock
- visualizar alertas

No puede modificar productos ni gestionar usuarios.

---

# Validaciones del sistema

El sistema incorpora validaciones para evitar inconsistencias en el inventario:

- No se permite registrar ventas sin stock suficiente.
- Las cantidades deben ser mayores a cero.
- Solo usuarios autorizados pueden acceder a funciones administrativas.
- El sistema registra automáticamente los movimientos importantes para mantener trazabilidad.

---

# Historial de movimientos

Cada acción relevante genera un registro dentro del historial del sistema, permitiendo mantener un control de:

- ventas
- ingresos de mercadería
- modificaciones de stock
- acciones administrativas

Esto facilita el seguimiento interno y mejora el control general del negocio.

---

# Instrucciones básicas para instalar y ejecutar la maqueta
-Clonar el repositorio desde GitHub:
git clone https://github.com/AprendimosGit/gestor-inventario.git
-Abrir la carpeta del proyecto utilizando Visual Studio Code.
-Acceder a la carpeta “frontend”.
-Abrir los archivos HTML en el navegador para visualizar la maqueta del sistema.
