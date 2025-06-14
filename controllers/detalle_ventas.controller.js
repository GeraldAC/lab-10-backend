const DetalleVentas = require("../models/detalle_ventas.model");

exports.getAllDetalleVentas = (req, res) => {
  DetalleVentas.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getDetalleByVentaId = (req, res) => {
  const ventaId = req.params.venta_id;
  DetalleVentas.getByVentaId(ventaId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createDetalleVenta = (req, res) => {
  const detalle = req.body;
  DetalleVentas.create(detalle, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...detalle });
  });
};

exports.updateDetalleVenta = (req, res) => {
  const id = req.params.id;
  const detalle = req.body;
  DetalleVentas.update(id, detalle, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Detalle actualizado correctamente" });
  });
};

exports.deleteDetalleVenta = (req, res) => {
  const id = req.params.id;
  DetalleVentas.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Detalle eliminado correctamente" });
  });
};
