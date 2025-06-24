const Producto = require("../models/productos.model");

exports.getAll = (req, res) => {
  Producto.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  Producto.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  Producto.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  Producto.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Producto actualizado" });
  });
};

exports.delete = (req, res) => {
  Producto.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Producto eliminado" });
  });
};
