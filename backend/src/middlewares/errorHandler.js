function errorHandler(err, req, res, next) {
  console.error(err);

  // Duplicado (constraint unique de Sequelize/Postgres)
  if (err.code === '23505' || err.name === 'SequelizeUniqueConstraintError') {
    const esEmail = err.fields && Object.keys(err.fields).includes('email');
    return res.status(409).json({
      error: esEmail ? 'Email ya registrado' : 'El registro ya existe',
    });
  }

  // Conflictos de negocio (ya inscripto, sin cupo)
  if (err.status === 409) {
    return res.status(409).json({ error: err.message });
  }

  // Errores de validación de Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 400,
      code: 'VALIDATION_ERROR',
      message: 'La solicitud contiene datos inválidos o incompletos.',
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
        code: 'INVALID_VALUE',
      })),
    });
  }

  // Credenciales o token inválidos
  if (err.status === 401) {
    return res.status(401).json({ error: err.message || 'Credenciales inválidas' });
  }

  // Permisos insuficientes
  if (err.status === 403) {
    return res.status(403).json({ error: err.message || 'No tenés permisos para esta acción' });
  }

  // No encontrado
  if (err.status === 404) {
    return res.status(404).json({ error: err.message || 'Recurso no encontrado' });
  }

  // Fallback genérico
  return res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = errorHandler;