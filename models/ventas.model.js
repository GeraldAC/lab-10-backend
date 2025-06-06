const db = require('../db/connection');

const Ventas = {
  getAll: (callback) => {
    db.query(
      `SELECT ventas.*, 
              clientes.nombre AS cliente_nombre, 
              usuarios.nombre AS usuario_nombre 
       FROM ventas 
       JOIN clientes ON ventas.cliente_id = clientes.id 
       JOIN usuarios ON ventas.usuario_id = usuarios.id`,
      callback
    );
  },

  getById: (id, callback) => {
    db.query(
      `SELECT ventas.*, 
              clientes.nombre AS cliente_nombre, 
              usuarios.nombre AS usuario_nombre 
       FROM ventas 
       JOIN clientes ON ventas.cliente_id = clientes.id 
       JOIN usuarios ON ventas.usuario_id = usuarios.id 
       WHERE ventas.id = ?`,
      [id],
      callback
    );
  },

  create: (venta, callback) => {
    db.query(
      'INSERT INTO ventas (cliente_id, usuario_id, total) VALUES (?, ?, ?)',
      [venta.cliente_id, venta.usuario_id, venta.total],
      callback
    );
  },

  update: (id, venta, callback) => {
    db.query(
      'UPDATE ventas SET cliente_id = ?, usuario_id = ?, total = ? WHERE id = ?',
      [venta.cliente_id, venta.usuario_id, venta.total, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM ventas WHERE id = ?', [id], callback);
  }
};

module.exports = Ventas;
