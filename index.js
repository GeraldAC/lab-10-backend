const express = require("express");
const cors = require("cors");
const db = require("./db/connection");
const productosRoutes = require("./routes/productos.routes");
const usuariosRoutes = require("./routes/usuarios.routes");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/productos", productosRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
