const db = require("../db/connection");

const Clientes = {
  getAll: (callback) => {
    db.query("SELECT * FROM clientes", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM clientes WHERE id = ?", [id], callback);
  },

  create: (cliente, callback) => {
    db.query(
      "INSERT INTO clientes (nombre, documento_identidad, direccion, telefono) VALUES (?, ?, ?, ?)",
      [
        cliente.nombre,
        cliente.documento_identidad,
        cliente.direccion,
        cliente.telefono,
      ],
      callback
    );
  },

  update: (id, cliente, callback) => {
    db.query(
      "UPDATE clientes SET nombre = ?, documento_identidad = ?, direccion = ?, telefono = ? WHERE id = ?",
      [
        cliente.nombre,
        cliente.documento_identidad,
        cliente.direccion,
        cliente.telefono,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM clientes WHERE id = ?", [id], callback);
  },
};

module.exports = Clientes;
