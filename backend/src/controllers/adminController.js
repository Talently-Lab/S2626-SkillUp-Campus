const Curso = require('../models/Curso');
const Inscripcion = require('../models/Inscripcion');
const Usuario = require('../models/Usuario');

const listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nombre', 'email', 'rol'],
      order: [['id', 'ASC']],
    });
    return res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

const obtenerResumenDashboard = async (req, res, next) => {
  try {
    const [cursosActivos, usuariosRegistrados, inscripcionesHistoricas] = await Promise.all([
      Curso.count({ where: { activo: true } }),
      Usuario.count(),
      Inscripcion.count(),
    ]);

    return res.json({
      cursos_activos: cursosActivos,
      usuarios_registrados: usuariosRegistrados,
      inscripciones_historicas: inscripcionesHistoricas,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { listarUsuarios, obtenerResumenDashboard };