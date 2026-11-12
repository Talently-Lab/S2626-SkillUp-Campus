function soloAdmin(req, res, next) {
  if (!req.usuario) {
    const error = new Error('No se proporcionó un token de autenticación');
    error.status = 401;
    return next(error);
  }

  if (req.usuario.rol !== 'admin') {
    const error = new Error('No tenés permisos para esta acción');
    error.status = 403;
    return next(error);
  }
  next();
}

module.exports = soloAdmin;