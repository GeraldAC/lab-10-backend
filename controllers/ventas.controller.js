const Ventas = require('../models/ventas.model');

exports.getAllVentas = (req, res) => {
  Ventas.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getVentaById = (req, res) => {
  const id = req.params.id;
  Ventas.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Venta no encontrada' });
    res.json(result[0]);
  });
};

exports.createVenta = (req, res) => {
  const nuevaVenta = req.body;
  Ventas.create(nuevaVenta, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...nuevaVenta });
  });
};

exports.updateVenta = (req, res) => {
  const id = req.params.id;
  const venta = req.body;
  Ventas.update(id, venta, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Venta actualizada correctamente' });
  });
};

exports.deleteVenta = (req, res) => {
  const id = req.params.id;
  Ventas.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Venta eliminada correctamente' });
  });
};
