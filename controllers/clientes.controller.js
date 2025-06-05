const Clientes = require("../models/clientes.model");

exports.getAllClientes = (req, res) => {
  Clientes.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getClienteById = (req, res) => {
  const id = req.params.id;
  Clientes.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(result[0]);
  });
};

exports.createCliente = (req, res) => {
  const nuevoCliente = req.body;
  Clientes.create(nuevoCliente, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...nuevoCliente });
  });
};

exports.updateCliente = (req, res) => {
  const id = req.params.id;
  const cliente = req.body;
  Clientes.update(id, cliente, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Cliente actualizado correctamente" });
  });
};

exports.deleteCliente = (req, res) => {
  const id = req.params.id;
  Clientes.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Cliente eliminado correctamente" });
  });
};
