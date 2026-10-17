const Curso = require('../models/Curso');

const CAMPOS = [
  'titulo',
  'descripcion',
  'cupo_maximo',
  'area_aprendizaje',
  'nivel',
  'modalidad',
  'duracion',
  'imagen_url',
];

const crearCurso = async (req, res, next) => {
  try {
    const datos = {};
    CAMPOS.forEach((c) => {
      if (req.body[c] !== undefined) datos[c] = req.body[c];
    });

    const curso = await Curso.create(datos);
    return res.status(201).json(curso);
  } catch (err) {
    next(err);
  }
};

const editarCurso = async (req, res, next) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      const error = new Error('Curso no encontrado');
      error.status = 404;
      throw error;
    }

    const cambios = {};
    [...CAMPOS, 'activo'].forEach((c) => {
      if (req.body[c] !== undefined) cambios[c] = req.body[c];
    });

    await curso.update(cambios);
    return res.json(curso);
  } catch (err) {
    next(err);
  }
};

const eliminarCurso = async (req, res, next) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      const error = new Error('Curso no encontrado');
      error.status = 404;
      throw error;
    }

    await curso.update({ activo: false });
    return res.json({ message: 'Curso desactivado' });
  } catch (err) {
    next(err);
  }
};

module.exports = { crearCurso, editarCurso, eliminarCurso };