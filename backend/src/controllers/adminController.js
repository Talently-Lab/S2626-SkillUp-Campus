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

module.exports = { listarUsuarios };