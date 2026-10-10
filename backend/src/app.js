// Inicialización del servidor
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const cursoAdminRoutes = require('./routes/cursoAdminRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// Rutas de la Api
app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/cursos', cursoAdminRoutes);
app.use('/api', inscripcionRoutes);

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

// Middleware de errores 
app.use(errorHandler);

app.listen("3000", () => {
  console.log("Servidor iniciado en http://localhost:3000");
});