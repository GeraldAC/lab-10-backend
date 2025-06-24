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
      "INSERT INTO clientes (name, email, phone) VALUES (?, ?, ?)",
      [cliente.name, cliente.email, cliente.phone],
      callback
    );
  },

  update: (id, cliente, callback) => {
    db.query(
      "UPDATE clientes SET name = ?, email = ?, phone = ? WHERE id = ?",
      [cliente.name, cliente.email, cliente.phone, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM clientes WHERE id = ?", [id], callback);
  },
};

module.exports = Clientes;
