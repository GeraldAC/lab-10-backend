const db = require("../db/connection");

const DetalleVentas = {
  getAll: (callback) => {
    db.query(
      `SELECT detalle_ventas.*, 
              productos.nombre AS producto_nombre 
       FROM detalle_ventas
       JOIN productos ON detalle_ventas.producto_id = productos.id`,
      callback
    );
  },

  getByVentaId: (venta_id, callback) => {
    db.query(
      `SELECT detalle_ventas.*, 
              productos.nombre AS producto_nombre 
       FROM detalle_ventas
       JOIN productos ON detalle_ventas.producto_id = productos.id
       WHERE detalle_ventas.venta_id = ?`,
      [venta_id],
      callback
    );
  },

  create: (detalle, callback) => {
    db.query(
      `INSERT INTO detalle_ventas 
       (venta_id, producto_id, cantidad, precio_unitario, subtotal) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        detalle.venta_id,
        detalle.producto_id,
        detalle.cantidad,
        detalle.precio_unitario,
        detalle.subtotal,
      ],
      callback
    );
  },

  update: (id, detalle, callback) => {
    db.query(
      `UPDATE detalle_ventas 
       SET producto_id = ?, cantidad = ?, precio_unitario = ?, subtotal = ? 
       WHERE id = ?`,
      [
        detalle.producto_id,
        detalle.cantidad,
        detalle.precio_unitario,
        detalle.subtotal,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM detalle_ventas WHERE id = ?", [id], callback);
  },
};

module.exports = DetalleVentas;
