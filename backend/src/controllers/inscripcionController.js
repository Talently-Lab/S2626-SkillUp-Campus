const Inscripcion = require('../models/Inscripcion');
const Curso = require('../models/Curso');

const inscribirse = async (req, res, next) => {
  try {
    const cursoId = req.params.id;
    const usuarioId = req.usuario.id;

    const curso = await Curso.findOne({ where: { id: cursoId, activo: true } });
    if (!curso) {
      const error = new Error('Curso no encontrado');
      error.status = 404;
      throw error;
    }

    const existente = await Inscripcion.findOne({
      where: { usuario_id: usuarioId, curso_id: cursoId },
    });

    if (existente && existente.estado === 'activo') {
      const error = new Error('Ya estás inscripto en este curso');
      error.status = 409;
      throw error;
    }

    if (curso.cupo_maximo) {
      const ocupados = await Inscripcion.count({
        where: { curso_id: cursoId, estado: 'activo' },
      });
      if (ocupados >= curso.cupo_maximo) {
        const error = new Error('El curso no tiene cupos disponibles');
        error.status = 409;
        throw error;
      }
    }

    // Si se había dado de baja, se reactiva la misma inscripción
    if (existente) {
      await existente.update({ estado: 'activo', fecha_inscripcion: new Date() });
      return res.status(201).json(existente);
    }

    const inscripcion = await Inscripcion.create({
      usuario_id: usuarioId,
      curso_id: cursoId,
    });
    return res.status(201).json(inscripcion);
  } catch (err) {
    next(err);
  }
};

module.exports = { inscribirse };