-- Crea la base de datos "sistema_ventas" solo si no existe
CREATE DATABASE IF NOT EXISTS sistema_ventas;

-- Selecciona la base de datos para usarla en las siguientes operaciones
USE sistema_ventas;

-- Crea la tabla "productos" solo si no existe
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único autoincremental
    nombre VARCHAR(100) NOT NULL,      -- Nombre del producto, máximo 100 caracteres
    precio DECIMAL(10,2) NOT NULL,     -- Precio con dos decimales, máximo 10 dígitos en total
    stock INT NOT NULL                 -- Cantidad disponible del producto en inventario
);

SELECT * FROM productos;
DELETE FROM productos WHERE id = 4;

-- Cambiar el nombre de la columna 'nombre' a 'name'
ALTER TABLE productos
CHANGE COLUMN nombre name VARCHAR(100) NOT NULL;

-- Cambiar el tipo de dato de 'precio' a entero (INT)
ALTER TABLE productos
MODIFY COLUMN precio INT NOT NULL;

ALTER TABLE productos
CHANGE COLUMN precio price VARCHAR(100) NOT NULL;

ALTER TABLE clientes AUTO_INCREMENT = 1;

INSERT INTO productos (name, price, stock) VALUES
('Laptop', 2500.00, 10),
('Mouse', 80.00, 50),
('Teclado', 120.00, 30);

-- Muestra todas las tablas existentes en la base de datos seleccionada
SHOW TABLES;

-- Muestra la estructura de la tabla "productos", incluyendo nombres de columnas y tipos de datos
DESCRIBE productos;

-- Mostrar los registros de la tabla productos
SELECT * FROM productos;

-- Crear la tabla "usuarios" si no existe
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único autoincremental
    nombre VARCHAR(100) NOT NULL,      -- Nombre del usuario, máximo 100 caracteres
    email VARCHAR(100) UNIQUE NOT NULL,-- Correo electrónico único y obligatorio
    password VARCHAR(255) NOT NULL     -- Contraseña cifrada, almacenada como texto encriptado
);

-- Mostrar los registros de la tabla usuarios
SELECT * FROM usuarios;

-- Crear la tabla "clientes" si no existe previamente
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,				-- Identificador único autoincremental
    nombre VARCHAR(100) NOT NULL,             		-- Nombre del cliente, máximo 100 caracteres
    documento_identidad VARCHAR(20) UNIQUE NOT NULL,-- Documento único obligatorio
    direccion VARCHAR(150),                   		-- Dirección del cliente (opcional)
    telefono VARCHAR(20)                       		-- Número de teléfono (opcional)
);

ALTER TABLE clientes
CHANGE COLUMN nombre name VARCHAR(100) NOT NULL;

ALTER TABLE clientes
ADD COLUMN email VARCHAR(100) NOT NULL UNIQUE;

ALTER TABLE clientes
CHANGE COLUMN telefono phone VARCHAR(20);

ALTER TABLE clientes
DROP COLUMN documento_identidad;

ALTER TABLE clientes
DROP COLUMN direccion;

-- Mostrar los registros de la tabla clientes
SELECT * FROM clientes;
DELETE FROM clientes WHERE id = 3;

ALTER TABLE clientes AUTO_INCREMENT = 1;

INSERT INTO clientes (name, email, phone) VALUES
('Juan Pérez', 'juan@mail.com', '987654321'),
('Ana Gómez', 'ana@mail.com', '912345678');


-- Crear la tabla "ventas" si no existe previamente
CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- Identificador único autoincremental
    cliente_id INT NOT NULL,              -- ID del cliente que realiza la compra
    usuario_id INT NOT NULL,              -- ID del usuario (vendedor) que registra la venta
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de la venta, con valor por defecto automático
    total DECIMAL(10,2) NOT NULL,         -- Total de la venta con dos decimales

    -- Definir claves foráneas para la relación con "clientes" y "usuarios"
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

SELECT * FROM ventas;
DELETE FROM ventas WHERE id = 3;

-- Crear la tabla "detalle_ventas" si no existe previamente
CREATE TABLE IF NOT EXISTS detalle_ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- Identificador único autoincremental
    venta_id INT NOT NULL,                -- ID de la venta a la que pertenece el detalle
    producto_id INT NOT NULL,             -- ID del producto vendido
    cantidad INT NOT NULL,                 -- Cantidad de unidades vendidas
    precio_unitario DECIMAL(10,2) NOT NULL,-- Precio unitario del producto
    subtotal DECIMAL(10,2) NOT NULL,       -- Subtotal (cantidad * precio_unitario)

    -- Definir claves foráneas para la relación con "ventas" y "productos"
    FOREIGN KEY (venta_id) REFERENCES ventas(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

SELECT * FROM detalle_ventas;