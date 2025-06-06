const db = require('../db/connection');

class DetalleVentaRepository {
  constructor(database) {
    this.db = database;
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT dv.*, 
                p.nombre AS producto_nombre,
                v.total AS venta_total
         FROM detalle_ventas dv
         JOIN productos p ON dv.producto_id = p.id
         JOIN ventas v ON dv.venta_id = v.id`,
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
        `SELECT dv.*, 
                p.nombre AS producto_nombre,
                v.total AS venta_total
         FROM detalle_ventas dv
         JOIN productos p ON dv.producto_id = p.id
         JOIN ventas v ON dv.venta_id = v.id
         WHERE dv.id = ?`,
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }

  async getByVentaId(ventaId) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT dv.*, 
                p.nombre AS producto_nombre,
                v.total AS venta_total
         FROM detalle_ventas dv
         JOIN productos p ON dv.producto_id = p.id
         JOIN ventas v ON dv.venta_id = v.id
         WHERE dv.venta_id = ?`,
        [ventaId],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  async create(detalleVenta) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `INSERT INTO detalle_ventas 
         (venta_id, producto_id, cantidad, precio_unitario, subtotal) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          detalleVenta.venta_id,
          detalleVenta.producto_id,
          detalleVenta.cantidad,
          detalleVenta.precio_unitario,
          detalleVenta.subtotal
        ],
        (err, result) => {
          if (err) reject(err);
          resolve({ id: result.insertId, ...detalleVenta });
        }
      );
    });
  }

  async update(id, detalleVenta) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `UPDATE detalle_ventas 
         SET venta_id = ?, producto_id = ?, cantidad = ?, 
             precio_unitario = ?, subtotal = ? 
         WHERE id = ?`,
        [
          detalleVenta.venta_id,
          detalleVenta.producto_id,
          detalleVenta.cantidad,
          detalleVenta.precio_unitario,
          detalleVenta.subtotal,
          id
        ],
        (err) => {
          if (err) reject(err);
          resolve({ id, ...detalleVenta });
        }
      );
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.db.query('DELETE FROM detalle_ventas WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  async deleteByVentaId(ventaId) {
    return new Promise((resolve, reject) => {
      this.db.query('DELETE FROM detalle_ventas WHERE venta_id = ?', [ventaId], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

module.exports = new DetalleVentaRepository(db);
