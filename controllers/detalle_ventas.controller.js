const detalleVentaRepository = require('../models/detalle_ventas.model');

class DetalleVentaController {
  constructor(repository) {
    this.repository = repository;
  }

  async getAllDetalleVentas(req, res) {
    try {
      const detalles = await this.repository.getAll();
      res.json(detalles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDetalleVentaById(req, res) {
    try {
      const id = req.params.id;
      const detalle = await this.repository.getById(id);
      
      if (!detalle) {
        return res.status(404).json({ message: 'Detalle de venta no encontrado' });
      }
      
      res.json(detalle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDetalleVentaByVentaId(req, res) {
    try {
      const ventaId = req.params.ventaId;
      const detalles = await this.repository.getByVentaId(ventaId);
      res.json(detalles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDetalleVenta(req, res) {
    try {
      const nuevoDetalle = req.body;
      const detalleCreado = await this.repository.create(nuevoDetalle);
      res.status(201).json(detalleCreado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDetalleVenta(req, res) {
    try {
      const id = req.params.id;
      const detalle = req.body;
      const detalleActualizado = await this.repository.update(id, detalle);
      res.json(detalleActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDetalleVenta(req, res) {
    try {
      const id = req.params.id;
      await this.repository.delete(id);
      res.json({ message: 'Detalle de venta eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteDetalleVentaByVentaId(req, res) {
    try {
      const ventaId = req.params.ventaId;
      await this.repository.deleteByVentaId(ventaId);
      res.json({ message: 'Detalles de venta eliminados correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DetalleVentaController(detalleVentaRepository);
