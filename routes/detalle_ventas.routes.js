const express = require("express");
const router = express.Router();
const detalleVentasController = require("../controllers/detalle_ventas.controller");

router.get("/", detalleVentasController.getAllDetalleVentas);
router.get("/venta/:venta_id", detalleVentasController.getDetalleByVentaId);
router.post("/", detalleVentasController.createDetalleVenta);
router.put("/:id", detalleVentasController.updateDetalleVenta);
router.delete("/:id", detalleVentasController.deleteDetalleVenta);

module.exports = router;
