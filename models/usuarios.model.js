const db = require("../db/connection");

const Usuario = {
  getAll: (callback) => {
    db.query("SELECT * FROM usuarios", callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM usuarios WHERE id = ?", [id], callback);
  },
  create: (data, callback) => {
    db.query("INSERT INTO usuarios SET ?", [data], callback);
  },
  update: (id, data, callback) => {
    db.query("UPDATE usuarios SET ? WHERE id = ?", [data, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM usuarios WHERE id = ?", [id], callback);
  },
};

module.exports = Usuario; 