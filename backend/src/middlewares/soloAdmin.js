function soloAdmin(req, res, next) {
  if (req.usuario.rol !== 'admin') {
    const error = new Error('No tenés permisos para esta acción');
    error.status = 403;
    return next(error);
  }
  next();
}

module.exports = soloAdmin;