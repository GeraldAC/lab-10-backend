const express = require('express');
const router = express.Router();
const detalleVentasController = require('../controllers/detalle_ventas.controller');

// Middleware para validar el ID
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  next();
};

// Middleware para validar el cuerpo del detalle de venta
const validateDetalleVenta = (req, res, next) => {
  const { venta_id, producto_id, cantidad, precio_unitario, subtotal } = req.body;
  
  if (!venta_id || !producto_id || !cantidad || !precio_unitario || !subtotal) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  if (isNaN(cantidad) || cantidad <= 0) {
    return res.status(400).json({ error: 'Cantidad inválida' });
  }

  if (isNaN(precio_unitario) || precio_unitario <= 0) {
    return res.status(400).json({ error: 'Precio unitario inválido' });
  }

  if (isNaN(subtotal) || subtotal <= 0) {
    return res.status(400).json({ error: 'Subtotal inválido' });
  }

  // Validar que el subtotal sea igual a cantidad * precio_unitario
  if (subtotal !== cantidad * precio_unitario) {
    return res.status(400).json({ error: 'El subtotal no coincide con la cantidad y precio unitario' });
  }

  next();
};

// Rutas principales
router.get('/', detalleVentasController.getAllDetalleVentas.bind(detalleVentasController));
router.get('/:id', validateId, detalleVentasController.getDetalleVentaById.bind(detalleVentasController));
router.post('/', validateDetalleVenta, detalleVentasController.createDetalleVenta.bind(detalleVentasController));
router.put('/:id', validateId, validateDetalleVenta, detalleVentasController.updateDetalleVenta.bind(detalleVentasController));
router.delete('/:id', validateId, detalleVentasController.deleteDetalleVenta.bind(detalleVentasController));

// Rutas adicionales para manejar detalles por venta
router.get('/venta/:ventaId', validateId, detalleVentasController.getDetalleVentaByVentaId.bind(detalleVentasController));
router.delete('/venta/:ventaId', validateId, detalleVentasController.deleteDetalleVentaByVentaId.bind(detalleVentasController));

module.exports = router;
