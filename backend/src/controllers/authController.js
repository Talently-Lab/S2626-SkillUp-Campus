const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { enviarCorreoBienvenida } = require('../services/emailService');

const registrar = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password_hash: hash });

    // El correo de bienvenida no debe bloquear ni hacer fallar el registro
    enviarCorreoBienvenida({ nombre: usuario.nombre, email: usuario.email }).catch((err) => {
      console.error('[email] Error al enviar correo de bienvenida:', err.message);
    });

    return res.status(201).json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol || 'alumno',
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      const error = new Error('Credenciales inválidas');
      error.status = 401;
      throw error;
    }

    const passwordValida = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValida) {
      const error = new Error('Credenciales inválidas');
      error.status = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registrar, login };