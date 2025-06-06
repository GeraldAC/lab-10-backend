const db = require('../db/connection');

class VentaRepository {
  constructor(database) {
    this.db = database;
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT ventas.*, 
                clientes.nombre AS cliente_nombre, 
                usuarios.nombre AS usuario_nombre 
         FROM ventas 
         JOIN clientes ON ventas.cliente_id = clientes.id 
         JOIN usuarios ON ventas.usuario_id = usuarios.id`,
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT ventas.*, 
                clientes.nombre AS cliente_nombre, 
                usuarios.nombre AS usuario_nombre 
         FROM ventas 
         JOIN clientes ON ventas.cliente_id = clientes.id 
         JOIN usuarios ON ventas.usuario_id = usuarios.id 
         WHERE ventas.id = ?`,
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  async create(venta) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'INSERT INTO ventas (cliente_id, usuario_id, total) VALUES (?, ?, ?)',
        [venta.cliente_id, venta.usuario_id, venta.total],
        (err, result) => {
          if (err) reject(err);
          resolve({ id: result.insertId, ...venta });
        }
      );
    });
  }

  async update(id, venta) {
    return new Promise((resolve, reject) => {
      this.db.query(
        'UPDATE ventas SET cliente_id = ?, usuario_id = ?, total = ? WHERE id = ?',
        [venta.cliente_id, venta.usuario_id, venta.total, id],
        (err) => {
          if (err) reject(err);
          resolve({ id, ...venta });
        }
      );
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.db.query('DELETE FROM ventas WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = new VentaRepository(db);
