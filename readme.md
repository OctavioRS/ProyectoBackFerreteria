# API Ecommerce Córdoba

La API Ecommerce Córdoba es una plataforma diseñada para gestionar productos, usuarios, carritos de compras y facilitar procesos de compra en un entorno de comercio electrónico. A continuación, se detallan los endpoints y las funcionalidades disponibles en esta API.

## Información General

- **URL Base**: `http://localhost:8080`

## Usuarios

### Registrar Usuario

Permite registrar a un nuevo usuario en la plataforma.

- **Endpoint**: `/users/register`
- **Método HTTP**: POST
- **Parámetros del Body**:
  - `first_name` (string): Nombre del usuario.
  - `last_name` (string): Apellido del usuario.
  - `age` (number): Edad del usuario.
  - `email` (string): Correo electrónico del usuario.
  - `password` (string): Contraseña del usuario.
  - `role` (string): Rol del usuario ("admin", "premium" o "user").

### Loguear Usuario

Permite a un usuario iniciar sesión en la plataforma.

- **Endpoint**: `/users/login`
- **Método HTTP**: POST
- **Parámetros del Body**:
  - `email` (string): Correo electrónico del usuario.
  - `password` (string): Contraseña del usuario.

### Buscar Todos los Usuarios

Recupera una lista de todos los usuarios registrados en la plataforma.

- **Endpoint**: `/users/get`
- **Método HTTP**: GET

### Borrar Usuarios Inactivos

Permite eliminar usuarios inactivos de la plataforma. Ten en cuenta que esta acción debe ser realizada por un usuario con privilegios de administrador.

- **Endpoint**: `/api/users/delete`
- **Método HTTP**: DELETE

### Cambiar Contraseña

Permite a un usuario cambiar su contraseña actual.

- **Endpoint**: `/users/updatingPass`
- **Método HTTP**: POST
- **Parámetros del Body**:
  - `currentPassword`: Password actual.
  - `newPassword`: Nueva contraseña.
  - `confirmNewPassword`: Confirmar nueva contraseña.

## Productos

### Crear Producto

Permite a un usuario con rol "premium" o "administrador" crear un nuevo producto en el catálogo de la tienda.

- **Endpoint**: `/products`
- **Método HTTP**: POST
- **Parámetros del Body**:
  - `title` (string): Título del producto.
  - `description` (string): Descripción del producto.
  - `price` (number): Precio del producto.
  - `stock` (number): Cantidad en stock del producto.
  - `code` (string): Código único del producto.
  - `status` (string): Estado del producto (por ejemplo, "disponible" o "agotado").
  - `category` (string): Categoría del producto.
  - `thumbnails` (array): Lista de URLs de las imágenes del producto.

### Obtener Todos los Productos

Busca todos los productos disponibles en la plataforma.

- **Endpoint**: `/products`
- **Método HTTP**: GET

### Obtener Producto por ID

Obtiene un producto mediante su ID.

- **Endpoint**: `/products/:id`
- **Método HTTP**: GET

### Actualizar Producto

Permite a un usuario con rol "administrador" actualizar la información de un producto existente.

- **Endpoint**: `/products/:id`
- **Método HTTP**: PUT
- **Parámetros del Body**:
  - `title` (string): Nuevo título del producto (opcional).
  - `description` (string): Nueva descripción del producto (opcional).
  - `price` (number): Nuevo precio del producto (opcional).
  - `stock` (number): Nueva cantidad en stock del producto (opcional).
  - `code` (string): Nuevo código único del producto (opcional).
  - `status` (string): Nuevo estado del producto (opcional).
  - `category` (string): Nueva categoría del producto (opcional).
  - `thumbnails` (array): Nuevas URLs de las imágenes del producto (opcional).

### Borrar Producto

Permite a un usuario con rol "premium" o "administrador" borrar un producto existente.

- **Endpoint**: `/products/:id`
- **Método HTTP**: DELETE

## Carritos

### Obtener Todos los Carritos

Recupera una lista de todos los carritos de compras disponibles en la plataforma.

- **Endpoint**: `/carts`
- **Método HTTP**: GET

### Obtener Carrito por ID

Recupera un carrito de compras específico por su ID.

- **Endpoint**: `/carts/:id`
- **Método HTTP**: GET

### Crear Carrito

Permite a un usuario crear un nuevo carrito de compras.

- **Endpoint**: `/carts`
- **Método HTTP**: POST

### Borrar Producto de Carrito

Permite a un usuario eliminar un producto específico de su carrito de compras.

- **Endpoint**: `/carts/:cid/products/:pid`
- **Método HTTP**: DELETE

### Borrar Todos los Productos del Carrito

Permite a un usuario eliminar todos los productos de su carrito de compras.

- **Endpoint**: `/carts/:cid`
- **Método HTTP**: DELETE

### Agregar Producto a Carrito

Permite a un usuario agregar un producto a su carrito de compras.

- **Endpoint**: `/carts/:cid/product/:pid`
- **Método HTTP**: POST

### Actualizar Cantidad de Producto en Carrito

Permite a un usuario actualizar la cantidad de un producto en su carrito de compras.

- **Endpoint**: `/carts/:cid/products/:pid`
- **Método HTTP**: PUT
- **Parámetros del Body**:
  - `quantity` (number): Nueva cantidad del producto en el carrito.







