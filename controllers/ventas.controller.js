const ventaRepository = require('../models/ventas.model');

class VentaController {
  constructor(repository) {
    this.repository = repository;
  }

  async getAllVentas(req, res) {
    try {
      const ventas = await this.repository.getAll();
      res.json(ventas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVentaById(req, res) {
    try {
      const id = req.params.id;
      const venta = await this.repository.getById(id);
      
      if (!venta) {
        return res.status(404).json({ message: 'Venta no encontrada' });
      }
      
      res.json(venta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createVenta(req, res) {
    try {
      const nuevaVenta = req.body;
      const ventaCreada = await this.repository.create(nuevaVenta);
      res.status(201).json(ventaCreada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateVenta(req, res) {
    try {
      const id = req.params.id;
      const venta = req.body;
      const ventaActualizada = await this.repository.update(id, venta);
      res.json(ventaActualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteVenta(req, res) {
    try {
      const id = req.params.id;
      await this.repository.delete(id);
      res.json({ message: 'Venta eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new VentaController(ventaRepository);
