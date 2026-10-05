const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const registrar = async (req, res) => {
  try {
    const { nombre, email, password} = req.body;

    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: hash})

    return res.status(201).json({ 
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol || 'alumno'
    });

  } catch (err) {
    if(err.code === '23505' || err.name === 'SequelizeUniqueConstraintError'){
      return res.status(409).json({ error: "Email ya registrado" });
    }
    if(err.name === 'SequelizeValidationError'){
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

const login = async (req, res) => {
  res.json({ message: "Endpoint de login - por implementar" });
};

module.exports = { registrar, login };
