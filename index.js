const express = require("express");
const cors = require("cors");
const db = require("./src/db/connection");
const productosRoutes = require("./src/routes/productos.routes");
const usuariosRoutes = require("./src/routes/usuarios.routes");
const clientesRoutes = require("./src/routes/clientes.routes");
const ventasRoutes = require("./src/routes/ventas.routes");
const detalleVentasRoutes = require("./src/routes/detalle_ventas.routes");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/productos", productosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/detalle_ventas", detalleVentasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
