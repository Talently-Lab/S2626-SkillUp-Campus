// Inicialización del servidor
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Hola, el servidor está funcionando");
});

app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", message: "Conexión a la base de datos exitosa" });
  } catch (error) {
    console.error("Error al verificar la salud de la base de datos:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Error al verificar la salud de la base de datos",
      });
  }
});

app.listen("3000", () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
