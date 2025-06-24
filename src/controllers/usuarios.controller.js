const Usuarios = require("../models/usuarios.model");

exports.getAllUsuarios = (req, res) => {
  Usuarios.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getUsuarioById = (req, res) => {
  const id = req.params.id;
  Usuarios.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(result[0]);
  });
};

exports.createUsuario = (req, res) => {
  const nuevoUsuario = req.body;
  Usuarios.create(nuevoUsuario, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...nuevoUsuario });
  });
};

exports.updateUsuario = (req, res) => {
  const id = req.params.id;
  const usuario = req.body;
  Usuarios.update(id, usuario, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Usuario actualizado correctamente" });
  });
};

exports.deleteUsuario = (req, res) => {
  const id = req.params.id;
  Usuarios.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Usuario eliminado correctamente" });
  });
};
