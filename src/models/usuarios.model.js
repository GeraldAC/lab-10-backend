const db = require("../db/connection");

const Usuarios = {
  getAll: (callback) => {
    db.query("SELECT * FROM usuarios", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM usuarios WHERE id = ?", [id], callback);
  },

  create: (usuario, callback) => {
    db.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
      [usuario.nombre, usuario.email, usuario.password],
      callback
    );
  },

  update: (id, usuario, callback) => {
    db.query(
      "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id = ?",
      [usuario.nombre, usuario.email, usuario.password, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM usuarios WHERE id = ?", [id], callback);
  },
};

module.exports = Usuarios;
