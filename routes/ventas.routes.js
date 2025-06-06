const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

// Middleware para validar el ID
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  next();
};

// Middleware para validar el cuerpo de la venta
const validateVenta = (req, res, next) => {
  const { cliente_id, usuario_id, total } = req.body;
  if (!cliente_id || !usuario_id || !total) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  if (isNaN(total) || total <= 0) {
    return res.status(400).json({ error: 'Total inválido' });
  }
  next();
};

router.get('/', ventasController.getAllVentas.bind(ventasController));
router.get('/:id', validateId, ventasController.getVentaById.bind(ventasController));
router.post('/', validateVenta, ventasController.createVenta.bind(ventasController));
router.put('/:id', validateId, validateVenta, ventasController.updateVenta.bind(ventasController));
router.delete('/:id', validateId, ventasController.deleteVenta.bind(ventasController));

module.exports = router;
