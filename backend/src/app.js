// Inicialización del servidor
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cursoRoutes = require("./routes/cursoRoutes");
const cursoAdminRoutes = require("./routes/cursoAdminRoutes");
const adminRoutes = require('./routes/adminRoutes');
const inscripcionRoutes = require("./routes/inscripcionRoutes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

// Middlewares base
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean)
  : null;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || !allowedOrigins || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const error = new Error('Origen no permitido por política CORS');
    error.status = 403;
    return callback(error);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '100kb' }));

// Rutas de la Api
app.use("/api/auth", authRoutes);
app.use("/api/cursos", cursoRoutes);
app.use("/api/cursos", cursoAdminRoutes);
app.use("/api", inscripcionRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req, res, next) => {
  try {
    res.send("Hola, el servidor está funcionando");
  } catch (error) {
    next(error);
  }
});

app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", message: "Conexión a la base de datos exitosa" });
  } catch (error) {
    console.error("Error al verificar la salud de la base de datos:", error);
    res.status(500).json({
      status: "error",
      message: "Error al verificar la salud de la base de datos",
    });
  }
});

// Ruta no encontrada (404)
app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  next(error);
});

// Middleware de errores
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
}

module.exports = app;